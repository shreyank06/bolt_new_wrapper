"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
const prompt_1 = require("./prompt");
const node_1 = require("./defaults/node");
const react_1 = require("./defaults/react");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const anthropic = new sdk_1.default();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/template", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prompt = req.body.prompt;
    const response = yield anthropic.messages.create({
        messages: [{
                role: 'user', content: prompt
            }],
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 200,
        system: "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra"
    });
    const answer = response.content[0].text; // react or node
    if (answer == "react") {
        res.json({
            prompts: [prompt_1.base_prompt, react_1.baseprompt],
            //uiPrompts: [reactBasePrompt]
        });
        return;
    }
    if (answer == "node") {
        res.json({
            prompts: [node_1.baseprompt]
            //uiPrompts: [reactBasePrompt]
        });
        return;
    }
    res.status(403).json({ message: "You cant access this" });
    return;
}));
app.post("/chat", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const messages = req.body.messages;
    const response = yield anthropic.messages.create({
        messages: messages,
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 8000,
        system: (0, prompt_1.getSystemPrompt)()
    });
    console.log(response);
    res.json({
        response: (_a = response.content[0]) === null || _a === void 0 ? void 0 : _a.text
    });
}));
app.listen(3000);
// async function main() {
//     await anthropic.messages.stream({
//         messages: [{role: 'user', content: "For all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.\n\nBy default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.\n\nUse icons from lucide-react for logos.\n\nUse stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags."},
//             {
//                 role: 'user', content: "{baseprompt}"
//             },
//             {
//                 role: 'user', content: "I'll help you create a todo app with React and TypeScript. I'll include features like adding, completing, and deleting todos, along with a clean and modern UI.\n\n<boltArtifact id=\"todo-app\" title=\"Create Todo Application\">\n<boltAction type=\"file\" filePath=\"src/types/todo.ts\">export interface Todo {\n  id: string;\n  text: string;\n  completed: boolean;\n  createdAt: Date;\n}</boltAction>\n\n<boltAction type=\"file\" filePath=\"src/components/TodoItem.tsx\">import React from 'react';\nimport { Check, Trash2, X } from 'lucide-react';\nimport { Todo } from '../types/todo';\n\ninterface TodoItemProps {\n  todo: Todo;\n  onToggle: (id: string) => void;\n  onDelete: (id: string) => void;\n}\n\nexport function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {\n  return (\n    <div className=\"flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-2 group hover:shadow-md transition-shadow\">\n      <div className=\"flex items-center space-x-3\">\n        <button\n          onClick={() => onToggle(todo.id)}\n          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors\n            ${todo.completed \n              ? 'bg-green-500 border-green-500 text-white' \n              : 'border-gray-300 hover:border-green-500'\n            }`}\n        >\n          {todo.completed && <Check size={14} />}\n        </button>\n        <span className={`text-gray-800 ${todo.completed ? 'line-through text-gray-500' : ''}`}>\n          {todo.text}\n        </span>\n      </div>\n      <button\n        onClick={() => onDelete(todo.id)}\n        className=\"text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity\"\n      >\n        <Trash2 size={18} />\n      </button>\n    </div>\n  );\n}</boltAction>\n\n<boltAction type=\"file\" filePath=\"src/components/TodoInput.tsx\">import React, { useState } from 'react';\nimport { Plus } from 'lucide-react';\n\ninterface TodoInputProps {\n  onAdd: (text: string) => void;\n}\n\nexport function TodoInput({ onAdd }: TodoInputProps) {\n  const [text, setText] = useState('');\n\n  const handleSubmit = (e: React.FormEvent) => {\n    e.preventDefault();\n    if (text.trim()) {\n      onAdd(text.trim());\n      setText('');\n    }\n  };\n\n  return (\n    <form onSubmit={handleSubmit} className=\"flex space-x-2 mb-6\">\n      <input\n        type=\"text\"\n        value={text}\n        onChange={(e) => setText(e.target.value)}\n        placeholder=\"Add a new todo...\"\n        className=\"flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent\"\n      />\n      <button\n        type=\"submit\"\n        className=\"px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors\"\n      >\n        <Plus size={20} />\n      </button>\n    </form>\n  );\n}</boltAction>\n\n<boltAction type=\"file\" filePath=\"src/App.tsx\">import React, { useState } from 'react';\nimport { CheckSquare } from 'lucide-react';\nimport { TodoItem } from './components/TodoItem';\nimport { TodoInput } from './components/TodoInput';\nimport { Todo } from './types/todo';\n\nfunction App() {\n  const [todos, setTodos] = useState<Todo[]>([]);\n\n  const addTodo = (text: string) => {\n    const newTodo: Todo = {\n      id: crypto.randomUUID(),\n      text,\n      completed: false,\n      createdAt: new Date(),\n    };\n    setTodos([newTodo, ...todos]);\n  };\n\n  const toggleTodo = (id: string) => {\n    setTodos(todos.map(todo =>\n      todo.id === id ? { ...todo, completed: !todo.completed } : todo\n    ));\n  };\n\n  const deleteTodo = (id: string) => {\n    setTodos(todos.filter(todo => todo.id !== id));\n  };\n\n  const completedCount = todos.filter(todo => todo.completed).length;\n\n  return (\n    <div className=\"min-h-screen bg-gray-100\">\n      <div className=\"max-w-2xl mx-auto py-12 px-4\">\n        <div className=\"bg-white rounded-xl shadow-lg p-6 mb-8\">\n          <div className=\"flex items-center justify-between mb-8\">\n            <div className=\"flex items-center space-x-3\">\n              <CheckSquare size={32} className=\"text-blue-500\" />\n              <h1 className=\"text-2xl font-bold text-gray-800\">Todo List</h1>\n            </div>\n            <div className=\"text-sm text-gray-500\">\n              {completedCount} of {todos.length} completed\n            </div>\n          </div>\n\n          <TodoInput onAdd={addTodo} />\n\n          <div className=\"space-y-2\">\n            {todos.length === 0 ? (\n              <p className=\"text-center text-gray-500 py-8\">\n                No todos yet. Add one above!\n              </p>\n            ) : (\n              todos.map(todo => (\n                <TodoItem\n                  key={todo.id}\n                  todo={todo}\n                  onToggle={toggleTodo}\n                  onDelete={deleteTodo}\n                />\n              ))\n            )}\n          </div>\n        </div>\n      </div>\n    </div>\n  );\n}\n\nexport default App;</boltAction>\n\n<boltAction type=\"start\">\n<command>npm run dev</command>\n</boltAction>\n</boltArtifact>\n\nI've created a modern and functional todo app with the following features:\n\n1. Add new todos with a clean input interface\n2. Mark todos as complete/incomplete\n3. Delete todos\n4. Track completion progress\n5. Smooth animations and transitions\n6. Responsive design\n7. Clean component structure\n\nThe app is organized into three main components:\n- `App.tsx`: Main component managing the todo state and layout\n- `TodoInput.tsx`: Handles new todo creation\n- `TodoItem.tsx`: Displays individual todos with toggle and delete functionality\n\nThe UI includes:\n- A modern card-based design\n- Hover effects for better interactivity\n- Clear visual feedback for completed items\n- A progress counter\n- Smooth transitions and animations\n- Empty state handling\n\nThe development server is now running and you can start using the todo app. You can:\n- Add new todos using the input field\n- Click the circle button to toggle completion\n- Hover over a todo to reveal the delete button\n- See your progress at the top of the card",
//             }            
//         ],
//         model: 'claude-3-5-sonnet-20241022',
//         max_tokens: 8000,
//         system: getSystemPrompt()
//     }).on('text', (text) => {
//         console.log(text);
//     });
// }
//main();
