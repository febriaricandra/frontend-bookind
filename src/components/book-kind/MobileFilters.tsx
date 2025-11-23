import React from 'react';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';

export function MobileFilters({ query, setQuery, price, setPrice, condition, setCondition, bookMatchSeed, setBookMatchSeed }: any) {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline" className="rounded-2xl w-full justify-between"><Search className="w-4 h-4"/> Filter & Cari</Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[75vh] rounded-t-3xl overflow-y-auto">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 w-4 h-4 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Judul, penulis, kategori…" className="pl-8"/>
          </div>
          <div>
            <Label>Harga</Label>
            <Slider value={price} onValueChange={setPrice} min={0} max={60000} step={5000} className="mt-2"/>
          </div>
          <div className="space-y-2">
            <Label>Kondisi</Label>
            <div className="flex items-center gap-2"><Checkbox checked={condition.sangat} onCheckedChange={(v)=>setCondition((c:any)=>({...c, sangat: !!v}))}/> <span>Sangat Baik</span></div>
            <div className="flex items-center gap-2"><Checkbox checked={condition.baik} onCheckedChange={(v)=>setCondition((c:any)=>({...c, baik: !!v}))}/> <span>Baik</span></div>
            <div className="flex items-center gap-2"><Checkbox checked={condition.layak} onCheckedChange={(v)=>setCondition((c:any)=>({...c, layak: !!v}))}/> <span>Layak Baca</span></div>
          </div>
          <div>
            <Label className="mb-2 block">BookMatch AI Seed</Label>
            <Input value={bookMatchSeed} onChange={(e)=>setBookMatchSeed(e.target.value)} placeholder="Contoh: akuntansi, riset, literasi"/>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
