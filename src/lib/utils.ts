import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


const url = process.env.NEXT_PUBLIC_FILE_URL;
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
  return `${url}/${img.replace(/^\/+/, "")}`;
}
