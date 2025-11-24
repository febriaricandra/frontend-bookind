import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardTitle } from '@/components/ui/card';
import { CardDescription } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { LogOut, Truck, MapPinned, CheckCircle2 } from 'lucide-react';
import { currency } from '@/lib/utils';
import api from '@/lib/apiClient';

export function ProfileSection({ showTrack, setShowTrack, user, signOut }: any) {
  const [showTracking, setShowTracking] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [fullName, setFullName] = useState(user?.full_name || user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [address, setAddress] = useState(user?.address || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || user?.phonenumber || '');
  const [saving, setSaving] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put('/profile', { name: fullName, email, address, phoneNumber });
      if (res.data?.success) {
        setEditMode(false);
      } else {
        alert('Gagal update profile');
      }
    } catch (err: any) {
      alert(err?.message || 'Gagal update profile');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Profil</CardTitle>
          <CardDescription>Personal & preferensi akses.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="p-3 rounded-xl bg-muted/50">
            <div className="text-xs text-muted-foreground">Nama</div>
            {editMode ? (
              <form onSubmit={handleSave} className="space-y-2">
                <input
                  className="w-full p-2 rounded border"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Nama Lengkap"
                  required
                />
                <input
                  className="w-full p-2 rounded border"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  type="email"
                />
                <input
                  className="w-full p-2 rounded border"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="Alamat"
                  required
                />
                <input
                  className="w-full p-2 rounded border"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  placeholder="Nomor HP"
                  required
                  type="tel"
                />
                <div className="flex gap-2 mt-2">
                  <Button type="submit" disabled={saving} className="rounded-xl">{saving ? 'Menyimpan...' : 'Simpan'}</Button>
                  <Button type="button" variant="outline" className="rounded-xl" onClick={() => setEditMode(false)}>Batal</Button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{fullName || email}</div>
                  <Button size="sm" variant="outline" className="rounded-xl ml-2" onClick={() => setEditMode(true)}>Edit</Button>
                </div>
              </div>
            )}
          </div>
          {/* <div className="grid grid-cols-2 gap-2">
            {kpis.map((k) => (
              <div key={k.label} className="p-3 rounded-xl bg-muted/50">
                <div className="text-xs text-muted-foreground">{k.label}</div>
                <div className="font-semibold">{k.value}</div>
              </div>
            ))}
          </div> */}
          <div className="mt-2">
            <Label>Preferensi Pembacaan</Label>
            <div className="flex items-center gap-2 mt-2">
              <Checkbox defaultChecked />
              <span>Selalu tampilkan font ramah disleksia</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Checkbox />
              <span>Auto "Dengarkan" deskripsi buku</span>
            </div>
          </div>
          <div className="mt-4">
            <Label>Alamat Tersimpan</Label>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1"><MapPinned className="w-4 h-4" />{address || 'Belum ada alamat tersimpan'}</div>
          </div>
          <div className="mt-4">
            <Label>Nomor HP</Label>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1"><MapPinned className="w-4 h-4" />{phoneNumber || 'Belum ada nomor HP tersimpan'}</div>
          </div>
          <div className="mt-6">
            <Button variant="destructive" className="gap-2 rounded-xl w-full" onClick={signOut} aria-label="Logout">
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pesanan Terakhir */}
      <Card>
        <CardHeader>
          <CardTitle>Pesanan Terakhir</CardTitle>
          <CardDescription>Lacak pengiriman & status.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
            <div>
              <div className="font-semibold">Akuntansi Keuangan Menengah 1</div>
              <div className="text-xs text-muted-foreground">INV #A123 • Rp 45.000</div>
            </div>
            <Button variant="outline" size="sm" className="gap-1 rounded-xl" onClick={() => setShowTracking((v) => !v)}>
              <Truck className="w-4 h-4" /> Lacak
            </Button>
          </div>
          {showTracking && (
            <div className="rounded-xl border bg-background p-4">
              <div className="font-semibold mb-1">Pelacakan Pengiriman</div>
              <div className="text-xs text-muted-foreground mb-2">#A123 • Mitra: GoGreen Logistics</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-green-600"><CheckCircle2 className="w-4 h-4" /> Pesanan Dibuat <span className="text-xs text-muted-foreground ml-2">10:20</span></div>
                <div className="flex items-center gap-2 text-green-600"><Truck className="w-4 h-4" /> Diambil Kurir <span className="text-xs text-muted-foreground ml-2">12:15</span></div>
                <div className="flex items-center gap-2 text-green-600"><Truck className="w-4 h-4" /> Dalam Perjalanan <span className="text-xs text-muted-foreground ml-2">18:40</span></div>
                <div className="flex items-center gap-2 text-green-600"><CheckCircle2 className="w-4 h-4" /> Tiba di Tujuan <span className="text-xs text-muted-foreground ml-2">Besok</span></div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lencana */}
      <Card>
        <CardHeader>
          <CardTitle>Lencana</CardTitle>
          <CardDescription>Pencapaian & badge Anda.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="gap-1"><CheckCircle2 className="w-4 h-4" /> Verified Seller</Badge>
            <Badge variant="secondary" className="gap-1"><Truck className="w-4 h-4" /> Fast Delivery</Badge>
            <Badge variant="secondary" className="gap-1"><CheckCircle2 className="w-4 h-4" /> Donatur Aktif</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
