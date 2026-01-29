'use client';

import { useState } from 'react';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date(),
      };
      setTodos([newTodo, ...todos]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Todo List
          </h1>
          <p className="text-slate-500">
            Stay organized, stay productive
          </p>
        </div>

        {/* Add Todo Form */}
        <form
          onSubmit={addTodo}
          className="mb-8 bg-white rounded-2xl shadow-lg p-2"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-3 text-lg bg-transparent border-0 outline-none focus:ring-0"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="px-6 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Add
            </button>
          </div>
        </form>

        {/* Todo List */}
        {todos.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Filter Tabs */}
            <div className="flex border-b border-slate-100">
              {(['all', 'active', 'completed'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex-1 py-3 text-sm font-medium capitalize transition-colors ${
                    filter === f
                      ? 'bg-slate-50 text-slate-900'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Todo Items */}
            <ul className="divide-y divide-slate-100">
              {filteredTodos.length === 0 ? (
                <li className="py-12 text-center text-slate-400">
                  {filter === 'all'
                    ? 'No todos yet'
                    : filter === 'active'
                    ? 'No active todos'
                    : 'No completed todos'}
                </li>
              ) : (
                filteredTodos.map((todo) => (
                  <li
                    key={todo.id}
                    className="flex items-center gap-4 px-4 py-4 hover:bg-slate-50 transition-colors group"
                  >
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-colors ${
                        todo.completed
                          ? 'bg-emerald-500 border-emerald-500'
                          : 'border-slate-300 hover:border-emerald-400'
                      }`}
                    >
                      {todo.completed && (
                        <svg
                          className="w-4 h-4 text-white mx-auto"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                    <span
                      className={`flex-1 text-lg transition-all ${
                        todo.completed
                          ? 'text-slate-400 line-through'
                          : 'text-slate-700'
                      }`}
                    >
                      {todo.text}
                    </span>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-all"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </li>
                ))
              )}
            </ul>

            {/* Footer */}
            {(activeCount > 0 || completedCount > 0) && (
              <div className="flex items-center justify-between px-4 py-3 bg-slate-50 text-sm text-slate-500">
                <span>
                  {activeCount} item{activeCount !== 1 ? 's' : ''} left
                </span>
                {completedCount > 0 && (
                  <button
                    onClick={clearCompleted}
                    className="text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    Clear completed
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {todos.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <p className="text-slate-500">Add your first todo to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
