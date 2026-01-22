'use client';

import { Task, TaskStatus } from '@/types';

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (taskId: string) => void;
    onToggle: (taskId: string) => void;
}

const statusColors: Record<TaskStatus, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    IN_PROGRESS: 'bg-blue-100 text-blue-800 border-blue-300',
    COMPLETED: 'bg-green-100 text-green-800 border-green-300',
};

const statusLabels: Record<TaskStatus, string> = {
    PENDING: 'Pending',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
};

export function TaskCard({ task, onEdit, onDelete, onToggle }: TaskCardProps) {
    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:border-indigo-200">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                        <button
                            onClick={() => onToggle(task.id)}
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${task.status === 'COMPLETED'
                                    ? 'bg-green-500 border-green-500'
                                    : 'border-gray-300 hover:border-indigo-500'
                                }`}
                        >
                            {task.status === 'COMPLETED' && (
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </button>
                        <h3 className={`font-semibold text-gray-900 truncate ${task.status === 'COMPLETED' ? 'line-through text-gray-500' : ''}`}>
                            {task.title}
                        </h3>
                    </div>
                    {task.description && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2 ml-8">{task.description}</p>
                    )}
                    <div className="flex items-center gap-3 ml-8">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColors[task.status]}`}>
                            {statusLabels[task.status]}
                        </span>
                        <span className="text-xs text-gray-400">
                            {new Date(task.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onEdit(task)}
                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
