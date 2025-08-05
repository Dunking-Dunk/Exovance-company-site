export const services = [
    {
        title: "AI AUTOMATION",
        description: "We deliver end-to-end AI automation that transforms your business. From optimizing workflows to enabling AI-driven decision-making, we integrate intelligent solutions to boost efficiency, cut costs, and unlock new growth opportunities.",
        video: 'automation'
    },
    {
        title: "CUSTOM WEB & APP SOLUTIONS",
        description: "We design and develop bespoke web and mobile applications tailored to your unique business needs. Our team builds high-performance, scalable, and intuitive digital products that provide seamless user experiences and drive results.",
        video: 'analytics'
    },
    {
        title: "BUSINESS WEB SOLUTIONS (HELPDESK, CRM)",
        description: "We specialize in building robust, data-driven web platforms like custom CRMs and helpdesk systems. Our solutions are designed to streamline your operations, enhance customer engagement, and provide the analytical insights you need to grow.",
        video: 'webdevelopment'
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
        name: "Shantosh",
        role: "CTO",
        image: "/team/shantosh.webp",
        description: "AI architect, innovation leader with 10+ years in machine learning"
    },
    {
        name: "Hursun",
        role: "CEO",
        image: "/team/hursun2.webp",
        description: "Tech founder, community lead"
    },
    {
        name: "Dhayananth",
        role: "CMO",
        image: "/team/dhaya.webp",
        description: "Operations expert, growth strategist focused on scaling tech companies"
    }
];