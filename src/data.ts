
export const profile = {
  name: "Prakriti Dahal",
  role: "Full-Stack Developer",
  photo: "/profile2.png",

  intro:
    "I build modern web applications from frontend to backend, turning ideas into practical, reliable software using React, TypeScript, NestJS, and GraphQL.",

  about:
    "I'm a developer at SG Design Group with 2+ years of professional experience building business applications. My work focuses on React and TypeScript on the frontend, with experience integrating GraphQL APIs and working with NestJS, PostgreSQL, and related backend technologies. I've contributed to timesheet management, document management, reporting, and engineering calculation applications. I also build independent projects to explore new ideas and strengthen my full-stack development skills. I'm interested in remote opportunities and international teams where I can contribute to useful products and continue growing as a developer.",

  email: "dahal.prakriti99@gmail.com",
  github: "https://github.com/Prakriti14",
  linkedin: "https://www.linkedin.com/in/prakriti-dahal-117864198/",
};

export const query = `query DeveloperProfile {
  developer(name: "Prakriti Dahal") {
    role
    experience
    skills
    projects
  }
}`;

export const response = [
  "{",
  '  "developer": {',
  '    "role": "Full-Stack Developer",',
  '    "experience": "2+ years",',
  '    "skills": [',
  '      "React",',
  '      "TypeScript",',
  '      "NestJS",',
  '      "GraphQL",',
  '      "PostgreSQL",',
  '      "Apollo Client",',
  '      "Tailwind CSS"',
  "    ],",
  '    "projects": [',
  '      "Timesheets & Reports",',
  '      "Document Management",',
  '      "MEP Calculator",',
  '      "ShopAdmin",',
  '      "Resume Builder",',
  '      "Hotel Website",',
  '      "Swortaal"',
  "    ]",
  "  }",
  "}",
];

export type Project = {
  kind:
    | "dashboard"
    | "report"
    | "documents"
    | "music"
    | "resume"
    | "shop"
    | "hotel"
    | "mep";
  title: string;
  summary: string;
  points: string[];
  tags: string[];
  link?: string;
  tab?: string;
  status?: string;
};

export const projects: Project[] = [

  {
    kind: "report",
    title: "Timesheets & Reports",

    summary:
      "Business applications for recording work, tracking project progress, and managing timesheet and reporting workflows.",

    points: [
      "Build timesheet forms, data tables, and status-based views",
      "Implement filtering and pagination for project-related records",
      "Integrate frontend features with GraphQL queries and mutations",
      "Work with backend services to support data handling and business workflows",
    ],

    tags: [
      "React",
      "TypeScript",
      "Mantine",
      "GraphQL",
      "NestJS",
      "PostgreSQL",
    ],
  },

  {
    kind: "documents",
    title: "Document Management",

    summary:
      "A business document management application for uploading, organizing, and accessing files through a web interface.",

    points: [
      "Develop document management interfaces and file upload workflows",
      "Integrate frontend functionality with backend APIs",
      "Work with AWS S3 and CloudFront for file storage and delivery",
      "Contribute to document filtering and access-related workflows",
    ],

    tags: [
      "React",
      "TypeScript",
      "NestJS",
      "GraphQL",
      "AWS S3",
      "CloudFront",
      "TypeORM",
    ],
  },

  {
    kind: "mep",
    title: "MEP Calculator",
    status: "Currently working on this",

    summary:
      "An engineering web application for HVAC and MEP calculations, including car park and supplementary air-conditioning calculators and saved projects.",

    points: [
      "Build calculation forms and results views for engineering workflows",
      "Implement project creation, listing, updating, and deletion through GraphQL",
      "Develop authentication interfaces, including email verification and password reset",
      "Create user-aware navigation and notification workflows",
    ],

    tags: [
      "React",
      "TypeScript",
      "Apollo Client",
      "GraphQL",
      "Mantine",
      "Tailwind CSS",
    ],
  },

  {
    kind: "shop",
    title: "ShopAdmin",
    link: "https://shopadmin-kappa.vercel.app/",
    tab: "View Live Project",

    summary:
      "A shop management dashboard with separate admin and buyer experiences for managing inventory, orders, customers, and purchases.",

    points: [
      "Build role-based interfaces for administrators and buyers",
      "Create inventory, order, customer, and analytics screens",
      "Develop shopping, cart, and order-tracking interfaces",
      "Implement frontend workflows for stock updates and order notifications",
    ],

    tags: [
      "React",
      "TypeScript",
      "Mantine",
      "Tailwind CSS",
    ],
  },

  {
    kind: "resume",
    title: "Resume Builder",
    link: "https://resume-delta-pied-38.vercel.app/",
    tab: "View Live Project",

    summary:
      "A browser-based resume builder that lets users enter their information, switch between templates, preview changes, and export a PDF.",

    points: [
      "Create a live resume preview that updates as users edit information",
      "Build eight switchable resume templates",
      "Support multiple work experience entries",
      "Export resumes to PDF through the browser print dialog",
    ],

    tags: [
      "React",
      "TypeScript",
      "CSS",
      "Responsive Design",
    ],
  },

  {
    kind: "hotel",
    title: "Hotel Website",
    link: "https://hotel-website-pi-two.vercel.app/",
    tab: "View Live Project",

    summary:
      "A responsive hotel website featuring room listings, booking calculations, wellness facilities, and multi-cuisine dining.",

    points: [
      "Build room listings with filters and booking form validation",
      "Calculate stay duration, add-ons, and taxes in the booking summary",
      "Create sections for accommodation, wellness, and dining",
      "Add scroll animations and light and dark themes",
    ],

    tags: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Vite",
    ],
  },

  {
    kind: "music",
    title: "Swortaal",

    summary:
      "A music recommendation system developed as a BSc CSIT final-year project to help users discover music based on preferences and recommendation techniques.",

    points: [
      "Develop a music recommendation system inspired by streaming platforms",
      "Apply the Apriori algorithm to identify patterns in user preferences",
      "Use matrix factorization for music recommendations",
      "Incorporate user feedback into the recommendation process",
    ],

    tags: [
      "Python",
      "Machine Learning",
      "Apriori",
      "Matrix Factorization",
    ],
  },
];

export const layers = [
  {
    name: "Frontend",
    items: [
      "React",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Mantine UI",
      "HTML5",
      "CSS3",
    ],
    note:
      "Building responsive interfaces, reusable components, and interactive application workflows",
  },

  {
    name: "API & State Management",
    items: [
      "GraphQL",
      "Apollo Client",
      "REST API Integration",
    ],
    note:
      "Connecting frontend applications to backend services and managing server data",
  },

  {
    name: "Backend",
    items: [
      "Node.js",
      "NestJS",
      "GraphQL",
      "TypeORM",
    ],
    note:
      "Working with API services, application logic, and data access layers",
  },

  {
    name: "Database & Cloud",
    items: [
      "PostgreSQL",
      "SQL",
      "AWS",
      "S3",
      "CloudFront",
    ],
    note:
      "Working with relational data, cloud storage, and file delivery services",
  },

  {
    name: "Development Tools",
    items: [
      "Git",
      "GitHub",
      "VS Code",
      "ESLint",
      "pgAdmin",
    ],
    note:
      "Version control, debugging, database inspection, and maintaining code quality",
  },
];

export const experience = [
  {
    when: "2+ years",
    title: "Front-End Developer",
    place: "SG Design Group",

    text:
      "Developing business applications using React, TypeScript, and modern UI libraries. Contributing to timesheet management, document management, reporting, and MEP calculation workflows. Integrating GraphQL APIs and collaborating across frontend and backend functionality using technologies including NestJS, PostgreSQL, and TypeORM.",

  },

  {
    when: "Internship",
    title: "Front-End Development Intern",
    place: "Hotel Website Project",

    text:
      "Gained practical web development experience using HTML, CSS, and JavaScript. Worked on website layouts, styling, interactive elements, and the fundamentals of building user-friendly web interfaces.",
  },

  {
    when: "2019–2023",
    title: "BSc CSIT",
    place: "Kathford International College of Engineering and Management",

    text:
      "Completed a Bachelor of Science in Computer Science and Information Technology with 78%. Developed Swortaal, a music recommendation system using the Apriori algorithm, matrix factorization, and user feedback.",
  },
];
