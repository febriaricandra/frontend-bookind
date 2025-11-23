import React from 'react';
import { BookOpen, ShoppingCart, HeartHandshake, UsersRound, Settings } from 'lucide-react';

export function MobileBottomNav({ tab, setTab, cartCount }: any) {
  const items = [
    { key: 'explore', label: 'Explore', icon: <BookOpen className="w-5 h-5"/> },
    { key: 'sell', label: 'Jual', icon: <ShoppingCart className="w-5 h-5"/> },
    { key: 'donate', label: 'Donasi', icon: <HeartHandshake className="w-5 h-5"/> },
    { key: 'community', label: 'Komunitas', icon: <UsersRound className="w-5 h-5"/> },
    { key: 'profile', label: 'Profil', icon: <Settings className="w-5 h-5"/> },
  ];
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-background/90 backdrop-blur px-2 py-1">
      <ul className="grid grid-cols-5">
        {items.map((it)=> (
          <li key={it.key}>
            <button
              onClick={()=>setTab(it.key)}
              className={`w-full py-2 flex flex-col items-center justify-center gap-1 text-xs ${tab===it.key? 'font-semibold text-foreground' : 'text-muted-foreground'}`}
            >
              {it.icon}
              <span>{it.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
