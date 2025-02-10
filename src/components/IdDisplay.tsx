interface IdDisplayProps {
  id: string | null;
}

export function IdDisplay({ id }: IdDisplayProps) {
  if (!id) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-2">ID:</h3>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <code className="text-lg">{id}</code>
      </div>
    </div>
  );
}