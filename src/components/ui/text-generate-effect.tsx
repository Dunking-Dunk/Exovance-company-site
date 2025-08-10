"use client";
import { useEffect, useRef } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";
import { inView } from "motion";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const observerRef = useRef<(() => void) | null>(null);
  let wordsArray = words.split(" ");

  useEffect(() => {
    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current();
    }

    // Reset spans to initial state
    if (scope.current) {
      const spans = scope.current.querySelectorAll('span');
      spans.forEach((span: HTMLElement) => {
        span.style.opacity = '0';
        span.style.filter = filter ? 'blur(10px)' : 'none';
      });
    }

    // Create new observer
    observerRef.current = inView(
      scope.current,
      () => {
        if (scope.current) {
          const spans = scope.current.querySelectorAll('span');
          animate(
            spans,
            {
              opacity: 1,
              filter: filter ? "blur(0px)" : "none",
            },
            {
              duration: duration ? duration : 1,
              delay: stagger(0.2),
            }
          );
        }
      },
      { amount: 0.3 }
    );

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current();
      }
    };
  }, [scope, animate, filter, duration]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          if (word === '<br/>') {
            return <br key={`br-${idx}`} />
          } else {
            return (
              <motion.span
                key={`${word}-${idx}`}
                className="opacity-0 text-customGray"
                style={{
                  filter: filter ? "blur(10px)" : "none"
                }}
              >
                {word}{" "}
              </motion.span>
            );
          }
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn(className)}>
      <div className="mt-4">
        <div className="leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
