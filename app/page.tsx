import Link from 'next/link';
import { query } from '@/lib/db';
import DeleteButton from '@/components/DeleteButton';

export default async function TodoList() {
  const { rows: todos } = await query('SELECT * FROM todos ORDER BY created_at DESC');

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Todo List</h1>
          <Link
            href="/add"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200"
          >
            Add New Todo
          </Link>
        </div>

        {todos.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No todos found. Add one to get started!</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`p-4 border rounded-lg ${todo.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                      {todo.title}
                    </h3>
                    {todo.description && (
                      <p className="text-gray-600 mt-1">{todo.description}</p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      href={`/edit/${todo.id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </Link>
                    <DeleteButton id={todo.id} />
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Created: {new Date(todo.created_at).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}