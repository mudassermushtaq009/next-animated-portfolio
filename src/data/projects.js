const GITHUB = "https://github.com/mudassermushtaq009";
const LIVE_BASE = "https://next-animated-portfolio-wine.vercel.app";
const demo = (slug) => `${LIVE_BASE}/demos/${slug}.html`;

export const projects = [
  {
    id: 1,
    title: "Animated Portfolio",
    description:
      "Personal developer portfolio with hero slider, dark mode, animations, and responsive design built with Next.js.",
    tags: ["Next.js", "React", "Tailwind", "Framer Motion"],
    image: "/hero.png",
    live: LIVE_BASE,
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
    live: demo("mern-task-manager"),
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
    live: demo("mern-notes-api"),
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
    live: demo("mern-ecommerce-store"),
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
    live: demo("mern-social-dashboard"),
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
    live: demo("mern-blog-platform"),
    github: `${GITHUB}/mern-blog-platform`,
    details:
      "Content management MERN app for writing, editing, and publishing blog posts. Includes Express API endpoints, MongoDB collections for posts and authors, and a React frontend with category tags and search filtering.",
  },
  {
    id: 7,
    title: "MERN Chat App",
    description:
      "Real-time messaging application with React chat UI, Socket.io events, and MongoDB for storing conversations.",
    tags: ["React", "Socket.io", "Express", "MongoDB"],
    image: "/slider/react-frontend.svg",
    live: demo("mern-chat-app"),
    github: `${GITHUB}/mern-chat-app`,
    details:
      "Full stack chat platform with user rooms, live message delivery via Socket.io, Express REST endpoints, and MongoDB collections for users and chat history. Includes typing indicators and online status support.",
  },
  {
    id: 8,
    title: "MERN Job Portal",
    description:
      "Job listing platform with company profiles, applicant search, filters, and MongoDB-backed job postings.",
    tags: ["MERN", "React", "Express", "MongoDB"],
    image: "/slider/mern-architecture.svg",
    live: demo("mern-job-portal"),
    github: `${GITHUB}/mern-job-portal`,
    details:
      "Recruitment MERN application for posting jobs, browsing openings by category, and managing applications. Built with React frontend, Express API routes, and MongoDB schemas for jobs, companies, and candidates.",
  },
  {
    id: 9,
    title: "MERN Expense Tracker",
    description:
      "Personal finance dashboard to track income, expenses, categories, and monthly budgets with MongoDB.",
    tags: ["React", "Node.js", "MongoDB", "Charts"],
    image: "/slider/mongodb-database.svg",
    live: demo("mern-expense-tracker"),
    github: `${GITHUB}/mern-expense-tracker`,
    details:
      "MERN expense management app with transaction CRUD, category breakdowns, monthly summaries, and a React dashboard. Uses Express for API logic and MongoDB for persistent financial records.",
  },
  {
    id: 10,
    title: "MERN Event Booker",
    description:
      "Event discovery and ticket booking system with React calendar UI, Express APIs, and MongoDB events store.",
    tags: ["React", "Express", "MongoDB", "Booking"],
    image: "/slider/node-express-api.svg",
    live: demo("mern-event-booker"),
    github: `${GITHUB}/mern-event-booker`,
    details:
      "Event management MERN app for listing concerts, workshops, and meetups. Users can browse events, reserve tickets, and view bookings. Powered by Express backend routes and MongoDB document storage.",
  },
  {
    id: 11,
    title: "MERN URL Shortener",
    description:
      "Link shortening service with click analytics, custom aliases, and MongoDB mapping for short URLs.",
    tags: ["Node.js", "Express", "MongoDB", "REST API"],
    image: "/slider/mern-stack.svg",
    live: demo("mern-url-shortener"),
    github: `${GITHUB}/mern-url-shortener`,
    details:
      "MERN URL shortener with slug generation, redirect handling, click count tracking, and a React admin panel. Express serves redirect logic while MongoDB stores original URLs and analytics metadata.",
  },
  {
    id: 12,
    title: "MERN Recipe Finder",
    description:
      "Recipe search app with ingredient filters, saved favorites, and a MongoDB recipe database.",
    tags: ["MERN", "React", "MongoDB", "Search"],
    image: "/slider/react-frontend.svg",
    live: demo("mern-recipe-finder"),
    github: `${GITHUB}/mern-recipe-finder`,
    details:
      "Culinary MERN platform for discovering recipes by cuisine, ingredients, and cook time. Includes React search UI, Express API endpoints, MongoDB recipe collections, and a favorites system for logged-in users.",
  },
];

export const githubProfile = GITHUB;