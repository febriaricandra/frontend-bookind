'use client'

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from '@/components/auth/auth-provider';
import { AuthForm } from '@/components/auth/auth-form';
import { CartSheetProvider } from './book-kind/CartSheetContext';
import { ExploreSection } from './book-kind/ExploreSection';
import { SellSection } from './book-kind/SellSection';
import { ProfileSection } from './book-kind/ProfileSection';
import { FloatingAccessibilityButton } from './book-kind/FloatingAccessibilityButton';
import { MobileBottomNav } from './book-kind/MobileBottomNav';
import { Hero } from './book-kind/Hero';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import api from "@/lib/apiClient";
import { BookOpen, ShoppingCart, HeartHandshake, UsersRound, Settings, Sparkles, Recycle, Accessibility, User } from 'lucide-react';
import UserManagement from '@/components/admin/UserManagement';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Truck } from 'lucide-react';
import { Timeline } from './book-kind/Timeline';
import { DonateSection } from './book-kind/DonateSection';
import { CommunitySection } from './book-kind/CommunitySection';

// TODO: import DonateSection, CommunitySection if atomic files created

// Komponen untuk font disleksia
const DyslexiaStyle = () => (
  <style>{`
  @font-face {
    font-family: 'OpenDyslexic';
    src: local('OpenDyslexic-Regular'), local('OpenDyslexic');
    font-display: swap;
  }
  .dyslexia * { font-family: OpenDyslexic, system-ui, ui-sans-serif, Segoe UI, Roboto, Helvetica, Arial; }
  .reading-friendly p, .reading-friendly li { line-height: 1.9; }
  `}</style>
);

type BookKindBook = {
  id: string;
  title: string;
  author: string;
  category: string;
  story: string;
  price: number;
  condition: string; // ubah ke string agar bisa "Baru", "Bekas", dll
  img: string | null;
  accessible?: boolean;
  ownerId?: string;
  createdAt?: string;
  updatedAt?: string;
};

export function BookKindApp() {
  const { user, loading, signOut } = useAuth();
  const [tab, setTab] = useState("explore");
  const [query, setQuery] = useState("");
  const [price, setPrice] = useState([0, 60000]);
  const [condition, setCondition] = useState({ baik: true, sangat: true, layak: true });
  const [cart, setCart] = useState<Array<{ book: BookKindBook, qty: number }>>([]);
  const [fontScale, setFontScale] = useState(1);
  const [useDyslexia, setUseDyslexia] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const [donationPercent, setDonationPercent] = useState(5);
  const [bookMatchSeed, setBookMatchSeed] = useState("Akuntansi, finansial, metodologi");
  const [showTrack, setShowTrack] = useState(false);
  const [books, setBooks] = useState<BookKindBook[]>([]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis || null;
    }
  }, []);

  async function fetchBooks() {
    setLoadingBooks(true);
    router.refresh();
    try {
      const res = await api.get('/books');
      console.log("Fetch books response:", res.data);
      // Ambil data dari res.data.data jika success
      if (res.data?.success && Array.isArray(res.data?.data)) {
        setBooks(res.data.data);
      } else {
        setBooks([]);
      }
    } catch {
      setBooks([]);
    } finally {
      setLoadingBooks(false);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, [user]);

  const filtered = useMemo(() => {
    return books.filter((b) => {
      const q = query.toLowerCase();
      // Pastikan semua field yang digunakan ada di data
      const matchesQuery = q ? ((b.title || "") + (b.author || "") + (b.category || "") + (b.story || "")).toLowerCase().includes(q) : true;
      const matchesPrice = typeof b.price === 'number' ? b.price >= price[0] && b.price <= price[1] : true;
      return matchesQuery && matchesPrice;
    });
  }, [books, query, price]);

  function readText(text: string) {
    if (!synthRef.current) return;
    if (voiceOn) {
      synthRef.current.cancel();
      setVoiceOn(false);
      return;
    }
    const uttr = new SpeechSynthesisUtterance(text);
    uttr.lang = "id-ID";
    uttr.rate = 1.0;
    synthRef.current.speak(uttr);
    setVoiceOn(true);
    uttr.onend = () => setVoiceOn(false);
  }

  function addToCart(book: BookKindBook) {
    setCart((prev) => {
      const idx = prev.findIndex((x) => x.book.id === book.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { book, qty: 1 }];
    });
  }

  const subtotal = useMemo(() => cart.reduce((s, i) => s + i.book.price * i.qty, 0), [cart]);
  const donation = useMemo(() => Math.round((donationPercent / 100) * subtotal), [donationPercent, subtotal]);
  const shipping = cart.length ? 12000 : 0;
  const total = subtotal + donation + shipping;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <CartSheetProvider>
      <div className={`${useDyslexia ? "dyslexia" : ""} reading-friendly min-h-screen`} style={{ fontSize: `${fontScale}rem` }}>
        <DyslexiaStyle />
        {/* Navbar */}
        <header className="sticky top-0 z-40 border-border bg-background/90 backdrop-blur px-2 py-1">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-4">
              <span className="font-bold text-lg flex items-center gap-2"><BookOpen className="w-5 h-5" /> BookKind <span className="text-xs font-normal text-muted-foreground">(a.k.a. BookKind)</span></span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="rounded-2xl flex items-center gap-2 border border-border bg-background hover:bg-muted transition px-3 py-2"
                onClick={() => setTab("profile")}
                aria-label="Buka Profil"
              >
                <User className="w-4 h-4" /> {user?.full_name || user?.email}
              </button>
            </div>
          </div>
        </header>
        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-6 pb-24">
          <Hero setTab={setTab} />

          <Tabs value={tab} onValueChange={setTab} className="mt-6">
            <TabsList className={user?.role === 'ADMIN' ? "hidden md:grid grid-cols-5 gap-2 bg-muted/40 p-1 rounded-2xl" : "hidden md:grid grid-cols-4 gap-2 bg-muted/40 p-1 rounded-2xl"}>
              <TabsTrigger value="explore" className="rounded-xl"><BookOpen className="mr-2 h-4 w-4" />Explore</TabsTrigger>
              <TabsTrigger value="sell" className="rounded-xl"><ShoppingCart className="mr-2 h-4 w-4" />Jual</TabsTrigger>
              <TabsTrigger value="donate" className="rounded-xl"><HeartHandshake className="mr-2 h-4 w-4" />Donasi</TabsTrigger>
              <TabsTrigger value="profile" className="rounded-xl"><Settings className="mr-2 h-4 w-4" />Profil</TabsTrigger>
              {user?.role === 'ADMIN' && (
                <TabsTrigger value="admin" className="rounded-xl"><UsersRound className="mr-2 h-4 w-4" />Admin</TabsTrigger>
              )}
            </TabsList>

            {/* EXPLORE */}
            <TabsContent value="explore" className="mt-6">
              <ExploreSection
                query={query}
                setQuery={setQuery}
                price={price}
                setPrice={setPrice}
                condition={condition}
                setCondition={setCondition}
                books={books}
                addToCart={addToCart}
                bookMatchSeed={bookMatchSeed}
                setBookMatchSeed={setBookMatchSeed}
              />
            </TabsContent>

            {/* SELL */}
            <TabsContent value="sell" className="mt-6">
              {user?.membershipActive === false ? (
                <div className="mt-8 p-6 rounded-xl bg-yellow-50 border border-yellow-300 flex flex-col items-center gap-3">
                  <div className="text-lg font-semibold text-yellow-800">Membership Anda belum aktif</div>
                  <div className="text-sm text-yellow-700">Untuk berjualan, Anda wajib memiliki membership aktif. Hubungi admin untuk request membership dan dapatkan fitur eksklusif.</div>
                  <a
                    href={`https://wa.me/6281296859294?text=Halo%20admin,%20saya%20ingin%20request%20membership%20untuk%20akun%20${user?.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl font-bold">Hubungi Admin via WA</button>
                  </a>
                </div>
              ) : (
                <SellSection onBookAdded={fetchBooks} />
              )}
            </TabsContent>

            {/* DONATE */}
            <TabsContent value="donate" className="mt-6">
              <DonateSection />
            </TabsContent>

            {/* COMMUNITY */}
            {/* <TabsContent value="community" className="mt-6">
              <CommunitySection />
            </TabsContent> */}

            {/* PROFILE */}
            <TabsContent value="profile" className="mt-6">
              <ProfileSection showTrack={showTrack} setShowTrack={setShowTrack} user={user} signOut={signOut} />
              {user?.role === 'USER' && user?.membershipActive === false && (
                <div className="mt-8 p-6 rounded-xl bg-yellow-50 border border-yellow-300 flex flex-col items-center gap-3">
                  <div className="text-lg font-semibold text-yellow-800">Membership Anda belum aktif</div>
                  <div className="text-sm text-yellow-700">Hubungi admin untuk request membership dan dapatkan fitur eksklusif.</div>
                  <a
                    href={`https://wa.me/6281296859294?text=Halo%20admin,%20saya%20ingin%20request%20membership%20untuk%20akun%20${user?.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl font-bold">Hubungi Admin via WA</button>
                  </a>
                </div>
              )}
            </TabsContent>

            {/* ADMIN */}
            {user?.role === 'ADMIN' && (
              <TabsContent value="admin" className="mt-6">
                <UserManagement />
              </TabsContent>
            )}
          </Tabs>
          <MobileBottomNav tab={tab} setTab={setTab} role={user?.role} />
        </main>

        <footer className="border-t border-border bg-background py-8 mt-10">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">© 2025 BookKind • Empowering Stories, Sharing Kindness</div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1"><Sparkles className="w-3.5 h-3.5" /> BookMatch AI</Badge>
              <Badge variant="secondary" className="gap-1"><Recycle className="w-3.5 h-3.5" /> Circular Literacy</Badge>
              <Badge variant="secondary" className="gap-1"><Accessibility className="w-3.5 h-3.5" /> Inclusive by Design</Badge>
            </div>
          </div>
        </footer>

        {/* Floating Accessibility Button */}
        <FloatingAccessibilityButton
          fontScale={fontScale}
          setFontScale={setFontScale}
          useDyslexia={useDyslexia}
          setUseDyslexia={setUseDyslexia}
          voiceOn={voiceOn}
          readText={readText}
        />
        {/* Floating Chat - posisi di kiri bawah agar tidak tumpang tindih */}
        {/* <FloatingChat position="left" user={user} /> */}
      </div>
    </CartSheetProvider>
  );
}
