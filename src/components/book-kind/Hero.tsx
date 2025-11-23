import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BadgeCheck } from 'lucide-react';
import { Timeline } from './Timeline';

export function Hero({ setTab }: { setTab: (tab: string) => void }) {
  return (
    <div className="grid md:grid-cols-2 gap-6 items-center">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Platform buku preloved inklusif, berdaya, dan berkelanjutan.</h1>
        <p className="text-muted-foreground mt-2">Dibangun dengan strategi SHARE: <b>Sustainable</b>, <b>Human-centered</b>, <b>Accessible</b>, <b>Resilient</b>, <b>Empathetic</b>.</p>
        <div className="mt-4 flex gap-2">
          <Button className="rounded-2xl" onClick={() => setTab("explore")}>Jelajah Buku</Button>
          <Button variant="outline" className="rounded-2xl" onClick={() => setTab("sell")}>Jual Buku</Button>
        </div>
      </div>
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BadgeCheck className="w-5 h-5"/> Program Buku Berbagi</CardTitle>
          <CardDescription>Setiap transaksi dapat menyisihkan sebagian untuk mendukung literasi di daerah 3T.</CardDescription>
        </CardHeader>
        <CardContent>
          <Timeline items={["Donasi terhimpun", "Penyaluran ke mitra", "Laporan dampak"]} />
        </CardContent>
      </Card>
    </div>
  );
}
