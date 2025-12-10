"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Cropper from "react-easy-crop";
import { X } from "lucide-react";
import Button from "../ui/button/Button";

type ImageUploaderProps = {
  folder: string;
  label: string;
  onUpload: (url: string | null, publicId?: string | null) => void;
  defaultPreview?: string | null;
};

const createImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (err) => reject(err));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getCroppedImg = async (imageSrc: string, crop: any) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/jpeg");
  });
};

export default function ImageUploader({
  folder,
  label,
  onUpload,
  defaultPreview = null,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [cropMode, setCropMode] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [width, setWidth] = useState<number>(300);
  const [height, setHeight] = useState<number>(300);

  useEffect(() => {
    if (defaultPreview) setPreview(defaultPreview);
  }, [defaultPreview]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onCropComplete = useCallback((_a: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleFile = async (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setCropMode(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropUpload = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    setLoading(true);
    const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
    if (!croppedBlob) return;

    const formData = new FormData();
    formData.append("file", croppedBlob, "cropped.jpg");
    formData.append("folder", `${folder}/${label}`);
    formData.append("width", width.toString());
    formData.append("height", height.toString());

    try {
      const res = await fetch("/api/auth/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (data.secure_url) {
        setPreview(data.secure_url);
        onUpload(data.secure_url, data.public_id || null);
        setCropMode(false);
        setImageSrc(null);
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("❌ Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    onUpload(null);
  };

  return (
    <div className="relative flex flex-col gap-5 items-center w-full">
      {/* 🖼️ Always-visible Preview Section */}
      <div className="w-full flex justify-center">
        {preview ? (
          <div className="relative w-full md:w-[60%] h-56 border rounded-lg overflow-hidden shadow-sm">
            <Image
              src={preview}
              alt={`${label} preview`}
              fill
              className="object-cover"
            />
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-white/90 p-1 rounded-full shadow hover:bg-red-100 transition"
              title="Remove image"
            >
              <X className="w-4 h-4 cursor-pointer text-red-600" />
            </button>
          </div>
        ) : (
          <div className="w-full md:w-[100%] h-56 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-gray-400 text-sm">
            No image uploaded yet
          </div>
        )}
      </div>

      {/* ✂️ Cropping Mode */}
      {cropMode && imageSrc && (
        <div className="relative w-full h-80 bg-black/80 rounded-lg overflow-hidden">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={width / height}
            cropShape="rect"
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />

          <div className="absolute bottom-3 left-0 right-0 flex flex-col gap-2 items-center bg-white/80 p-3">
            <div className="flex gap-4">
              <label className="text-sm">
                Width:
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="ml-2 w-20 border rounded px-2 py-1"
                />
              </label>
              <label className="text-sm">
                Height:
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="ml-2 w-20 border rounded px-2 py-1"
                />
              </label>
              <label className="text-sm">
                Zoom:
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="ml-2"
                />
              </label>
            </div>

            <div className="flex gap-3 mt-2">
              <Button variant="outline" onClick={() => setCropMode(false)}>
                Cancel
              </Button>
              <Button onClick={handleCropUpload}>
                {loading ? "Uploading..." : "Crop & Upload"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 📁 Separate Upload Area */}
      {!cropMode && (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-400 p-4 rounded-lg text-center cursor-pointer hover:border-blue-500 transition w-full"
        >
          <p className="text-gray-600 text-sm sm:text-base">
            {loading ? "Uploading..." : `Click or drop to upload ${label}`}
          </p>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) handleFile(e.target.files[0]);
        }}
      />
    </div>
  );
}

