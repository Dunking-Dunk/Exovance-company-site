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
        name: "Hursun",
        role: "Founder",
        image: "/team/hursun2.webp",
        description: "Tech founder, community lead, and full Stack developer with 5+ years in web and AI"
    },
];

export interface Founder {
    name: string;
    role: string;
    photo: string;
    oneLiner: string;
    bio: string;
    expertise: string[];
    links?: {
        linkedin?: string;
        github?: string;
        portfolio?: string;
    };
}

export const founders: Founder[] = [
    {
        name: "Hursun SS",
        role: "Founder",
        photo: "/team/hursun2.webp",
        oneLiner: "Built the CP-SAT timetabling engine from scratch while preparing for finals. Now shipping it to real colleges.",
        bio: "Final-year student at Rajalakshmi Engineering College and president of its largest tech club. Full-stack across React, Next.js, Django, Three.js, and React Native — with AI and IoT layered in. Leads all technical architecture at Exovance.",
        expertise: ["React", "Express", "React Native", "Next.js", "Django", "Three.js", "AI & ML", "IOT"],
        links: {
            linkedin: "https://www.linkedin.com/in/hursun-ss-377659233/",
            github: "https://github.com/Dunking-Dunk"
        }
    },
];

export interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    briefDescription: string;
    image: string;
    technologies: string[];
    features: string[];
    link?: string;
}

export const projects: Project[] = [
    {
        id: "university-management-platform",
        title: "University Management Platform",
        category: "AI Automation & Web Development",
        description: "Architected and developed a full-stack digital platform that integrates a backend AI scheduling engine with a user-facing mobile and web application for seamless university management.",
        briefDescription: "AI-powered university management system with automated timetabling and cross-platform applications for students and faculty.",
        image: "/service/university-timetable/image-1.webp",
        technologies: ["React Native", "React", "Node.js", "Express", "Google OR-Tools", "CP-SAT Solver"],
        features: [
            "Engineered an automated timetabling engine using Google OR-Tools (CP-SAT Solver) to generate conflict-free schedules for 15+ departments by processing complex academic constraints.",
            "Developed a robust RESTful API (Node.js/Express) to serve the optimized schedule data, enabling students and faculty to instantly access their personalized timetables.",
            "Built a feature-rich, cross-platform application (React Native & React) where users can view interactive schedules, manage course registrations, track grades, and receive university-wide announcements."
        ],
        link: "/projects/university-management-platform"
    },
    {
        id: "rec-hostel-booking-app",
        title: "Full-Stack Hostel Management System",
        category: "Web Development & Digital Solutions",
        description: "Developed a comprehensive web application to digitize and automate the entire hostel accommodation process for Rajalakshmi Engineering College, from student booking to administrative oversight.",
        briefDescription: "Engineered a secure backend using Django REST Framework and a dynamic front end with React (Vite.js), featuring real-time room availability, integrated payment processing, and an analytics dashboard for staff.",
        image: "/service/hostel/image-1.webp",
        technologies: ["Django", "Django REST Framework", "React", "Vite.js", "PostgreSQL", "Payment Gateway"],
        features: [
            "Built a modern, full-stack application to replace the manual hostel booking system at Rajalakshmi Engineering College.",
            "Developed secure backend APIs using Django REST Framework with real-time room availability tracking and user authentication.",
            "Created an intuitive React frontend with Vite.js for seamless student experience including online room selection and integrated payment processing.",
            "Implemented an analytics dashboard for administrators with powerful tools for managing rooms, tracking finances, and viewing real-time occupancy data."
        ],
        link: "/product/hostel-app"
    },
    {
        id: "agentic-iot-ai",
        title: "Agentic AI for Document & IoT Data Integration",
        category: "AI Automation & IoT",
        description: "Developed a single-user MVP of an agentic AI system capable of referencing uploaded documents and dynamically retrieving IoT sensor data from an Apache Kafka service. Integrated real-time data visualization by generating PNG-based statistical summaries of coal mine conditions sourced directly from IoT devices.",
        briefDescription: "Agentic AI that integrates document analysis with live IoT data from Apache Kafka, visualizing real-time coal mine conditions.",
        image: "/service/ai-mine-assistant/image-1.webp",
        technologies: ["Agentic AI", "Apache Kafka", "Python", "Pandas", "Matplotlib", "IoT"],
        features: [
            "Developed an agentic AI capable of understanding and referencing user-uploaded documents to inform its decision-making process.",
            "Engineered dynamic retrieval of IoT sensor data from an Apache Kafka service, allowing the AI to access real-time information on demand.",
            "Implemented real-time data visualization by generating PNG-based statistical summaries of coal mine conditions, providing instant insights from live IoT data."
        ],
        link: "/projects/agentic-iot-ai"
    },
    {
        id: "hotel-booking-assistant",
        title: "Hotel Booking Assistant",
        category: "AI Chatbots & API Integration",
        description: "Built an agentic AI chatbot capable of retrieving live hotel booking statuses via the Trivago API, recommending tailored holiday plans for selected destinations, and assisting in hotel reservations. Supported both speech-based interaction and advanced natural language understanding (NLU) for a smooth and intuitive user experience.",
        briefDescription: "AI-powered conversational chatbot that uses the Trivago API for live hotel bookings, offers personalized travel plans, and supports voice commands.",
        image: "/service/hotel-assistant/image-1.webp",
        technologies: ["Agentic AI", "Trivago API", "Python", "Rasa", "NLU", "Speech Recognition"],
        features: [
            "Integrated the Trivago API to enable the AI agent to retrieve live hotel booking statuses and availability in real-time.",
            "Developed a recommendation engine to generate tailored holiday plans and suggest suitable hotels based on user preferences and selected destinations.",
            "Implemented advanced Natural Language Understanding (NLU) and speech-based interaction for a seamless, intuitive, and hands-free user experience in travel planning and booking."
        ],
        link: "/projects/hotel-booking-assistant"
    }
];


type Member = {
    name: string;
    role: string;
    photo: string;
    bio: string;
    links?: { linkedin?: string; github?: string };
};

export const members: Member[] = [
    {
        name: "Hursun",
        role: "Founder",
        photo: "/team/hursun2.webp",
        bio: "Building scalable full-stack applications while developing cutting-edge AI solutions and machine learning models.",
        links: { linkedin: "#" },
    },
];
