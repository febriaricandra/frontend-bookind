import React from 'react';
import { Clock3 } from 'lucide-react';

export function Timeline({ items }: { items: string[] }) {
  return (
    <div className="space-y-3">
      {items.map((t, idx) => (
        <div key={idx} className="flex items-start gap-2">
          <div className="mt-1"><Clock3 className="w-4 h-4 text-muted-foreground"/></div>
          <div>{t}</div>
        </div>
      ))}
    </div>
  );
}
