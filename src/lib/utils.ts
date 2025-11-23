import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function currency(n: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function getImageUrl(img: string) {
  if (!img) return "";
  if (/^https?:\/\//.test(img)) return img;
  return `http://localhost:3001/${img.replace(/^\/+/, "")}`;
}
