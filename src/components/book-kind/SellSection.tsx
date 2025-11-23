import React, { useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Mic, MicOff } from 'lucide-react';
import { ChecklistItem } from './ChecklistItem';
import { useAuth } from '@/components/auth/auth-provider';
import api from '@/lib/apiClient';

export function SellSection({ onBookAdded }: { onBookAdded?: () => void }) {
  const [recording, setRecording] = useState(false);
  const [form, setForm] = useState({
    title: '',
    author: '',
    price: '',
    condition: 'Sangat Baik',
    category: 'Referensi Kuliah',
    story: '',
    accessible: false,
    img: '', // Will be set after upload
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] || null;
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      let res;
      if (imageFile) {
        const formData = new FormData();
        formData.append('img', imageFile);
        formData.append('title', form.title);
        formData.append('author', form.author);
        formData.append('price', form.price);
        formData.append('condition', form.condition);
        formData.append('category', form.category);
        formData.append('story', form.story);
        formData.append('accessible', form.accessible ? 'true' : 'false');
        res = await api.post('/books', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        res = await api.post('/books', {
          title: form.title,
          author: form.author,
          price: Number(form.price),
          condition: form.condition,
          category: form.category,
          story: form.story,
          accessible: form.accessible ? ['DyslexiaFont', 'VoiceReader'] : [],
        });
      }
      if (!res.data?.success) throw new Error(res.data?.message || 'Gagal menambah buku');
      setSuccess(true);
      setForm({
        title: '', author: '', price: '', condition: 'Sangat Baik', category: 'Referensi Kuliah', story: '', accessible: false, img: '',
      });
      setImageFile(null);
      setImagePreview(null);
      if (onBookAdded) onBookAdded();
    } catch (err: any) {
      setError(err.message || 'Gagal menambah buku');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Jual Buku</CardTitle>
          <CardDescription>Upload foto, isi detail, dan tulis "Story Behind the Book" agar lebih personal.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Judul</Label>
                <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Contoh: Akuntansi Keuangan Menengah" required />
              </div>
              <div>
                <Label>Penulis</Label>
                <Input value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} placeholder="Nama penulis" required />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>Harga</Label>
                <Input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="30000" required />
              </div>
              <div>
                <Label>Kondisi</Label>
                <Select value={form.condition} onValueChange={v => setForm(f => ({ ...f, condition: v }))}>
                  <SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Baru">Baru</SelectItem>
                    <SelectItem value="Bekas">Bekas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Kategori</Label>
                <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
                  <SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Referensi Kuliah">Referensi Kuliah</SelectItem>
                    <SelectItem value="Sains">Sains</SelectItem>
                    <SelectItem value="Nonfiksi">Nonfiksi</SelectItem>
                    <SelectItem value="Metodologi">Metodologi</SelectItem>
                    <SelectItem value="Fiksi">Fiksi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Foto Buku</Label>
              <div
                className="aspect-[4/3] rounded-xl border border-dashed grid place-content-center text-xs text-muted-foreground cursor-pointer mb-2 bg-muted/30 hover:bg-muted/50"
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="rounded-xl object-cover w-full h-full" />
                ) : (
                  <span>Drag & drop atau klik untuk upload</span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              {imageFile && <div className="mt-2 text-xs text-muted-foreground">{imageFile.name}</div>}
              {uploading && <div className="mt-2 text-xs text-blue-600">Uploading...</div>}
            </div>
            <div>
              <Label>Story Behind the Book</Label>
              <Textarea value={form.story} onChange={e => setForm(f => ({ ...f, story: e.target.value }))} placeholder="Ceritakan kenangan, catatan penting, atau alasanmu melepas buku ini…" required />
              <div className="mt-2 flex items-center gap-2 text-sm">
                <Button type="button" variant="outline" className="gap-2 rounded-xl" onClick={()=>setRecording((v)=>!v)}>{recording ? <MicOff className="w-4 h-4"/> : <Mic className="w-4 h-4"/>}{recording ? "Stop Rekam" : "Rekam Suara"}</Button>
                <span className="text-muted-foreground">(Mock) Rekam hingga 60 detik untuk menambah kedekatan.</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="access" checked={form.accessible} onCheckedChange={v => setForm(f => ({ ...f, accessible: !!v }))} />
                <Label htmlFor="access">Tandai konten aksesibilitas tersedia (teks alternatif, deskripsi suara)</Label>
              </div>
              <Button className="rounded-2xl" type="submit" disabled={loading || uploading}>{loading ? '...' : 'Terbitkan'}</Button>
            </div>
            {error && <div className="text-sm text-destructive mt-2">{error}</div>}
            {success && <div className="text-sm text-green-600 mt-2">Buku berhasil diterbitkan!</div>}
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tips Kurasi</CardTitle>
          <CardDescription>Pastikan halaman lengkap, foto jelas, dan deskripsi jujur.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <ChecklistItem>Gunakan pencahayaan natural saat memotret.</ChecklistItem>
          <ChecklistItem>Tulis kondisi nyata (lipatan, coretan, sobek).</ChecklistItem>
          <ChecklistItem>Tambah ringkasan bab atau highlight.</ChecklistItem>
          <ChecklistItem>Unggah cerita singkat atau audio 30–60 detik.</ChecklistItem>
        </CardContent>
      </Card>
    </div>
  );
}
