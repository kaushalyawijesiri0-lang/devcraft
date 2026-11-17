import { GuidedProject } from '../types/guided.types';
import { mernTaskManagerSteps } from './projectSteps';

export const sampleProjects: GuidedProject[] = [
  {
    id: 'mern-task-manager',
    title: 'Full-Stack MERN Task Manager',
    tagline: 'Build a production-ready task manager with Express CRUD, Mongoose Schemas, and React live preview.',
    description:
      'Step-by-step fullstack implementation: set up an Express REST server, define MongoDB schemas, wire up asynchronous GET/POST API endpoints, and bind live task state to React with real-time testing.',
    category: 'fullstack',
    difficulty: 'Beginner',
    durationMinutes: 65,
    totalSteps: 4,
    xpPoints: 350,
    technologies: ['React 18', 'Node.js', 'Express', 'MongoDB', 'REST API'],
    color: 'from-blue-600 to-indigo-600',
    iconName: 'CheckSquare',
    steps: mernTaskManagerSteps,
  },
  {
    id: 'jwt-auth-flow',
    title: 'JWT Authentication & Security Guard',
    tagline: 'Implement stateless token authentication, password hashing with bcrypt, and protected middleware.',
    description:
      'Master token-based auth by hashing credentials, signing secure JWT payloads, setting up auth headers, and building an authentication route guard.',
    category: 'backend',
    difficulty: 'Intermediate',
    durationMinutes: 45,
    totalSteps: 3,
    xpPoints: 300,
    technologies: ['Node.js', 'JWT', 'bcrypt', 'Express Middleware'],
    color: 'from-emerald-600 to-teal-600',
    iconName: 'ShieldCheck',
    steps: [],
  },
  {
    id: 'ecommerce-cart-api',
    title: 'E-Commerce Cart & Checkout API',
    tagline: 'Build a performant cart calculation engine with inventory lock and atomic MongoDB updates.',
    description:
      'Handle real-world business logic: subtotal calculation, coupon validation, stock verification, and transactional order submissions.',
    category: 'database',
    difficulty: 'Advanced',
    durationMinutes: 80,
    totalSteps: 5,
    xpPoints: 500,
    technologies: ['MongoDB Aggregations', 'Express', 'Transactions', 'Stripe'],
    color: 'from-purple-600 to-pink-600',
    iconName: 'ShoppingCart',
    steps: [],
  },
];
