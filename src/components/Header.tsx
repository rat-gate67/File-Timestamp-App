import React from 'react';
import { Clock } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2">
          <Clock className="w-6 h-6 text-blue-500" />
          <h1 className="text-xl font-semibold">File Timestamp</h1>
        </div>
      </div>
    </header>
  );
}