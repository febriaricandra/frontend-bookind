import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BookOpen, Star, Accessibility, Recycle, Sparkles, Share2, MessageSquareMore, Volume2 } from 'lucide-react';
import { getImageUrl, currency } from '@/lib/utils';

export function BookCard({ book, onAdd }: any) {
  return (
    <Card className="rounded-2xl overflow-hidden flex flex-col">
      <div className="aspect-[4/3] overflow-hidden bg-muted/20">
        <img src={getImageUrl(book.img)} alt={book.title} className="w-full h-full object-cover" />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-base line-clamp-1">{book.title}</CardTitle>
        <CardDescription className="line-clamp-1">{book.author}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2 text-sm">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{book.condition}</Badge>
          {book.eco && <Badge variant="secondary" className="gap-1"><Recycle className="w-3.5 h-3.5" />Eco</Badge>}
          {book.accessible?.length ? <Badge variant="secondary" className="gap-1"><Accessibility className="w-3.5 h-3.5" />Akses</Badge> : null}
        </div>
        <div className="flex items-center gap-1 text-amber-500">
          <Star className="w-4 h-4 fill-current" />
          <span>{book.rating}</span>
          <span className="text-muted-foreground">• {book.seller}</span>
        </div>
        <div className="font-semibold">{currency(book.price)}</div>
      </CardContent>
      <CardFooter className="mt-auto flex items-center justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="rounded-xl">Detail</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-white border border-border shadow-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-foreground">{book.title} <Badge variant="outline">{book.condition}</Badge></DialogTitle>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="aspect-[4/3] bg-muted rounded-xl grid place-content-center text-muted-foreground">
                <BookOpen className="w-10 h-10" />
              </div>
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground">{book.author}</div>
                <p className="text-sm">Kategori: {book.category}</p>
                <div className="p-3 rounded-xl bg-muted/50">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Story Behind the Book</div>
                  <p className="mt-1 text-sm">{book.story}</p>
                  <div className="mt-2 flex gap-2">
                    <Button size="sm" variant="ghost" className="gap-2 rounded-xl"><Share2 className="w-4 h-4" />Lihat Arsip Cerita</Button>
                    <Button size="sm" variant="ghost" className="gap-2 rounded-xl"><MessageSquareMore className="w-4 h-4" />Ucapan ke Penjual</Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="secondary" className="gap-2 rounded-xl"><Accessibility className="w-4 h-4" />Pilihan Akses</Button>
                  <Button size="sm" variant="outline" className="gap-2 rounded-xl"><Sparkles className="w-4 h-4" />Mirip Ini</Button>
                </div>
                <div className="font-semibold text-lg">{currency(book.price)}</div>
                <div className="flex items-center gap-2">
                  {book.owner?.phoneNumber ? (
                    <a
                      href={`https://wa.me/${book.owner.phoneNumber.replace(/^0/, '62')}?text=Halo,%20saya%20tertarik%20dengan%20buku%20${encodeURIComponent(book.title)}%20oleh%20${encodeURIComponent(book.author)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="rounded-xl bg-green-500 hover:bg-green-600 text-white">Hubungi WA</Button>
                    </a>
                  ) : (
                    <Button className="rounded-xl" disabled>Hubungi WA</Button>
                  )}
                  <Button variant="outline" className="rounded-xl" onClick={() => { if (window?.speechSynthesis) { const t = `${book.title} oleh ${book.author}. ${book.story}`; const u = new SpeechSynthesisUtterance(t); u.lang = 'id-ID'; window.speechSynthesis.speak(u); } }}> <Volume2 className="w-4 h-4 mr-2" />Dengarkan</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        {book.owner?.phoneNumber ? (
          <a
            href={`https://wa.me/${book.owner.phoneNumber.replace(/^0/, '62')}?text=Halo,%20saya%20tertarik%20dengan%20buku%20${encodeURIComponent(book.title)}%20oleh%20${encodeURIComponent(book.author)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="rounded-xl bg-green-500 hover:bg-green-600 text-white">Hubungi WA</Button>
          </a>
        ) : (
          <Button className="rounded-xl" disabled>Hubungi WA</Button>
        )}
      </CardFooter>
    </Card>
  );
}
