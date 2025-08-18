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
        role: "CEO",
        image: "/team/hursun2.webp",
        description: "Tech founder, community lead, and full Stack developer with 5+ years in web and AI"
    },
    {
        name: "Shantosh",
        role: "CTO",
        image: "/team/shan-placeholder.jpg",
        description: "AI architect, innovation leader with 10+ years in machine learning"
    },
    {
        name: "Dhayananth",
        role: "CMO",
        image: "/team/dhaya2.webp",
        description: "Operations expert, growth strategist focused on scaling tech companies"
    },
    {
        name: "Avinash",
        role: "CHO",
        image: "/team/avinash.webp",
        description: "Operations expert, growth strategist focused on scaling tech companies"
    },
    {
        name: "Manovikram",
        role: "CDO",
        image: "/team/mano.webp",
        description: "Operations expert, growth strategist focused on scaling tech companies"
    }
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
        role: "Full-Stack Developer",
        photo: "/team/hursun2.webp",
        oneLiner: "A full-stack web developer who builds both the front-end and back-end of websites and apps, with a curiosity for AI and IoT.",
        bio: "I'm a full-stack web developer with skills in React, Express, React Native, Next.js, Django, and Three.js. I started with web development and then moved into mobile apps. I am curious by nature, so I explored AI and now use it in my projects to make them smarter. I also work with IoT, combining smart devices with AI-powered software. I am the president of the largest tech club at Rajalakshmi Engineering College.",
        expertise: ["React", "Express", "React Native", "Next.js", "Django", "Three.js", "AI & ML", "IOT"],
        links: {
            linkedin: "https://www.linkedin.com/in/hursun-ss-377659233/",
            github: "https://github.com/Dunking-Dunk"
        }
    },
    {
        name: "Shanthosh S",
        role: "AI & Machine Learning Engineer",
        photo: "/team/shan-placeholder.jpg",
        oneLiner: "An AI and Machine Learning engineer with a track record of developing impactful solutions for industrial applications and disaster management.",
        bio: "A Computer Science student contributing to software solutions for industrial weld metal analysis and mobile phone detection using computer vision.As a Smart India Hackathon 2024 Finalist, he developed several AI and RAG models for coal mining operations.He also serves as the Technical Lead for the Intellexa club, where he has overseen its growth to over 1600 members.",
        expertise: ["Python", "TensorFlow", "LangChain", "FastAPI", "YOLOv8", "Scikit-Learn", "GCP"],
        links: {
            linkedin: "https://www.linkedin.com/in/shanthosh-s-3a1930257/",
            github: "https://github.com/aijurist",
        },
    },
    {
        name: "Dhayananth C",
        role: "Product Engineer",
        photo: "/team/dhaya3.webp",
        oneLiner: "Designing and shipping products that are as elegant as they are performant.",
        bio: "Final-year Information Technology student with a focus on full‑stack and DX. Built scalable web systems, design systems, and internal tooling to speed up product delivery.",
        expertise: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "UX"],
        links: {
            linkedin: "#",
            github: "#",
        },
    },
    {
        name: "Avinash S",
        role: "Software & IoT Developer",
        photo: "/team/avinash.webp",
        oneLiner: "An innovative developer focused on IoT systems, custom programming languages, and AI-driven solutions.",
        bio: "A Computer Science Engineering student specializing in IoT and systems programming. A Smart India Hackathon 2024 Finalist for developing an IoT-based system for coal mines. He has also built a custom programming language and compiler from scratch.He serves as the IoT Lead for the Intellexa Technical Club.",
        expertise: ["C++", "Go", "Python", "LLVM", "Flex", "Bison", "Docker", "Azure", "IoT", "Arduino", "Esp32"],
        links: {
            linkedin: "https://linkedin.com/in/avinash-s",
            github: "https://github.com/alphastar-avi",
        },
    },
    {
        name: "MANOVIKRAM K",
        role: "Creative Developer & AI Enthusiast",
        photo: "/team/mano.webp",
        oneLiner: "A creative developer passionate about solving real-world problems with a blend of technical expertise and design thinking.",
        bio: "A Mechanical Engineering student with hands-on experience in AI model deployment, full-stack development, and UI/UX design. Experienced as a 3D Artist and Frontend Intern, with a strong foundation in building intelligent systems using frameworks like YOLOV5 and FastAPI. Currently serving as the Vice President of the DEVS Club at Rajalakshmi Engineering College.",
        expertise: ["Python", "FastAPI", "Django", "React", "YOLOV5", "Blender", "Figma"],
        links: {
            linkedin: "https://linkedin.com/in/manovikramk",
            github: "https://github.com/manov-ik",
        },
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
    // {
    //     id: "rec-hostel-booking-app",
    //     title: "Full-Stack Hostel Management System",
    //     category: "Web Development & Digital Solutions",
    //     description: "Developed a comprehensive web application to digitize and automate the entire hostel accommodation process for Rajalakshmi Engineering College, from student booking to administrative oversight.",
    //     briefDescription: "Engineered a secure backend using Django REST Framework and a dynamic front end with React (Vite.js), featuring real-time room availability, integrated payment processing, and an analytics dashboard for staff.",
    //     image: "/service/hostel/image-1.webp",
    //     technologies: ["Django", "Django REST Framework", "React", "Vite.js", "PostgreSQL", "Payment Gateway"],
    //     features: [
    //         "Built a modern, full-stack application to replace the manual hostel booking system at Rajalakshmi Engineering College.",
    //         "Developed secure backend APIs using Django REST Framework with real-time room availability tracking and user authentication.",
    //         "Created an intuitive React frontend with Vite.js for seamless student experience including online room selection and integrated payment processing.",
    //         "Implemented an analytics dashboard for administrators with powerful tools for managing rooms, tracking finances, and viewing real-time occupancy data."
    //     ],
    //     link: "/projects/rec-hostel-booking-app"
    // },
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
        name: "Avinash",
        role: "Hardware Developer",
        photo: "/team/avinash.webp",
        bio: "Designs and develops innovative hardware solutions, specializing in embedded systems and IoT devices.",
        links: { linkedin: "#", github: "#" },
    },
    {
        name: "Hursun",
        role: "Full Stack Developer & AI",
        photo: "/team/hursun2.webp",
        bio: "Building scalable full-stack applications while developing cutting-edge AI solutions and machine learning models.",
        links: { linkedin: "#" },
    },
    {
        name: "Dhayanath",
        role: "Marketing & Finance",
        photo: "/team/dhaya2.webp",
        bio: "Drives strategic marketing initiatives and manages financial operations to fuel company growth and market expansion.",
        links: { github: "#" },
    },
    {
        name: "Shantosh",
        role: "AI Developer",
        photo: "/team/shantosh.webp",
        bio: "Developing advanced artificial intelligence algorithms and neural networks for next-generation applications.",
    },
    {
        name: "Mano Vikram",
        role: "UI/UX Designer & 3D Modeler",
        photo: "/team/mano.webp",
        bio: "Creating intuitive user experiences and stunning 3D visualizations that bring digital concepts to life.",
    },
];