export interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  status: 'done' | 'current' | 'locked';
}

export interface ReviewItem {
  name: string;
  role: string;
  rating: number;
  text: string;
}

export interface GuidedProjectItem {
  id: string;
  title: string;
  description: string;
  overview: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  minutes: number;
  totalSteps: number;
  completedSteps: number;
  tech: string[];
  type: 'Full Stack' | 'Web App' | 'API';
  image: string;
  xp: number;
  reviews: number;
  rating: number;
  popularity: number;
  skills: string[];
  roadmap?: RoadmapStep[];
}

export const mernRoadmap: RoadmapStep[] = [
  { id: 1, title: 'Project Setup', description: 'Set up the development environment and initialize the project.', status: 'done' },
  { id: 2, title: 'Connect to MongoDB', description: 'Connect MongoDB with Mongoose and create the Task model.', status: 'done' },
  { id: 3, title: 'Express GET Route', description: 'Create a GET route that returns every task as JSON.', status: 'current' },
  { id: 4, title: 'Express POST Route', description: 'Create new tasks and save them to MongoDB.', status: 'locked' },
  { id: 5, title: 'PUT Route', description: 'Update a task’s title or completion state.', status: 'locked' },
  { id: 6, title: 'DELETE Route', description: 'Remove tasks safely by id.', status: 'locked' },
  { id: 7, title: 'Frontend Integration', description: 'Connect the React UI to your API.', status: 'locked' },
  { id: 8, title: 'Deployment', description: 'Deploy to production (Vercel + Render).', status: 'locked' },
];

export const sampleReviews: ReviewItem[] = [
  {
    name: 'Nimesha Perera',
    role: 'CS Undergraduate',
    rating: 5,
    text: 'The step-by-step tests made backend click for me. Seeing the live preview update while I typed was addictive.',
  },
  {
    name: 'Kasun Jayawardena',
    role: 'Junior Developer',
    rating: 5,
    text: 'Theory checks before each step are short but they stop you from copy-pasting without understanding.',
  },
  {
    name: 'Ayesha Fernando',
    role: 'Bootcamp Student',
    rating: 4,
    text: 'Great pacing. I’d love an optional TypeScript track, but the roadmap is really clear.',
  },
];

export const guidedProjectsList: GuidedProjectItem[] = [
  {
    id: 'mern-task-manager',
    title: 'Full-Stack MERN Task Manager',
    description: 'Build a complete task management application with user authentication, CRUD operations, and a responsive UI.',
    overview: 'Build a complete task management application with user authentication, CRUD operations, and a responsive UI. Learn how to integrate frontend and backend with real-world best practices.',
    difficulty: 'Beginner',
    duration: '45 mins',
    minutes: 45,
    totalSteps: 8,
    completedSteps: 2,
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    type: 'Full Stack',
    image: '/368bf567-4a7f-4bf0-a92e-615d5e0fb52c.jpg',
    xp: 250,
    reviews: 24,
    rating: 4.8,
    popularity: 98,
    skills: ['REST APIs', 'JWT Authentication', 'CRUD Operations', 'Mongoose Schemas', 'React State', 'Deployment'],
    roadmap: mernRoadmap,
  },
  {
    id: 'weather-app',
    title: 'Weather Forecast App',
    description: 'Create a beautiful weather application using a third-party API with vanilla JavaScript or React.',
    overview: 'Fetch live forecasts from a public weather API, handle loading and error states, and present the data in a clean, responsive interface.',
    difficulty: 'Beginner',
    duration: '30 mins',
    minutes: 30,
    totalSteps: 6,
    completedSteps: 0,
    tech: ['React', 'JavaScript', 'API'],
    type: 'Web App',
    image: '/d24a982f-01a2-4833-8982-d9243750ea66.jpg',
    xp: 150,
    reviews: 41,
    rating: 4.7,
    popularity: 91,
    skills: ['Fetch API', 'Async/Await', 'Conditional Rendering', 'Environment Variables'],
  },
  {
    id: 'realtime-chat',
    title: 'Real-Time Chat Application',
    description: 'Build a real-time chat application using Socket.io with private and group chats.',
    overview: 'Wire up WebSockets with Socket.io, design rooms for private and group conversations, and keep the UI in sync as messages arrive.',
    difficulty: 'Intermediate',
    duration: '1 hour',
    minutes: 60,
    totalSteps: 8,
    completedSteps: 2,
    tech: ['React', 'Socket.io', 'Node.js'],
    type: 'Full Stack',
    image: '/f1c31848-ee3d-49c0-8c81-d654ea4acde5.jpg',
    xp: 300,
    reviews: 18,
    rating: 4.6,
    popularity: 88,
    skills: ['WebSockets', 'Event-driven Design', 'Rooms & Namespaces', 'Optimistic UI'],
  },
  {
    id: 'ecommerce-catalog',
    title: 'E-Commerce Product Catalog',
    description: 'Build a product catalog with search, filtering and category management.',
    overview: 'Model products and categories in MongoDB, expose a searchable API, and build a fast, filterable storefront in React.',
    difficulty: 'Beginner',
    duration: '40 mins',
    minutes: 40,
    totalSteps: 7,
    completedSteps: 0,
    tech: ['React', 'Node.js', 'MongoDB'],
    type: 'Full Stack',
    image: '/fafd7ec3-fa02-4073-a498-f29605d6bfd5.jpg',
    xp: 200,
    reviews: 33,
    rating: 4.7,
    popularity: 86,
    skills: ['Query Filtering', 'Pagination', 'Text Search', 'Component Composition'],
  },
  {
    id: 'rest-api-express',
    title: 'REST API with Express',
    description: 'Learn to build a secure and scalable REST API with authentication and error handling.',
    overview: 'Design resource-oriented endpoints, protect them with JWT, validate input, and centralize error handling the way production APIs do.',
    difficulty: 'Intermediate',
    duration: '1 hour',
    minutes: 60,
    totalSteps: 10,
    completedSteps: 6,
    tech: ['Node.js', 'Express', 'JWT'],
    type: 'API',
    image: '/0cecf4bf-2e48-4be8-83a3-79a0afe6f348.jpg',
    xp: 280,
    reviews: 52,
    rating: 4.9,
    popularity: 95,
    skills: ['Middleware', 'JWT', 'Validation', 'Error Handling', 'Status Codes'],
  },
  {
    id: 'blog-platform',
    title: 'Blog Platform',
    description: 'Create a full-featured blogging platform with rich text editor and comment system.',
    overview: 'Ship a publishing flow with drafts, a rich text editor, nested comments, and author profiles backed by a Node API.',
    difficulty: 'Intermediate',
    duration: '1 hour',
    minutes: 60,
    totalSteps: 10,
    completedSteps: 2,
    tech: ['React', 'Node.js', 'MongoDB'],
    type: 'Full Stack',
    image: '/a508e909-90f9-4378-838c-71bc5f5e1f4a.jpg',
    xp: 300,
    reviews: 15,
    rating: 4.5,
    popularity: 79,
    skills: ['Rich Text', 'Relations', 'Slugs & Routing', 'Comments'],
  },
  {
    id: 'ai-image-generator',
    title: 'AI Image Generator',
    description: 'Build an AI image generation application using OpenAI API with a modern UI.',
    overview: 'Call the OpenAI Images API from a secure backend, stream generation status to the client, and build a gallery for results.',
    difficulty: 'Advanced',
    duration: '2 hours',
    minutes: 120,
    totalSteps: 8,
    completedSteps: 0,
    tech: ['React', 'Node.js', 'OpenAI'],
    type: 'Web App',
    image: '/f47a9c0d-2d97-4d6b-bfaa-ad8e01735cbe.jpg',
    xp: 400,
    reviews: 27,
    rating: 4.8,
    popularity: 93,
    skills: ['OpenAI API', 'Secrets Management', 'Rate Limiting', 'Image Storage'],
  },
  {
    id: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    description: 'Create a data analytics dashboard with interactive charts and real-time data.',
    overview: 'Aggregate metrics on the server, chart them with Chart.js, and keep the dashboard live with polling and smart caching.',
    difficulty: 'Intermediate',
    duration: '1 hour',
    minutes: 60,
    totalSteps: 9,
    completedSteps: 0,
    tech: ['React', 'Chart.js', 'Node.js'],
    type: 'Web App',
    image: '/30f82630-3584-4822-83a2-5a00ad3f604e.jpg',
    xp: 260,
    reviews: 21,
    rating: 4.6,
    popularity: 82,
    skills: ['Aggregation Pipelines', 'Charting', 'Caching', 'Dashboard Layout'],
  },
];
