export default function GameGridSkeleton({ count = 12 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-2xl bg-[#111] border border-gray-700 overflow-hidden">
          <div className="h-40 bg-gray-800"/>
          <div className="p-4 space-y-3">
            <div className="h-5 w-3/4 bg-gray-800 rounded"/>
            <div className="h-4 w-1/2 bg-gray-800 rounded"/>
            <div className="h-4 w-full bg-gray-800 rounded"/>
          </div>
        </div>
      ))}
    </div>
  );
}