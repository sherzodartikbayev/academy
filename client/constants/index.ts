import {
  Braces,
  Bug,
  CircleGauge,
  GitCompareArrows,
  Home,
  Rss,
  Terminal,
  UserPen,
} from "lucide-react";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaYoutube,
} from "react-icons/fa";

export const courses = [
  {
    slug: "javascript",
    title: "JavaScript",
    thumbnail: "/courses/javascript.webp",
  },
  {
    slug: "typescript",
    title: "TypeScript",
    thumbnail: "/courses/typescript.webp",
  },
  {
    slug: "react",
    title: "React",
    thumbnail: "/courses/react.webp",
  },

  {
    slug: "nestjs",
    title: "Nest.js",
    thumbnail: "/courses/nestjs.webp",
  },
  {
    slug: "nodejs",
    title: "Node.js",
    thumbnail: "/courses/nodejs.webp",
  },
  {
    slug: "webpack",
    title: "Webpack",
    thumbnail: "/courses/webpack.webp",
  },
];

export const projects = [
  {
    slug: "1",
    title: "MERN STACK - Telegram Clone",
    thumbnail: "/projects/projects.webp",
  },
  {
    slug: "2",
    title: "Next.js - X Clone",
    thumbnail: "/projects/projects.webp",
  },
  {
    slug: "3",
    title: "Next.js - Drive Clone",
    thumbnail: "/projects/projects.webp",
  },
  {
    slug: "4",
    title: "Nuxt.js - Jira Clone",
    thumbnail: "/projects/projects.webp",
  },
  {
    slug: "5",
    title: "Node.js - Telegram bot",
    thumbnail: "/projects/projects.webp",
  },
  {
    slug: "6",
    title: "React Native - Netflix Clone",
    thumbnail: "/projects/projects.webp",
  },
];

export const source_codes = [
  {
    id: 1,
    title: "Twitter Clone",
    link: "https://github.com/samarbadriddin0v/twitter-clone",
  },
  {
    id: 2,
    title: "Notion Clone",
    link: "https://github.com/samarbadriddin0v/notion-clone",
  },
  {
    id: 3,
    title: "Google Drive Clone",
    link: "https://github.com/samarbadriddin0v/google-drive-clone",
  },
  {
    id: 4,
    title: "Telegram Clone",
    link: "https://github.com/samarbadriddin0v/telegram-clone",
  },
  {
    id: 5,
    title: "Jira Clone",
    link: "https://github.com/samarbadriddin0v/jira-clone",
  },
  {
    id: 6,
    title: "Seleor Clone",
    link: "https://github.com/samarbadriddin0v/seleor-clone",
  },
];

export const navbar_items = [
  { title: "Home", href: "/", icon: Home },
  { title: "Courses", href: "/courses", icon: Braces },
  { title: "Projects", href: "/projects", icon: Terminal },
  { title: "Source codes", href: "/source-codes", icon: Bug },
  { title: "Dashboard", href: "/dashboard", icon: CircleGauge },
];

export const startups = [
  { title: "Blogs", href: "/blogs", icon: Rss },
  { title: "Resume builder", href: "/resume-builder", icon: UserPen },
  { title: "Beautiful code", href: "/beautiful-code", icon: GitCompareArrows },
];

export const social_items = [
  {
    title: "Telegram",
    href: "https://t.me/sherzod_artikbayev",
    icon: FaTelegram,
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/sherzodartikbayevvv",
    icon: FaInstagram,
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/sherzodartikbayev/",
    icon: FaLinkedin,
  },
  { title: "Youtube", href: "https://www.youtube.com", icon: FaYoutube },
  {
    title: "GitHub",
    href: "https://www.github.com/sherzodartikbayev",
    icon: FaGithub,
  },
];
