import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timeline } from './Timeline';

export function CommunitySection() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Forum Komunitas</CardTitle>
          <CardDescription>Diskusi, review buku, dan pengumuman event.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1,2,3].map((i)=> (
            <Card key={i} className="border-muted/70">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Bedah Buku: Tips Belajar Akuntansi untuk UTS</CardTitle>
                <CardDescription>oleh @BookKindCampus • 2 jam lalu</CardDescription>
              </CardHeader>
              <CardContent className="text-sm">Share ringkasan, soal latihan, dan rute belajar 1 minggu. Siapa mau jadi pemantik?</CardContent>
              <CardFooter className="flex gap-2">
                <Button size="sm" variant="outline" className="rounded-xl">Ikut</Button>
                <Button size="sm" variant="ghost" className="rounded-xl">Komentar</Button>
                <Button size="sm" variant="ghost" className="rounded-xl">Bagikan</Button>
              </CardFooter>
            </Card>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Agenda Literasi</CardTitle>
          <CardDescription>Workshop & bazar buku kampus.</CardDescription>
        </CardHeader>
        <CardContent>
          <Timeline items={["Workshop Storytelling (Sabtu)", "Bazar Preloved FEB (Minggu)", "Kelas UI/UX Literasi Inklusif (Selasa)"]} />
        </CardContent>
      </Card>
    </div>
  );
}
