import React, {
    Children,
    cloneElement,
    forwardRef,
    isValidElement,
    ReactElement,
    ReactNode,
    RefObject,
    useEffect,
    useMemo,
    useRef,
} from "react";
import gsap from "gsap";

export interface CardSwapProps {
    width?: number | string;
    height?: number | string;
    cardDistance?: number;
    verticalDistance?: number;
    delay?: number;
    pauseOnHover?: boolean;
    onCardClick?: (idx: number) => void;
    skewAmount?: number;
    easing?: "linear" | "elastic";
    children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ customClass, ...rest }, ref) => (
        <div
            ref={ref}
            {...rest}
            className={`absolute top-1/2 left-1/2 rounded-xl border border-white bg-black [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${customClass ?? ""} ${rest.className ?? ""}`.trim()}
        />
    )
);
Card.displayName = "Card";

type CardRef = RefObject<HTMLDivElement>;
interface Slot {
    x: number;
    y: number;
    z: number;
    zIndex: number;
}

const makeSlot = (
    i: number,
    distX: number,
    distY: number,
    total: number
): Slot => ({
    x: i * distX,
    y: -i * distY,
    z: -i * distX * 1.5,
    zIndex: total - i,
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
    gsap.set(el, {
        x: slot.x,
        y: slot.y,
        z: slot.z,
        xPercent: -50,
        yPercent: -50,
        skewY: skew,
        transformOrigin: "center center",
        zIndex: slot.zIndex,
        force3D: true,
    });

const CardSwap: React.FC<CardSwapProps> = ({
    width = 500,
    height = 400,
    cardDistance = 60,
    verticalDistance = 70,
    delay = 5000,
    pauseOnHover = false,
    onCardClick,
    skewAmount = 6,
    easing = "elastic",
    children,
}) => {
    const config =
        easing === "elastic"
            ? {
                ease: "elastic.out(0.6,0.9)",
                durDrop: 2,
                durMove: 2,
                durReturn: 2,
                promoteOverlap: 0.9,
                returnDelay: 0.05,
            }
            : {
                ease: "power1.inOut",
                durDrop: 0.8,
                durMove: 0.8,
                durReturn: 0.8,
                promoteOverlap: 0.45,
                returnDelay: 0.2,
            };

    const childArr = useMemo(
        () => Children.toArray(children) as ReactElement<CardProps>[],
        [children]
    );
    const refs = useMemo<CardRef[]>(
        () => childArr.map(() => React.createRef<HTMLDivElement>()),
        [childArr.length]
    );

    const order = useRef<number[]>(
        Array.from({ length: childArr.length }, (_, i) => i)
    );

    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const intervalRef = useRef<number>();
    const container = useRef<HTMLDivElement>(null);

    // Ensure only the active card's video plays to reduce decode/CPU usage
    const playOnlyActiveVideo = useRef(() => {
        const activeIdx = order.current[0];
        refs.forEach((r, i) => {
            const root = r.current;
            if (!root) return;
            const video = root.querySelector("video") as HTMLVideoElement | null;
            const source = video?.querySelector("source") as HTMLSourceElement | null;
            if (!video) return;
            try {
                if (i === activeIdx) {
                    // mark as active for styling/debugging
                    root.setAttribute("data-active", "true");
                    // attach src only for active video
                    const dataSrc = source?.getAttribute("data-src");
                    if (source && dataSrc && source.getAttribute("src") !== dataSrc) {
                        source.setAttribute("src", dataSrc);
                        video.load();
                    }
                    video.preload = "auto";
                    video.muted = true;
                    // Avoid DOMException on some browsers
                    const p = video.play();
                    if (p && typeof p.then === "function") {
                        p.catch(() => { });
                    }
                } else {
                    root.removeAttribute("data-active");
                    video.pause();
                    video.preload = "metadata";
                    // detach src to free decoder resources
                    if (source && source.getAttribute("src")) {
                        source.removeAttribute("src");
                        video.load();
                    }
                }
            } catch { }
        });
    });

    useEffect(() => {
        const total = refs.length;
        refs.forEach((r, i) =>
            placeNow(
                r.current!,
                makeSlot(i, cardDistance, verticalDistance, total),
                skewAmount
            )
        );

        const swap = () => {
            if (order.current.length < 2) return;

            const [front, ...rest] = order.current;
            const elFront = refs[front].current!;
            const tl = gsap.timeline();
            tlRef.current = tl;

            tl.to(elFront, {
                y: "+=500",
                duration: config.durDrop,
                ease: config.ease,
            });

            tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
            rest.forEach((idx, i) => {
                const el = refs[idx].current!;
                const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
                tl.set(el, { zIndex: slot.zIndex }, "promote");
                tl.to(
                    el,
                    {
                        x: slot.x,
                        y: slot.y,
                        z: slot.z,
                        duration: config.durMove,
                        ease: config.ease,
                    },
                    `promote+=${i * 0.15}`
                );
            });

            const backSlot = makeSlot(
                refs.length - 1,
                cardDistance,
                verticalDistance,
                refs.length
            );
            tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
            tl.call(
                () => {
                    gsap.set(elFront, { zIndex: backSlot.zIndex });
                },
                undefined,
                "return"
            );
            tl.set(elFront, { x: backSlot.x, z: backSlot.z }, "return");
            tl.to(
                elFront,
                {
                    y: backSlot.y,
                    duration: config.durReturn,
                    ease: config.ease,
                },
                "return"
            );

            tl.call(() => {
                order.current = [...rest, front];
            });
            tl.call(() => playOnlyActiveVideo.current());
        };

        swap();
        // After initial layout ensure only one video plays
        playOnlyActiveVideo.current();
        intervalRef.current = window.setInterval(swap, delay);

        const pause = () => {
            tlRef.current?.pause();
            clearInterval(intervalRef.current);
            // Pause all videos when paused
            refs.forEach((r) => {
                const v = r.current?.querySelector("video") as HTMLVideoElement | null;
                if (v) v.pause();
            });
        };
        const resume = () => {
            tlRef.current?.play();
            intervalRef.current = window.setInterval(swap, delay);
            playOnlyActiveVideo.current();
        };

        if (pauseOnHover) {
            const node = container.current!;
            node.addEventListener("mouseenter", pause);
            node.addEventListener("mouseleave", resume);
            return () => {
                node.removeEventListener("mouseenter", pause);
                node.removeEventListener("mouseleave", resume);
                clearInterval(intervalRef.current);
            };
        }
        // Pause when tab hidden or component not in view
        const visHandler = () => {
            if (document.hidden) pause();
            else resume();
        };
        document.addEventListener("visibilitychange", visHandler);

        // Intersection Observer to pause when off-screen
        let observer: IntersectionObserver | null = null;
        if (container.current && "IntersectionObserver" in window) {
            observer = new IntersectionObserver((entries) => {
                const entry = entries[0];
                if (!entry) return;
                if (entry.isIntersecting) resume();
                else pause();
            }, { threshold: 0.1 });
            observer.observe(container.current);
        }

        return () => {
            clearInterval(intervalRef.current);
            document.removeEventListener("visibilitychange", visHandler);
            if (observer && container.current) observer.unobserve(container.current);
        };
    }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

    const rendered = childArr.map((child, i) =>
        isValidElement<CardProps>(child)
            ? cloneElement(child, {
                key: i,
                ref: refs[i],
                style: { width, height, ...(child.props.style ?? {}) },
                onClick: (e) => {
                    child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);
                    onCardClick?.(i);
                },
            } as CardProps & React.RefAttributes<HTMLDivElement>)
            : child
    );

    return (
        <div
            ref={container}
            className="absolute top-1/4 right-20 transform translate-x-[5%] translate-y-[20%] origin-bottom-right perspective-[900px] overflow-visible max-[768px]:translate-x-[25%] max-[768px]:translate-y-[25%] max-[768px]:scale-[0.75] max-[480px]:translate-x-[25%] max-[480px]:translate-y-[25%] max-[480px]:scale-[0.55]"
            style={{ width, height }}
        >
            {rendered}
        </div>
    );
};

export default CardSwap;
