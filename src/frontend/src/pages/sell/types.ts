import type { ExternalBlob } from "@/backend";

export interface SellFormData {
  title: string;
  category: string;
  condition: string;
  price: string;
  description: string;
  location: string;
  phone: string;
  email: string;
}

export interface SellFormErrors {
  title?: string;
  category?: string;
  condition?: string;
  price?: string;
  description?: string;
  location?: string;
  phone?: string;
  email?: string;
}

export interface UploadedImage {
  id: string;
  file: File;
  previewUrl: string;
  blob: ExternalBlob | null;
  progress: number;
  uploading: boolean;
  error: string | null;
}

export const SELL_STEPS = [
  "Item Details",
  "Location & Contact",
  "Images",
  "Review & Post",
] as const;

export const INITIAL_FORM_DATA: SellFormData = {
  title: "",
  category: "",
  condition: "",
  price: "",
  description: "",
  location: "",
  phone: "",
  email: "",
};
