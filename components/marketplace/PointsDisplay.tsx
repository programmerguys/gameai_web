import React from 'react';

interface PointsDisplayProps {
  points: number;
}

export function PointsDisplay({ points }: PointsDisplayProps) {
  return (
    <div className="flex items-center bg-primary/10 text-primary rounded-lg px-3 py-1.5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 mr-2"
        aria-hidden="true"
      >
        <title>积分图标</title>
        <circle cx="12" cy="12" r="10" />
        <path d="M14.7 9.5v5" />
        <path d="M9.3 9.5v5" />
        <path d="M9.3 14.5H17" />
        <path d="M7 10.5h7.7" />
      </svg>
      <span className="font-semibold">{points} 积分</span>
    </div>
  );
} 