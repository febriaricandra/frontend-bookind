import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Truck } from 'lucide-react';
import { Timeline } from './Timeline';

export function DonateSection() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Donasi Buku</CardTitle>
          <CardDescription>Salurkan buku layak baca untuk mendukung Program Buku Berbagi.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Judul/Kategori</Label>
              <Input placeholder="Contoh: Novel remaja, buku sekolah SMP"/>
            </div>
            <div>
              <Label>Jumlah</Label>
              <Input type="number" placeholder="10"/>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Alamat Pickup</Label>
              <Textarea placeholder="Tulis alamat lengkap…"/>
            </div>
            <div>
              <Label>Jadwal</Label>
              <Input type="date"/>
              <div className="text-xs text-muted-foreground mt-1">Mitra logistik ramah lingkungan akan menjemput.</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Truck className="w-4 h-4"/> Pelacakan real-time tersedia.</div>
            <Button className="rounded-2xl">Jadwalkan Pickup</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Dampak Sosial</CardTitle>
          <CardDescription>Ringkasan penyaluran dan penerima manfaat.</CardDescription>
        </CardHeader>
        <CardContent>
          <Timeline items={["1.000+ buku tersalurkan", "15 sekolah/komunitas terbantu", "Laporan triwulan dipublikasikan"]} />
        </CardContent>
      </Card>
    </div>
  );
}
