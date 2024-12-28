export const baseprompt = "# Project Files\n\nThe following is a list of all project files and their complete contents that are currently visible and accessible to you.\n\neslint.config.js:\n```\nimport js from '@eslint/js';\nimport globals from 'globals';\nimport reactHooks from 'eslint-plugin-react-hooks';\nimport reactRefresh from 'eslint-plugin-react-refresh';\nimport tseslint from 'typescript-eslint';\n\nexport default tseslint.config(\n  { ignores: ['dist'] },\n  {\n    extends: [js.configs.recommended, ...tseslint.configs.recommended],\n    files: ['**/*.{ts,tsx}'],\n    languageOptions: {\n      ecmaVersion: 2020,\n      globals: globals.browser,\n    },\n    plugins: {\n      'react-hooks': reactHooks,\n      'react-refresh': reactRefresh,\n    },\n    rules: {\n      ...reactHooks.configs.recommended.rules,\n      'react-refresh/only-export-components': [\n        'warn',\n        { allowConstantExport: true },\n      ],\n    },\n  }\n);\n\n```\n\nindex.html:\n```\n<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <link rel=\"icon\" type=\"image/svg+xml\" href=\"/vite.svg\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Vite + React + TS</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.tsx\"></script>\n  </body>\n</html>\n\n```\n\npackage.json:\n```\n{\n  \"name\": \"vite-react-typescript-starter\",\n  \"private\": true,\n  \"version\": \"0.0.0\",\n  \"type\": \"module\",\n  \"scripts\": {\n    \"dev\": \"vite\",\n    \"build\": \"vite build\",\n    \"lint\": \"eslint .\",\n    \"preview\": \"vite preview\"\n  },\n  \"dependencies\": {\n    \"lucide-react\": \"^0.344.0\",\n    \"react\": \"^18.3.1\",\n    \"react-dom\": \"^18.3.1\"\n  },\n  \"devDependencies\": {\n    \"@eslint/js\": \"^9.9.1\",\n    \"@types/react\": \"^18.3.5\",\n    \"@types/react-dom\": \"^18.3.0\",\n    \"@vitejs/plugin-react\": \"^4.3.1\",\n    \"autoprefixer\": \"^10.4.18\",\n    \"eslint\": \"^9.9.1\",\n    \"eslint-plugin-react-hooks\": \"^5.1.0-rc.0\",\n    \"eslint-plugin-react-refresh\": \"^0.4.11\",\n    \"globals\": \"^15.9.0\",\n    \"postcss\": \"^8.4.35\",\n    \"tailwindcss\": \"^3.4.1\",\n    \"typescript\": \"^5.5.3\",\n    \"typescript-eslint\": \"^8.3.0\",\n    \"vite\": \"^5.4.2\"\n  }\n}\n\n```\n\npostcss.config.js:\n```\nexport default {\n  plugins: {\n    tailwindcss: {},\n    autoprefixer: {},\n  },\n};\n\n```\n\nsrc/App.tsx:\n```\nimport React, { useState } from 'react';\nimport { CheckSquare } from 'lucide-react';\nimport { TodoItem } from './components/TodoItem';\nimport { TodoInput } from './components/TodoInput';\nimport { Todo } from './types/todo';\n\nfunction App() {\n  const [todos, setTodos] = useState<Todo[]>([]);\n\n  const addTodo = (text: string) => {\n    const newTodo: Todo = {\n      id: crypto.randomUUID(),\n      text,\n      completed: false,\n      createdAt: new Date(),\n    };\n    setTodos([newTodo, ...todos]);\n  };\n\n  const toggleTodo = (id: string) => {\n    setTodos(todos.map(todo =>\n      todo.id === id ? { ...todo, completed: !todo.completed } : todo\n    ));\n  };\n\n  const deleteTodo = (id: string) => {\n    setTodos(todos.filter(todo => todo.id !== id));\n  };\n\n  const completedCount = todos.filter(todo => todo.completed).length;\n\n  return (\n    <div className=\"min-h-screen bg-gray-100\">\n      <div className=\"max-w-2xl mx-auto py-12 px-4\">\n        <div className=\"bg-white rounded-xl shadow-lg p-6 mb-8\">\n          <div className=\"flex items-center justify-between mb-8\">\n            <div className=\"flex items-center space-x-3\">\n              <CheckSquare size={32} className=\"text-blue-500\" />\n              <h1 className=\"text-2xl font-bold text-gray-800\">Todo List</h1>\n            </div>\n            <div className=\"text-sm text-gray-500\">\n              {completedCount} of {todos.length} completed\n            </div>\n          </div>\n\n          <TodoInput onAdd={addTodo} />\n\n          <div className=\"space-y-2\">\n            {todos.length === 0 ? (\n              <p className=\"text-center text-gray-500 py-8\">\n                No todos yet. Add one above!\n              </p>\n            ) : (\n              todos.map(todo => (\n                <TodoItem\n                  key={todo.id}\n                  todo={todo}\n                  onToggle={toggleTodo}\n                  onDelete={deleteTodo}\n                />\n              ))\n            )}\n          </div>\n        </div>\n      </div>\n    </div>\n  );\n}\n\nexport default App;\n```\n\nsrc/components/TodoInput.tsx:\n```\nimport React, { useState } from 'react';\nimport { Plus } from 'lucide-react';\n\ninterface TodoInputProps {\n  onAdd: (text: string) => void;\n}\n\nexport function TodoInput({ onAdd }: TodoInputProps) {\n  const [text, setText] = useState('');\n\n  const handleSubmit = (e: React.FormEvent) => {\n    e.preventDefault();\n    if (text.trim()) {\n      onAdd(text.trim());\n      setText('');\n    }\n  };\n\n  return (\n    <form onSubmit={handleSubmit} className=\"flex space-x-2 mb-6\">\n      <input\n        type=\"text\"\n        value={text}\n        onChange={(e) => setText(e.target.value)}\n        placeholder=\"Add a new todo...\"\n        className=\"flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent\"\n      />\n      <button\n        type=\"submit\"\n        className=\"px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors\"\n      >\n        <Plus size={20} />\n      </button>\n    </form>\n  );\n}\n```\n\nsrc/components/TodoItem.tsx:\n```\nimport React from 'react';\nimport { Check, Trash2, X } from 'lucide-react';\nimport { Todo } from '../types/todo';\n\ninterface TodoItemProps {\n  todo: Todo;\n  onToggle: (id: string) => void;\n  onDelete: (id: string) => void;\n}\n\nexport function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {\n  return (\n    <div className=\"flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-2 group hover:shadow-md transition-shadow\">\n      <div className=\"flex items-center space-x-3\">\n        <button\n          onClick={() => onToggle(todo.id)}\n          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors\n            ${todo.completed \n              ? 'bg-green-500 border-green-500 text-white' \n              : 'border-gray-300 hover:border-green-500'\n            }`}\n        >\n          {todo.completed && <Check size={14} />}\n        </button>\n        <span className={`text-gray-800 ${todo.completed ? 'line-through text-gray-500' : ''}`}>\n          {todo.text}\n        </span>\n      </div>\n      <button\n        onClick={() => onDelete(todo.id)}\n        className=\"text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity\"\n      >\n        <Trash2 size={18} />\n      </button>\n    </div>\n  );\n}\n```\n\nsrc/index.css:\n```\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n```\n\nsrc/main.tsx:\n```\nimport { StrictMode } from 'react';\nimport { createRoot } from 'react-dom/client';\nimport App from './App.tsx';\nimport './index.css';\n\ncreateRoot(document.getElementById('root')!).render(\n  <StrictMode>\n    <App />\n  </StrictMode>\n);\n\n```\n\nsrc/types/todo.ts:\n```\nexport interface Todo {\n  id: string;\n  text: string;\n  completed: boolean;\n  createdAt: Date;\n}\n```\n\nsrc/vite-env.d.ts:\n```\n/// <reference types=\"vite/client\" />\n\n```\n\ntailwind.config.js:\n```\n/** @type {import('tailwindcss').Config} */\nexport default {\n  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n};\n\n```\n\ntsconfig.app.json:\n```\n{\n  \"compilerOptions\": {\n    \"target\": \"ES2020\",\n    \"useDefineForClassFields\": true,\n    \"lib\": [\"ES2020\", \"DOM\", \"DOM.Iterable\"],\n    \"module\": \"ESNext\",\n    \"skipLibCheck\": true,\n\n    /* Bundler mode */\n    \"moduleResolution\": \"bundler\",\n    \"allowImportingTsExtensions\": true,\n    \"isolatedModules\": true,\n    \"moduleDetection\": \"force\",\n    \"noEmit\": true,\n    \"jsx\": \"react-jsx\",\n\n    /* Linting */\n    \"strict\": true,\n    \"noUnusedLocals\": true,\n    \"noUnusedParameters\": true,\n    \"noFallthroughCasesInSwitch\": true\n  },\n  \"include\": [\"src\"]\n}\n\n```\n\ntsconfig.json:\n```\n{\n  \"files\": [],\n  \"references\": [\n    { \"path\": \"./tsconfig.app.json\" },\n    { \"path\": \"./tsconfig.node.json\" }\n  ]\n}\n\n```\n\ntsconfig.node.json:\n```\n{\n  \"compilerOptions\": {\n    \"target\": \"ES2022\",\n    \"lib\": [\"ES2023\"],\n    \"module\": \"ESNext\",\n    \"skipLibCheck\": true,\n\n    /* Bundler mode */\n    \"moduleResolution\": \"bundler\",\n    \"allowImportingTsExtensions\": true,\n    \"isolatedModules\": true,\n    \"moduleDetection\": \"force\",\n    \"noEmit\": true,\n\n    /* Linting */\n    \"strict\": true,\n    \"noUnusedLocals\": true,\n    \"noUnusedParameters\": true,\n    \"noFallthroughCasesInSwitch\": true\n  },\n  \"include\": [\"vite.config.ts\"]\n}\n\n```\n\nvite.config.ts:\n```\nimport { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\n// https://vitejs.dev/config/\nexport default defineConfig({\n  plugins: [react()],\n  optimizeDeps: {\n    exclude: ['lucide-react'],\n  },\n});\n\n```\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - .bolt/prompt\n  - .bolt/config.json\n  - package-lock.json"