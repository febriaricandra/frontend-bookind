import React from "react";
import { BookOpen, ShoppingCart } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export interface CartBook {
  book: {
    id: string;
    title: string;
    author: string;
    price: number;
    condition: string;
    category: string;
    story: string;
    accessible: string[] | boolean;
    eco?: boolean;
    img: string;
    rating?: number;
    seller?: string;
    ownerId?: string;
    owner?: { name: string };
  };
  qty: number;
}

export interface CartSheetProps {
  cart: CartBook[];
  setCart: React.Dispatch<React.SetStateAction<CartBook[]>>;
  subtotal: number;
  donation: number;
  shipping: number;
  total: number;
  donationPercent: number;
  setDonationPercent: (v: number) => void;
  setShowTrack: (v: boolean) => void;
}

function currency(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}

export function CartSheet({ cart, setCart, subtotal, donation, shipping, total, donationPercent, setDonationPercent, setShowTrack }: CartSheetProps) {
  // Group cart items by owner name
  const cartByOwnerName = React.useMemo(() => {
    const groups: { [ownerName: string]: CartBook[] } = {};
    cart.forEach(item => {
      const ownerName = item.book.owner?.name || 'unknown';
      if (!groups[ownerName]) groups[ownerName] = [];
      groups[ownerName].push(item);
    });
    return groups;
  }, [cart]);

  function inc(id: string) {
    setCart((prev) => prev.map((i) => i.book.id === id ? { ...i, qty: i.qty + 1 } : i));
  }
  function dec(id: string) {
    setCart((prev) => prev.map((i) => i.book.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i));
  }
  function removeItem(id: string) {
    setCart((prev) => prev.filter((i) => i.book.id !== id));
  }

  function handleCheckout(ownerName: string) {
    setCart((prev) => prev.filter((i) => (i.book.owner?.name || 'unknown') !== ownerName));
    setShowTrack(true);
    alert(`Checkout ke penjual ${ownerName} berhasil!`);
  }

  return (
    <Sheet>
      {/* <SheetTrigger>
        <Button variant="outline" className="rounded-2xl gap-2"><ShoppingCart className="w-4 h-4"/> Keranjang ({cart.length})</Button>
      </SheetTrigger> */}
      <SheetContent side="right" className="w-[420px] sm:w-[520px] bg-white px-4">
        <SheetHeader>
          <SheetTitle>Keranjang</SheetTitle>
        </SheetHeader>
        <div className="mt-4 grid gap-4 max-h-[80vh] overflow-y-auto pr-2">
          {cart.length === 0 && <div className="text-sm text-muted-foreground">Belum ada item.</div>}
          {Object.entries(cartByOwnerName).map(([ownerName, items]) => (
            ownerName === 'unknown' ? null : (
              <div key={ownerName} className="mb-6 border-2 border-primary/60 rounded-xl bg-muted/10">
                <div className="font-bold mb-2 text-primary">Penjual: {ownerName}</div>
                {items.map((i) => (
                  <Card key={i.book.id} className="mb-2">
                    <CardContent className="p-4 flex items-start gap-3">
                      <div className="w-16 h-16 rounded-lg bg-muted grid place-content-center text-muted-foreground"><BookOpen className="w-6 h-6"/></div>
                      <div className="flex-1">
                        <div className="font-medium line-clamp-1">{i.book.title}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">{i.book.author}</div>
                        <div className="flex items-center gap-2 mt-2">
                          <Button size="icon" variant="outline" className="rounded-full" onClick={() => dec(i.book.id)}>-</Button>
                          <div className="w-8 text-center">{i.qty}</div>
                          <Button size="icon" variant="outline" className="rounded-full" onClick={() => inc(i.book.id)}>+</Button>
                          <div className="ml-auto font-semibold">{currency(i.book.price * i.qty)}</div>
                        </div>
                        <div className="mt-2 text-xs"><Button variant="ghost" size="sm" className="rounded-xl" onClick={() => removeItem(i.book.id)}>Hapus</Button></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <div className="border rounded-xl p-3 space-y-2 mt-2">
                  <div className="flex items-center justify-between text-sm"><span>Subtotal</span><span>{currency(items.reduce((s, i) => s + i.book.price * i.qty, 0))}</span></div>
                  <Button className="rounded-2xl w-full mt-2" onClick={() => handleCheckout(ownerName)}>Checkout ke Penjual Ini</Button>
                </div>
              </div>
            )
          ))}
          <div className="border rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between text-sm"><span>Subtotal</span><span>{currency(subtotal)}</span></div>
            <div className="flex items-center justify-between text-sm"><span>Pengiriman</span><span>{currency(shipping)}</span></div>
            <div className="flex items-center justify-between text-sm">
              <span>Donasi Buku Berbagi</span>
              <span className="font-medium">{currency(donation)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Slider value={[donationPercent]} onValueChange={(v) => setDonationPercent(v[0])} min={0} max={20} step={1} />
              <div className="text-xs w-10 text-right">{donationPercent}%</div>
            </div>
            <div className="flex items-center justify-between font-semibold pt-2 border-t"><span>Total</span><span>{currency(total)}</span></div>
          </div>
          <div className="text-xs text-muted-foreground">Pembayaran via payment gateway tepercaya (mockup).</div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
