import { ExternalBlob } from "@/backend";
import { useCallback, useRef, useState } from "react";
import type { UploadedImage } from "./types";

interface Props {
  images: UploadedImage[];
  onImagesChange: (
    images: UploadedImage[] | ((prev: UploadedImage[]) => UploadedImage[]),
  ) => void;
}

export function Step3Images({ images, onImagesChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const MAX_IMAGES = 5;
  const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

  const uploadFile = useCallback(
    async (file: File, id: string) => {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        onImagesChange(
          images.map((img) =>
            img.id === id ? { ...img, progress: pct } : img,
          ),
        );
      });
      return blob;
    },
    [images, onImagesChange],
  );

  const addFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArr = Array.from(files).filter((f) =>
        ACCEPTED.includes(f.type),
      );
      const remaining = MAX_IMAGES - images.length;
      const toAdd = fileArr.slice(0, remaining);

      const newImages: UploadedImage[] = toAdd.map((file) => ({
        id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
        file,
        previewUrl: URL.createObjectURL(file),
        blob: null,
        progress: 0,
        uploading: true,
        error: null,
      }));

      const next = [...images, ...newImages];
      onImagesChange(next);

      for (const img of newImages) {
        try {
          const blob = await uploadFile(img.file, img.id);
          onImagesChange((prev: UploadedImage[]) =>
            prev.map((i) =>
              i.id === img.id
                ? { ...i, blob, uploading: false, progress: 100 }
                : i,
            ),
          );
        } catch {
          onImagesChange((prev: UploadedImage[]) =>
            prev.map((i) =>
              i.id === img.id
                ? { ...i, uploading: false, error: "Upload failed" }
                : i,
            ),
          );
        }
      }
    },
    [images, onImagesChange, uploadFile],
  );

  const removeImage = (id: string) => {
    onImagesChange(images.filter((img) => img.id !== id));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  };

  const handleCardDragStart = (idx: number) => setDragIdx(idx);
  const handleCardDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    setDragOverIdx(idx);
  };
  const handleCardDrop = (e: React.DragEvent, dropIdx: number) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === dropIdx) {
      setDragIdx(null);
      setDragOverIdx(null);
      return;
    }
    const next = [...images];
    const [moved] = next.splice(dragIdx, 1);
    next.splice(dropIdx, 0, moved);
    onImagesChange(next);
    setDragIdx(null);
    setDragOverIdx(null);
  };

  return (
    <div className="flex flex-col gap-5">
      {images.length < MAX_IMAGES && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          className={[
            "w-full rounded-xl border-2 border-dashed flex flex-col items-center justify-center py-10 gap-3 transition-colors cursor-pointer",
            isDragOver
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/30",
          ].join(" ")}
          data-ocid="sell.image_dropzone"
        >
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <svg
              className="w-6 h-6 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              Drag photos here or click to upload
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              JPG, PNG or WebP · Up to {MAX_IMAGES - images.length} more · Max 5
              total
            </p>
          </div>
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={(e) => e.target.files && addFiles(e.target.files)}
        data-ocid="sell.image_upload_button"
      />

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((img, idx) => (
            <div
              key={img.id}
              draggable
              onDragStart={() => handleCardDragStart(idx)}
              onDragOver={(e) => handleCardDragOver(e, idx)}
              onDrop={(e) => handleCardDrop(e, idx)}
              onDragEnd={() => {
                setDragIdx(null);
                setDragOverIdx(null);
              }}
              className={[
                "relative rounded-lg overflow-hidden border aspect-square cursor-grab active:cursor-grabbing transition-all",
                dragOverIdx === idx && dragIdx !== idx
                  ? "border-primary ring-2 ring-primary/40 scale-105"
                  : "border-border",
                dragIdx === idx ? "opacity-50" : "",
              ].join(" ")}
              data-ocid={`sell.image_card.${idx + 1}`}
            >
              <img
                src={img.previewUrl}
                alt={`Upload ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              {idx === 0 && (
                <span className="absolute top-1 left-1 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded font-medium">
                  Primary
                </span>
              )}
              {img.uploading && (
                <div className="absolute inset-0 bg-background/70 flex flex-col items-center justify-center gap-2">
                  <div className="w-3/4 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all duration-200"
                      style={{ width: `${img.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {img.progress}%
                  </span>
                </div>
              )}
              {img.error && (
                <div className="absolute inset-0 bg-destructive/80 flex items-center justify-center">
                  <span className="text-xs text-destructive-foreground font-medium px-2 text-center">
                    {img.error}
                  </span>
                </div>
              )}
              <button
                type="button"
                onClick={() => removeImage(img.id)}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-background/90 text-foreground flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
                aria-label="Remove image"
                data-ocid={`sell.image_remove_button.${idx + 1}`}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="absolute bottom-1 right-1 opacity-60">
                <svg
                  className="w-4 h-4 text-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <p className="text-xs text-muted-foreground text-center">
          No images added yet. Add at least one to attract buyers.
        </p>
      )}
    </div>
  );
}
