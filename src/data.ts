export const profile = {
  name: "Prakriti Dahal",
  role: "Full-Stack Developer",
  photo: "/profile2.png",

  intro:
    "I build web applications that solve real problems. From clean user interfaces to APIs and databases, I enjoy turning ideas into useful software.",

  about:
    "I'm a developer at SG Design Group with 2+ years of experience building business applications. I work across React and TypeScript on the frontend and NestJS and GraphQL on the backend. My work includes dashboards, timesheet tools, reporting features, and document management. I enjoy solving problems, learning new things, and building software that is easy to use and maintain.",

  email: "dahal.prakriti99@gmail.com",
  github: "https://github.com/Prakriti14",
  linkedin: "https://www.linkedin.com/in/prakriti-dahal-117864198/",
};

export const query = `query {
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
  '    "skills": ["React", "TypeScript", "NestJS", "GraphQL"],',
  '    "projects": [',
  '      "Timesheets and Reports",',
  '      "Document Management",',
  '      "MEP Calculator",',
  '      "Hotel Website",',
  '      "Music Recommendations"',
  '      "Resume Builder",',
  '      "Shop Admin"',
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
      "Building tools that help teams record work, track progress, and manage project information.",

    points: [
      "Build forms and tables for timesheet management",
      "Add filters, pagination, and status-based views",
      "Connect frontend actions to GraphQL queries and mutations",
      "Work with backend services to manage data and business rules",
    ],

    tags: [
      "React",
      "TypeScript",
      "GraphQL",
      "NestJS",
      "PostgreSQL",
    ],
  },

  {
    kind: "documents",
    title: "Document Management",

    summary:
      "Working on a document system that helps teams upload, organise, and find files.",

    points: [
      "Build file management interfaces and upload workflows",
      "Work with AWS storage and CloudFront delivery",
      "Connect frontend actions to backend APIs",
      "Support access control, search, and document filters",
    ],

    tags: [
      "React",
      "NestJS",
      "GraphQL",
      "AWS",
      "TypeORM",
    ],
  },

  {
    kind: "mep",
    title: "MEP Calculator",
    status: "Currently working on this",

    summary:
      "An engineering web app for HVAC and MEP calculations, with car park and supplementary AC calculators and saved projects.",

    points: [
      "Build the car park and supplementary AC calculators with results views",
      "Save, list, update and delete projects through GraphQL",
      "Create sign-up and sign-in pages with email verification and password reset",
      "Add notifications and a navbar that adapts to the logged-in user",
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
    kind: "music",
    title: "Swortaal",

    summary:
      "A music recommendation project inspired by music streaming platforms, built to help users discover music based on their interests.",

    points: [
      "Developed a music recommendation system as my final-year project",
      "Used the Apriori algorithm to explore patterns in user preferences",
      "Applied matrix factorization for music recommendations",
      "Included user feedback in the recommendation process",
    ],

    tags: [
      "Python",
      "Machine Learning",
      "Apriori",
      "Matrix Factorization",
    ],
  },

  {
    kind: "resume",
    title: "Resume Builder",
    link: "https://resume-delta-pied-38.vercel.app/",
    tab: "Open Resume Builder",

    summary:
      "A resume generator where you fill in your details, pick a template and download a ready-to-send PDF.",

    points: [
      "Build a live preview that updates as you type",
      "Create 8 switchable resume templates",
      "Add and remove multiple work experience entries",
      "Export the resume as a PDF using the browser print dialog",
    ],

    tags: [
      "React",
      "TypeScript",
      "CSS Animations",
    ],
  },

  {
    kind: "shop",
    title: "ShopAdmin",
    link: "https://shopadmin-kappa.vercel.app/",
    tab: "Open Shop Admin",

    summary:
      "A shop dashboard with separate admin and buyer logins, where admins manage orders and stock and buyers browse, order and track deliveries.",

    points: [
      "Build role-based views so admins and buyers see different pages",
      "Create order, inventory, analytics and customer screens for admins",
      "Add a shop, cart and order tracking for buyers",
      "Update stock and send notifications automatically when orders change",
    ],

    tags: [
      "React",
      "TypeScript",
      "Mantine",
      "Tailwind CSS",
    ],
  },

  {
    kind: "hotel",
    title: "Hotel Website",
    link: "https://hotel-website-pi-two.vercel.app/",
    tab: "Open Hotel Website",

    summary:
      "A hotel website with room booking, wellness facilities and a multi-cuisine menu, built entirely on the frontend.",

    points: [
      "Build room listings with type filters and a booking form with validation",
      "Calculate nights, add-ons and tax live in a booking summary",
      "Add scroll reveals, animated illustrations and a light and dark theme",
      "Create sections for sauna, steam room, gym, pool and dining menus",
    ],

    tags: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Vite",
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
      "Mantine",
    ],
    note: "Building responsive interfaces and reusable components",
  },

  {
    name: "API",
    items: [
      "GraphQL",
      "Apollo Client",
    ],
    note: "Connecting the frontend to the data it needs",
  },

  {
    name: "Backend",
    items: [
      "NestJS",
      "TypeORM",
    ],
    note: "Building APIs, handling rules, and managing data",
  },

  {
    name: "Database & Cloud",
    items: [
      "PostgreSQL",
      "AWS",
      "S3",
      "CloudFront",
    ],
    note: "Storing data and delivering files",
  },
];

export const experience = [
  {
    when: "2+ years",
    title: "Full-Stack Developer",
    place: "SG Design Group",

    text:
      "Building and improving business applications, including timesheet tools, document management systems, reporting features, and MEP calculation tools. Working across React, TypeScript, GraphQL, NestJS, and databases to turn requirements into working features.",
  },

  {
    when: "Internship",
    title: "Frontend Developer",
    place: "Hotel Website Project",

    text:
      "Worked with HTML, CSS, and JavaScript to build website interfaces. Gained practical experience with page layouts, styling, and interactive web features.",
  },

  {
    when: "BSc CSIT",
    title: "Final-Year Project",
    place: "Swortaal",

    text:
      "Built a music recommendation system using Apriori, matrix factorization, and user feedback. The project brought together software development and recommendation techniques to help users discover music.",
  },
];