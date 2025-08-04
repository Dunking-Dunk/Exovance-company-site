export const services = [
    {
        title: "WEB DEVELOPMENT",
        description: "At Exovance, we build futuristic, high-performance websites with seamless functionality and AI-powered innovation—bringing the unimaginable to life.",
        video: 'webdevelopment'
    },
    {
        title: "END-TO-END AI AUTOMATION",
        description: "At Exovance, we deliver end-to-end AI automation that transforms businesses with intelligent, self-evolving solutions. From workflow optimization to advanced AI-driven decision-making, we integrate cutting-edge automation to enhance efficiency, reduce costs, and unlock new possibilities—seamlessly shaping the future of innovation.",
        video: 'automation'
    },
    {
        title: "DATA-DRIVEN ANALYTICS",
        description: "At Exovance, we harness the power of data-driven analytics to unlock deep insights and drive smarter decisions. Our advanced AI-powered solutions transform raw data into actionable intelligence, optimizing performance, predicting trends, and fueling innovation for a future-ready business.",
        video: 'analytics'
    },
    {
        title: "AI MODEL OPTIMIZATION",
        description: "At Exovance, we refine and enhance AI models for peak performance, efficiency, and scalability. Through cutting-edge optimization techniques, we fine-tune algorithms, reduce latency, and maximize accuracy—ensuring your AI systems evolve intelligently and deliver superior results.",
        video: 'optimization'
    }
];

export interface FoundingTeamMember {
    name: string;
    role: string;
    image: string;
    description: string;
}

export const foundingTeam: FoundingTeamMember[] = [
    {
        name: "Hursun",
        role: "CEO",
        image: "/team/hursun.webp",
        description: "Tech founder, community lead"
    },
    {
        name: "Shantosh",
        role: "CTO",
        image: "/team/shantosh.webp",
        description: "AI architect, innovation leader with 10+ years in machine learning"
    },
    {
        name: "Dhayananth",
        role: "CMO",
        image: "/team/dhaya.webp",
        description: "Operations expert, growth strategist focused on scaling tech companies"
    },
    {
        name: "Sarah Davis",
        role: "Lead Developer",
        image: "https://picsum.photos/seed/sarah/400/400",
        description: "Full-stack developer specializing in modern web technologies"
    },
    {
        name: "Alex Chen",
        role: "Data Scientist",
        image: "https://picsum.photos/seed/alex/400/400",
        description: "Analytics expert driving data-driven decision making"
    }
];