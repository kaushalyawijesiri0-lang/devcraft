import { ProjectStep } from '../types/guided.types';

export const mernTaskManagerSteps: ProjectStep[] = [
  {
    stepNumber: 1,
    id: 'step-1-express-server',
    title: 'Express Server Setup',
    subtitle: 'Initialize Express app and attach JSON parsing middleware',
    estimatedMinutes: 10,
    xpReward: 50,
    conceptCheck: {
      question: 'What is the primary role of Express.js middleware like express.json() in a Node.js server?',
      concept: 'Express Server Architecture',
      explanation:
        'express.json() parses incoming request bodies containing JSON payloads and attaches the parsed JavaScript object to req.body before route handlers execute.',
      options: [
        {
          id: 'opt-1-a',
          text: 'A. Compiles TypeScript into JavaScript at runtime',
        },
        {
          id: 'opt-1-b',
          text: 'B. Parses incoming request bodies with JSON payloads before route handlers execute',
        },
        {
          id: 'opt-1-c',
          text: 'C. Connects automatically to external MongoDB database instances',
        },
        {
          id: 'opt-1-d',
          text: 'D. Packages and minifies frontend React client code',
        },
      ],
      correctOptionId: 'opt-1-b',
    },
    objectives: [
      { id: 'obj-1-1', text: 'Import express framework in server.js', completed: false },
      { id: 'obj-1-2', text: 'Instantiate the Express app instance', completed: false },
      { id: 'obj-1-3', text: 'Register express.json() middleware for body parsing', completed: false },
      { id: 'obj-1-4', text: 'Export the configured app instance', completed: false },
    ],
    instructionsMarkdown: [
      'In a MERN stack application, the Node.js backend serves as the REST API engine.',
      'Start by importing `express` and creating your application instance with `const app = express()`.',
      'Ensure incoming requests with JSON payloads are parsed by applying `app.use(express.json())`.',
      'Finally, export `app` so our automated test suite and entrypoint can mount it safely.',
    ],
    codeSnippets: [
      {
        title: 'Express Boilerplate Example',
        code: `import express from 'express';\nconst app = express();\napp.use(express.json());\nexport default app;`,
      },
    ],
    hints: {
      level1: 'Check if you have exported the express application as default.',
      level2: 'Make sure express.json() is called as a function inside app.use().',
      solutionSnippet: `import express from 'express';\n\nconst app = express();\n\napp.use(express.json());\n\nexport default app;`,
    },
    defaultActiveFile: 'server.js',
    files: [
      {
        name: 'server.js',
        path: '/server.js',
        language: 'javascript',
        initialCode: `import express from 'express';\n\n// TODO: Initialize express app\nconst app = null;\n\n// TODO: Register express.json() middleware\n\n\nexport default app;\n`,
        solutionCode: `import express from 'express';\n\nconst app = express();\n\napp.use(express.json());\n\nexport default app;\n`,
      },
    ],
    tests: [
      {
        id: 'test-1-1',
        name: 'Express Instance Created',
        description: 'Verify express() produces a valid callable application',
        passed: false,
        errorHint: 'app must be defined using express()',
      },
      {
        id: 'test-1-2',
        name: 'JSON Middleware Registered',
        description: 'app.use(express.json()) must be registered in server.js',
        passed: false,
        errorHint: 'Missing express.json() middleware',
      },
      {
        id: 'test-1-3',
        name: 'Default Export Valid',
        description: 'Module must export the express application instance',
        passed: false,
        errorHint: 'Export default app is missing or undefined',
      },
    ],
  },
  {
    stepNumber: 2,
    id: 'step-2-mongoose-schema',
    title: 'Task Model & Schema',
    subtitle: 'Define Mongoose schema for task titles, completion status, and timestamps',
    estimatedMinutes: 15,
    xpReward: 75,
    conceptCheck: {
      question: 'What is the primary purpose of defining a Mongoose Schema before creating documents in MongoDB?',
      concept: 'Data Modeling & Validation',
      explanation:
        'Mongoose schemas define the structure of documents, default values, validators, and types for consistent, secure database records.',
      options: [
        {
          id: 'opt-2-a',
          text: 'A. Generates HTML user interfaces for client browsers',
        },
        {
          id: 'opt-2-b',
          text: 'B. Defines document structure, data validation, and default field values',
        },
        {
          id: 'opt-2-c',
          text: 'C. Replaces Express routing controllers entirely',
        },
        {
          id: 'opt-2-d',
          text: 'D. Compiles SQL queries into binary format',
        },
      ],
      correctOptionId: 'opt-2-b',
    },
    objectives: [
      { id: 'obj-2-1', text: 'Import mongoose from "mongoose"', completed: false },
      { id: 'obj-2-2', text: 'Define taskSchema with title (String, required) and completed (Boolean)', completed: false },
      { id: 'obj-2-3', text: 'Set default value for completed status to false', completed: false },
      { id: 'obj-2-4', text: 'Compile and export Task model', completed: false },
    ],
    instructionsMarkdown: [
      'Mongoose models provide strong data validation and schema definitions for MongoDB.',
      'Define a `taskSchema` containing `title` (type: String, required: true) and `completed` (type: Boolean, default: false).',
      'Enable `{ timestamps: true }` in the schema options so `createdAt` and `updatedAt` are managed automatically.',
      'Export the model using `mongoose.model("Task", taskSchema)`.',
    ],
    hints: {
      level1: 'Ensure title has both { type: String, required: true } attributes.',
      level2: 'The second parameter of mongoose.Schema() accepts options like { timestamps: true }.',
      solutionSnippet: `import mongoose from 'mongoose';\n\nconst taskSchema = new mongoose.Schema({\n  title: { type: String, required: true, trim: true },\n  completed: { type: Boolean, default: false }\n}, { timestamps: true });\n\nexport const Task = mongoose.model('Task', taskSchema);\nexport default Task;`,
    },
    defaultActiveFile: 'models/Task.js',
    files: [
      {
        name: 'models/Task.js',
        path: '/models/Task.js',
        language: 'javascript',
        initialCode: `import mongoose from 'mongoose';\n\n// TODO: Define taskSchema\nconst taskSchema = new mongoose.Schema({\n  // Add title and completed fields here\n});\n\nexport const Task = mongoose.model('Task', taskSchema);\nexport default Task;\n`,
        solutionCode: `import mongoose from 'mongoose';\n\nconst taskSchema = new mongoose.Schema({\n  title: {\n    type: String,\n    required: true,\n    trim: true\n  },\n  completed: {\n    type: Boolean,\n    default: false\n  }\n}, {\n  timestamps: true\n});\n\nexport const Task = mongoose.model('Task', taskSchema);\nexport default Task;\n`,
      },
    ],
    tests: [
      {
        id: 'test-2-1',
        name: 'Schema Fields Definition',
        description: 'Schema must include title (String, required) and completed (Boolean)',
        passed: false,
        errorHint: 'Missing title or completed in taskSchema',
      },
      {
        id: 'test-2-2',
        name: 'Default Status Assignment',
        description: 'New tasks must default completed to false',
        passed: false,
        errorHint: 'completed field default is not false',
      },
      {
        id: 'test-2-3',
        name: 'Model Export Definition',
        description: 'Task model must be exported properly',
        passed: false,
        errorHint: 'Task model export is missing',
      },
    ],
  },
  {
    stepNumber: 3,
    id: 'step-3-express-routes',
    title: 'Express GET Route',
    subtitle: 'Create a GET route to fetch all tasks from the database and return them as a JSON response.',
    estimatedMinutes: 20,
    xpReward: 100,
    conceptCheck: {
      question: 'In Express.js, what is the correct order of middleware execution when handling a request?',
      concept: 'Understanding middleware flow',
      explanation:
        'In Express.js, middleware functions execute in the exact order they are registered via app.use() or router.use(). Request processing passes through middleware first, reaches matching route handlers, and errors are forwarded to error-handling middleware with (err, req, res, next).',
      options: [
        {
          id: 'opt-a',
          text: 'A. Route handler → Error handler → Middleware',
        },
        {
          id: 'opt-b',
          text: 'B. Middleware (in the order defined) → Route handler → Error handler',
        },
        {
          id: 'opt-c',
          text: 'C. Error handler → Middleware → Route handler',
        },
        {
          id: 'opt-d',
          text: 'D. Middleware → Error handler → Route handler',
        },
      ],
      correctOptionId: 'opt-b',
    },
    objectives: [
      { id: 'obj-3-1', text: 'Create a route handler for GET /api/tasks', completed: false },
      { id: 'obj-3-2', text: 'Fetch all tasks from MongoDB', completed: false },
      { id: 'obj-3-3', text: 'Return the tasks as JSON', completed: false },
      { id: 'obj-3-4', text: 'Handle errors properly', completed: false },
    ],
    instructionsMarkdown: [
      'Open the file routes/tasks.js',
      'Create a route handler for GET /api/tasks',
      'Fetch all tasks from the Task model',
      'Return the tasks as a JSON response',
      'Add error handling using try...catch',
    ],
    codeSnippets: [
      {
        title: 'Route Handler Pattern',
        code: `router.get('/api/tasks', async (req, res) => {\n  try {\n    const tasks = await Task.find();\n    res.json(tasks);\n  } catch (error) {\n    res.status(500).json({ message: error.message });\n  }\n});`,
      },
    ],
    hints: {
      level1: 'Make sure your route handler functions are defined with async (req, res) => { ... }.',
      level2: 'Use await Task.find() to retrieve all task documents, then send with res.json().',
      solutionSnippet: `import express from 'express';\nimport Task from '../models/Task.js';\n\nconst router = express.Router();\n\nrouter.get('/api/tasks', async (req, res) => {\n  try {\n    const tasks = await Task.find();\n    res.json(tasks);\n  } catch (error) {\n    res.status(500).json({ error: error.message });\n  }\n});\n\nexport default router;`,
    },
    defaultActiveFile: 'routes/tasks.js',
    files: [
      {
        name: 'server.js',
        path: '/server.js',
        language: 'javascript',
        initialCode: `import express from 'express';\nimport taskRouter from './routes/tasks.js';\n\nconst app = express();\napp.use(express.json());\napp.use(taskRouter);\n\nexport default app;\n`,
        solutionCode: `import express from 'express';\nimport taskRouter from './routes/tasks.js';\n\nconst app = express();\napp.use(express.json());\napp.use(taskRouter);\n\nexport default app;\n`,
        readOnly: true,
      },
      {
        name: 'routes/tasks.js',
        path: '/routes/tasks.js',
        language: 'javascript',
        initialCode: `import express from 'express';\nimport Task from '../models/Task.js';\n\nconst router = express.Router();\n\nrouter.get('/api/tasks', async (req, res) => {\n  const tasks = await Task.find();\n  res.json(tasks);\n});\n\nexport default router;\n`,
        solutionCode: `import express from 'express';\nimport Task from '../models/Task.js';\n\nconst router = express.Router();\n\nrouter.get('/api/tasks', async (req, res) => {\n  try {\n    const tasks = await Task.find();\n    res.json(tasks);\n  } catch (err) {\n    res.status(500).json({ error: err.message });\n  }\n});\n\nexport default router;\n`,
      },
      {
        name: 'models/Task.js',
        path: '/models/Task.js',
        language: 'javascript',
        initialCode: `import mongoose from 'mongoose';\n\nconst taskSchema = new mongoose.Schema({\n  title: { type: String, required: true },\n  completed: { type: Boolean, default: false }\n}, { timestamps: true });\n\nexport const Task = mongoose.model('Task', taskSchema);\nexport default Task;\n`,
        solutionCode: `import mongoose from 'mongoose';\n\nconst taskSchema = new mongoose.Schema({\n  title: { type: String, required: true },\n  completed: { type: Boolean, default: false }\n}, { timestamps: true });\n\nexport const Task = mongoose.model('Task', taskSchema);\nexport default Task;\n`,
        readOnly: true,
      },
    ],
    tests: [
      {
        id: 'test-3-1',
        name: 'GET /api/tasks Route Handler',
        description: 'Endpoint must return JSON array of task documents',
        passed: false,
        errorHint: 'GET handler did not invoke Task.find() or res.json()',
      },
      {
        id: 'test-3-2',
        name: 'POST /api/tasks Validation',
        description: 'Endpoint must reject requests with missing title with status 400',
        passed: false,
        errorHint: 'Missing title validation check in POST handler',
      },
      {
        id: 'test-3-3',
        name: 'POST /api/tasks Creation Status',
        description: 'Created task must return HTTP 201 Created',
        passed: false,
        errorHint: 'Response status should be 201 for task creation',
      },
    ],
  },
  {
    stepNumber: 4,
    id: 'step-4-react-integration',
    title: 'React UI & Live Preview',
    subtitle: 'Connect task state in React to live REST API endpoints with optimistic updates',
    estimatedMinutes: 20,
    xpReward: 125,
    objectives: [
      { id: 'obj-4-1', text: 'Use useEffect to fetch tasks on component mount', completed: false },
      { id: 'obj-4-2', text: 'Implement handleAddTask to send POST request and append task', completed: false },
      { id: 'obj-4-3', text: 'Add toggle complete state handler for tasks', completed: false },
      { id: 'obj-4-4', text: 'Display interactive task count and filter badges', completed: false },
    ],
    instructionsMarkdown: [
      'In this final step, connect the React Task Manager client to our backend API.',
      'Fetch initial tasks inside `useEffect` with `fetch("/api/tasks")`.',
      'When the user submits the form, call `POST /api/tasks` with JSON payload `{ title }`.',
      'Render task items with interactive checkboxes to toggle their completed state.',
    ],
    hints: {
      level1: 'Ensure tasks state is initialized with an array: useState([]).',
      level2: 'After successful POST, append the new task to state: setTasks(prev => [...prev, createdTask]).',
      solutionSnippet: `const handleAdd = async (title) => {\n  const res = await fetch('/api/tasks', {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify({ title })\n  });\n  const newTask = await res.json();\n  setTasks(prev => [newTask, ...prev]);\n};`,
    },
    defaultActiveFile: 'client/TaskManager.jsx',
    files: [
      {
        name: 'client/TaskManager.jsx',
        path: '/client/TaskManager.jsx',
        language: 'javascript',
        initialCode: `import React, { useState, useEffect } from 'react';\n\nexport default function TaskManager() {\n  const [tasks, setTasks] = useState([]);\n  const [title, setTitle] = useState('');\n\n  useEffect(() => {\n    // TODO: Fetch tasks from /api/tasks\n  }, []);\n\n  const handleAddTask = async (e) => {\n    e.preventDefault();\n    // TODO: POST new task to /api/tasks\n  };\n\n  return (\n    <div className="task-manager">\n      <h2>Task Manager</h2>\n      {/* Render form & list */}\n    </div>\n  );\n}\n`,
        solutionCode: `import React, { useState, useEffect } from 'react';\n\nexport default function TaskManager() {\n  const [tasks, setTasks] = useState([\n    { id: '1', title: 'Learn React Hooks', completed: true },\n    { id: '2', title: 'Build Express REST API', completed: true },\n    { id: '3', title: 'Design Database Schema', completed: false },\n  ]);\n  const [title, setTitle] = useState('');\n\n  const handleAddTask = (e) => {\n    e.preventDefault();\n    if (!title.trim()) return;\n    const newTask = { id: Date.now().toString(), title, completed: false };\n    setTasks(prev => [newTask, ...prev]);\n    setTitle('');\n  };\n\n  const toggleTask = (id) => {\n    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));\n  };\n\n  return (\n    <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-200">\n      <h2 className="text-lg font-bold text-slate-900 mb-3">Task Manager</h2>\n      <form onSubmit={handleAddTask} className="flex gap-2 mb-4">\n        <input\n          value={title}\n          onChange={(e) => setTitle(e.target.value)}\n          placeholder="New task..."\n          className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-sm"\n        />\n        <button type="submit" className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium">\n          Add Task\n        </button>\n      </form>\n      <ul className="space-y-2">\n        {tasks.map(t => (\n          <li key={t.id} onClick={() => toggleTask(t.id)} className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-slate-50">\n            <input type="checkbox" checked={t.completed} readOnly />\n            <span className={t.completed ? 'line-through text-slate-400 text-sm' : 'text-slate-800 text-sm'}>\n              {t.title}\n            </span>\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}\n`,
      },
    ],
    tests: [
      {
        id: 'test-4-1',
        name: 'Initial Tasks Fetch Hook',
        description: 'Component triggers API fetch on mounting via useEffect',
        passed: false,
        errorHint: 'Missing or empty useEffect fetch hook',
      },
      {
        id: 'test-4-2',
        name: 'Task Creation Submission',
        description: 'Form submission correctly appends new task to state',
        passed: false,
        errorHint: 'handleAddTask does not update task list',
      },
      {
        id: 'test-4-3',
        name: 'Toggle Completion Handler',
        description: 'Clicking checkbox toggles completed boolean status',
        passed: false,
        errorHint: 'Toggle handler is not defined',
      },
    ],
  },
];
