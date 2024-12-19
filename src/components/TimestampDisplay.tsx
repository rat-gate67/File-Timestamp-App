import React from 'react';

interface TimestampDisplayProps {
  timestamp: string | null;
}

export function TimestampDisplay({ timestamp }: TimestampDisplayProps) {
  if (!timestamp) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-2">Timestamp:</h3>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <code className="text-lg">{timestamp}</code>
      </div>
    </div>
  );
}