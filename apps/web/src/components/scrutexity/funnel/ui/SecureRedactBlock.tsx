export function SecureRedactBlock({ lines = 3 }: { lines?: number }) {
  return (
    <div className="relative overflow-hidden p-5 rounded-xl border border-sand-deep/40 bg-paper-light">
      <div className="absolute inset-0 bg-paper/40 backdrop-blur-md z-10" />
      
      <div className="space-y-3 opacity-30 select-none">
        {Array.from({ length: lines }).map((_, i) => (
          <div 
            key={i} 
            className="h-4 bg-ink/20 rounded" 
            style={{ width: `${Math.random() * 40 + 40}%` }} 
          />
        ))}
      </div>
    </div>
  );
}
