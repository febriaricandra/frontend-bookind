import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Recycle, Accessibility, Search, HeartHandshake } from 'lucide-react';
import { BookCard } from './BookCard';
import { MobileFilters } from './MobileFilters';

export function ExploreSection({ query, setQuery, price, setPrice, condition, setCondition, books, addToCart, bookMatchSeed, setBookMatchSeed }: any) {
  return (
    <div className="grid md:grid-cols-4 gap-6">
      {/* Mobile filter trigger */}
      <div className="md:hidden col-span-full -mt-2">
        <MobileFilters
          query={query}
          setQuery={setQuery}
          price={price}
          setPrice={setPrice}
          condition={condition}
          setCondition={setCondition}
          bookMatchSeed={bookMatchSeed}
          setBookMatchSeed={setBookMatchSeed}
        />
      </div>
      {/* Filters */}
      <aside className="hidden md:block md:col-span-1 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Cari & Filter</CardTitle>
            <CardDescription>Temukan buku sesuai kebutuhanmu.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 w-4 h-4 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Judul, penulis, kategori…" className="pl-8" />
            </div>
            <div>
              <Label>Harga</Label>
              <Slider value={price} onValueChange={setPrice} min={0} max={60000} step={5000} className="mt-2" />
            </div>
            <div className="space-y-2">
              <Label>Kondisi</Label>
              <div className="flex items-center gap-2"><Checkbox checked={condition.sangat} onCheckedChange={(v) => setCondition((c: any) => ({ ...c, sangat: !!v }))} /> <span>Sangat Baik</span></div>
              <div className="flex items-center gap-2"><Checkbox checked={condition.baik} onCheckedChange={(v) => setCondition((c: any) => ({ ...c, baik: !!v }))} /> <span>Baik</span></div>
              <div className="flex items-center gap-2"><Checkbox checked={condition.layak} onCheckedChange={(v) => setCondition((c: any) => ({ ...c, layak: !!v }))} /> <span>Layak Baca</span></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><Sparkles className="w-4 h-4" /> BookMatch AI</CardTitle>
            <CardDescription>Rekomendasi berdasar minat.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input value={bookMatchSeed} onChange={(e) => setBookMatchSeed(e.target.value)} placeholder="Contoh: akuntansi, riset, literasi" />
            <div className="text-xs text-muted-foreground">(*Mockup) Algoritma akan belajar dari penelusuran & pembelianmu.</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Label Dampak</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="gap-1"><Recycle className="w-3.5 h-3.5" /> Circular</Badge>
            <Badge variant="secondary" className="gap-1"><Accessibility className="w-3.5 h-3.5" /> Accessible</Badge>
            <Badge variant="secondary" className="gap-1"><HeartHandshake className="w-3.5 h-3.5" /> Social</Badge>
          </CardContent>
        </Card>
      </aside>

      {/* Results */}
      <section className="md:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
        {books.map((b: any) => (
          <BookCard key={b.id} book={b} onAdd={() => addToCart(b)} />
        ))}
        {books.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="p-6 text-center text-muted-foreground">Tidak ada hasil sesuai filter.</CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
