import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Accessibility, Volume2, VolumeX } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function FloatingAccessibilityButton({ fontScale, setFontScale, useDyslexia, setUseDyslexia, voiceOn, readText }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          size="lg"
          className="fixed bottom-20 md:bottom-6 right-6 z-50 rounded-full w-14 h-14 border hover:shadow-xl transition-all duration-200 bg-white hover:scale-105"
          aria-label="Pengaturan Aksesibilitas"
        >
          <Accessibility className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-white border border-border shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Accessibility className="w-5 h-5" />
            Pengaturan Aksesibilitas
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 p-2">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground mb-1">Ukuran Tulisan</Label>
            <div className="flex items-center gap-3">
              <Slider 
                value={[fontScale]} 
                min={0.85} 
                max={1.35} 
                step={0.05} 
                onValueChange={(v) => setFontScale(v[0])} 
                className="flex-1 [&_.slider-thumb]:bg-blue-600 [&_.slider-track]:bg-blue-200"
              />
              <span className="text-sm text-muted-foreground w-20 text-right">{(fontScale * 100).toFixed(0)}%</span>
            </div>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-muted">
            <div>
              <Label htmlFor="dys-float" className="text-sm font-medium text-foreground">Font Ramah Disleksia</Label>
              <p className="text-xs text-muted-foreground mt-1">Menggunakan OpenDyslexic untuk kemudahan membaca</p>
            </div>
            <Switch checked={useDyslexia} onCheckedChange={setUseDyslexia} id="dys-float" className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-muted" />
          </div>
          <div className="space-y-2 pt-2">
            <Label className="text-sm font-medium text-foreground mb-1">Pembaca Suara</Label>
            <Button 
              variant={voiceOn ? "destructive" : "secondary"} 
              className="w-full gap-2" 
              onClick={() => readText("Selamat datang di BookKind. Aktifkan pembaca suara untuk menikmati deskripsi buku.")}
            >
              {voiceOn ? <VolumeX className="w-4 h-4"/> : <Volume2 className="w-4 h-4"/>} 
              {voiceOn ? "Hentikan Pembacaan" : "Uji Pembaca Suara"}
            </Button>
            <p className="text-xs text-muted-foreground">
              Klik tombol "Dengarkan" pada deskripsi buku untuk mengaktifkan
            </p>
          </div>
          <div className="pt-4 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              Preferensi disimpan lokal dan akan diingat saat kunjungan berikutnya
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
