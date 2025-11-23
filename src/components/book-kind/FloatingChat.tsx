import React, { useState } from 'react';
import { MessageSquare, X, ArrowLeft, User as UserIcon } from 'lucide-react';

interface DummyUser {
  id: string;
  name: string;
}

interface FloatingChatProps {
  position?: 'left' | 'right';
  user?: { id?: string; name?: string; email?: string };
}

const dummyUsers: DummyUser[] = [
  { id: 'u1', name: 'febfebpro2' },
  { id: 'u2', name: 'Single User' },
  { id: 'u3', name: 'BookKind Admin' },
];

export default function FloatingChat({ position = 'right', user }: FloatingChatProps) {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<DummyUser | null>(null);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [inputUserSearch, setInputUserSearch] = useState('');

  function sendMessage() {
    if (input.trim() && selectedUser) {
      setMessages([...messages, { sender: user?.name || 'Anda', text: input }]);
      setInput('');
    }
  }

  function openChatWith(u: DummyUser) {
    setSelectedUser(u);
    setMessages([
      { sender: u.name, text: `Halo, ini ${u.name}. Ada yang bisa dibantu?` },
      { sender: user?.name || 'Anda', text: 'Halo, saya ingin bertanya.' },
    ]);
  }

  const filteredUsers = dummyUsers.filter(
    u => u.id !== user?.id && u.name.toLowerCase().includes(inputUserSearch.toLowerCase())
  );

  return (
    <div className={`fixed z-50 ${position === 'left' ? 'left-6' : 'right-6'} bottom-6 sm:bottom-20`}>
      {!open && (
        <button
          className="bg-primary text-black rounded-full shadow-lg p-3 flex items-center gap-2 hover:bg-primary/80"
          onClick={() => setOpen(true)}
          aria-label="Buka Chat"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}
      {open && !selectedUser && (
        <div className="w-96 bg-white rounded-xl shadow-2xl border border-border flex flex-col overflow-hidden">
          <div className="flex items-center justify-between bg-primary text-black px-4 py-2">
            <span className="flex items-center gap-2"><MessageSquare className="w-5 h-5" /> Pilih User untuk Chat</span>
            <button onClick={() => setOpen(false)} aria-label="Tutup Chat">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 space-y-2">
            {/* Search input for user list */}
            <input
              type="text"
              className="w-full mb-2 rounded-xl border-2 border-primary/40 px-3 py-2 text-sm focus:outline-none focus:border-primary font-medium bg-muted/20 text-primary"
              placeholder="Cari user..."
              value={inputUserSearch}
              onChange={e => setInputUserSearch(e.target.value)}
            />
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {filteredUsers.length === 0 ? (
                <div className="text-center text-muted-foreground py-6">Tidak ada user ditemukan.</div>
              ) : (
                filteredUsers.map(u => (
                  <button
                    key={u.id}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border hover:bg-primary/10 transition group"
                    onClick={() => openChatWith(u)}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg group-hover:bg-primary/40">
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-primary group-hover:text-primary/80">{u.name}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
      {open && selectedUser && (
        <div className="w-96 bg-white rounded-xl shadow-2xl border border-border flex flex-col overflow-hidden">
          <div className="flex items-center justify-between bg-primary text-black px-4 py-2">
            <span className="flex items-center gap-2"><UserIcon className="w-5 h-5" /> {selectedUser.name}</span>
            <div className="flex gap-2">
              <button onClick={() => setSelectedUser(null)} aria-label="Kembali ke List User">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button onClick={() => setOpen(false)} aria-label="Tutup Chat">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex-1 p-4 space-y-2 overflow-y-auto max-h-64 bg-muted/30">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === (user?.name || 'Anda') ? 'justify-end' : 'justify-start'}`}>
                <span className={`px-4 py-2 rounded-2xl text-sm shadow-md font-medium transition-all
                  ${msg.sender === (user?.name || 'Anda')
                    ? 'bg-primary text-black border border-primary/60'
                    : 'bg-muted text-gray-800 border border-primary/20'}
                `}>{msg.text}</span>
              </div>
            ))}
          </div>
          <div className="p-3 border-t flex gap-2 bg-muted/40">
            {/* Utility icons: emoji and image upload */}
            <button
              type="button"
              className="rounded-xl p-2 bg-white border border-primary/20 text-primary hover:bg-primary/10 transition flex items-center text-2xl"
              aria-label="Emoji"
              tabIndex={-1}
            >
              <span role="img" aria-label="emoji" className="text-2xl">😊</span>
            </button>
            <button
              type="button"
              className="rounded-xl p-2 bg-white border border-primary/20 text-primary hover:bg-primary/10 transition flex items-center"
              aria-label="Upload Gambar"
              tabIndex={-1}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16V8a2 2 0 012-2h12a2 2 0 012 2v8M4 16l4-4a2 2 0 012.828 0l2.344 2.344a2 2 0 002.828 0L20 10M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
              </svg>
            </button>
            <input
              type="text"
              className="flex-1 rounded-xl border-2 border-primary/40 px-3 py-3 text-base focus:outline-none focus:border-primary font-medium bg-white text-primary"
              placeholder="Ketik pesan..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' ? sendMessage() : undefined}
              disabled={!selectedUser}
            />
            <button
              className="bg-primary text-black rounded-xl px-6 py-3 text-base font-bold shadow-md hover:bg-primary/80 transition"
              onClick={sendMessage}
              disabled={!selectedUser}
            >Kirim</button>
          </div>
        </div>
      )}
    </div>
  );
}
