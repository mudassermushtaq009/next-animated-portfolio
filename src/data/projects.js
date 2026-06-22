const GITHUB = "https://github.com/mudassermushtaq009";

export const projects = [
  {
    id: 1,
    title: "Animated Portfolio",
    description:
      "Personal developer portfolio with hero slider, dark mode, animations, and responsive design built with Next.js.",
    tags: ["Next.js", "React", "Tailwind", "Framer Motion"],
    image: "/hero.png",
    live: "https://next-animated-portfolio-wine.vercel.app",
    github: `${GITHUB}/next-animated-portfolio`,
    details:
      "A fully animated portfolio featuring MERN stack slider, profile section, project showcase, contact form, and mobile-friendly navigation. Deployed on Vercel with static export support for shared hosting.",
  },
  {
    id: 2,
    title: "MERN Task Manager",
    description:
      "Full stack task management app with React frontend, Express REST API, and MongoDB for persistent CRUD operations.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    image: "/slider/mern-architecture.svg",
    github: `${GITHUB}/mern-task-manager`,
    details:
      "MERN stack CRUD application for creating, updating, and deleting tasks. Includes Express API routes, Mongoose schemas, React UI with state management, and MongoDB Atlas integration for cloud database storage.",
  },
  {
    id: 3,
    title: "MERN Notes API",
    description:
      "RESTful notes application with user authentication, protected routes, and a React client connected to MongoDB.",
    tags: ["MERN", "JWT", "REST API", "Mongoose"],
    image: "/slider/node-express-api.svg",
    github: `${GITHUB}/mern-notes-api`,
    details:
      "Secure MERN notes platform with JWT authentication, bcrypt password hashing, Express middleware, MongoDB document storage, and a React dashboard for managing personal notes with full CRUD support.",
  },
  {
    id: 4,
    title: "MERN E-Commerce Store",
    description:
      "Online product catalog with React UI, Express backend, MongoDB product database, and shopping cart functionality.",
    tags: ["React", "Express", "MongoDB", "Redux"],
    image: "/slider/mongodb-database.svg",
    github: `${GITHUB}/mern-ecommerce-store`,
    details:
      "Full stack e-commerce prototype featuring product listings, category filters, cart management, and order APIs. Built with React on the frontend, Node.js/Express on the backend, and MongoDB for product and user data.",
  },
  {
    id: 5,
    title: "MERN Social Dashboard",
    description:
      "Social media style dashboard with user profiles, posts feed, and real-time updates using the MERN stack.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    image: "/slider/react-frontend.svg",
    github: `${GITHUB}/mern-social-dashboard`,
    details:
      "MERN social dashboard with user registration, post creation, profile pages, and API-driven feed. Uses Express for backend routes, MongoDB for storing users and posts, and React for a responsive single-page interface.",
  },
  {
    id: 6,
    title: "MERN Blog Platform",
    description:
      "Blog publishing platform with markdown posts, author management, and a React admin panel backed by MongoDB.",
    tags: ["MERN", "React", "Express", "MongoDB"],
    image: "/slider/mern-stack.svg",
    github: `${GITHUB}/mern-blog-platform`,
    details:
      "Content management MERN app for writing, editing, and publishing blog posts. Includes Express API endpoints, MongoDB collections for posts and authors, and a React frontend with category tags and search filtering.",
  },
];

export const githubProfile = GITHUB;