import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BadgeCheck, MapPin, Truck, CheckCircle2 } from 'lucide-react';

export function TrackingCard() {
  const steps = [
    { icon: <BadgeCheck className="w-4 h-4"/>, title: "Pesanan Dibuat", time: "10:20" },
    { icon: <MapPin className="w-4 h-4"/>, title: "Diambil Kurir", time: "12:15" },
    { icon: <Truck className="w-4 h-4"/>, title: "Dalam Perjalanan", time: "18:40" },
    { icon: <CheckCircle2 className="w-4 h-4"/>, title: "Tiba di Tujuan", time: "Besok" },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Pelacakan Pengiriman</CardTitle>
        <CardDescription>#A123 • Mitra: GoGreen Logistics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {steps.map((s, i)=> (
          <div key={i} className="flex items-center gap-3">
            <div className="text-emerald-600">{s.icon}</div>
            <div>
              <div className="font-medium">{s.title}</div>
              <div className="text-xs text-muted-foreground">{s.time}</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
