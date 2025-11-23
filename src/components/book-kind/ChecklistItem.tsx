import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export function ChecklistItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-sm">
      <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-600"/> <span>{children}</span>
    </div>
  );
}
