"use client";

import { ChangeEvent, useState } from "react";

export function ImageCompressor() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [info, setInfo] = useState("");
  const [error, setError] = useState("");

  const compressImage = async () => {
    if (!imageFile) {
      setError("Please choose an image file first.");
      return;
    }

    setError("");
    const sourceUrl = URL.createObjectURL(imageFile);
    const image = new Image();
    image.src = sourceUrl;

    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Failed to load image"));
    });

    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setError("Canvas is unavailable in this browser.");
      URL.revokeObjectURL(sourceUrl);
      return;
    }

    ctx.drawImage(image, 0, 0);
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((result) => resolve(result), "image/jpeg", quality);
    });
    URL.revokeObjectURL(sourceUrl);

    if (!blob) {
      setError("Could not compress this image.");
      return;
    }

    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
    }
    const outputUrl = URL.createObjectURL(blob);
    setDownloadUrl(outputUrl);

    const before = (imageFile.size / 1024).toFixed(1);
    const after = (blob.size / 1024).toFixed(1);
    const saved = (((imageFile.size - blob.size) / imageFile.size) * 100).toFixed(1);
    setInfo(`Original: ${before} KB | Compressed: ${after} KB | Saved: ${saved}%`);
  };

  return (
    <>
      <div className="field">
        <label htmlFor="imageInput">Image file</label>
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setImageFile(e.target.files?.[0] ?? null)}
        />
      </div>
      <div className="field">
        <label htmlFor="imageQuality">Quality: {quality.toFixed(2)}</label>
        <input
          id="imageQuality"
          type="range"
          min={0.1}
          max={1}
          step={0.05}
          value={quality}
          onChange={(e) => setQuality(Number.parseFloat(e.target.value))}
        />
      </div>
      <button onClick={compressImage}>Compress Image</button>
      {info ? <p className="muted">{info}</p> : null}
      {error ? <p className="error">{error}</p> : null}
      <a className="download" href={downloadUrl} download="compressed.jpg" aria-disabled={!downloadUrl}>
        Download compressed image
      </a>
    </>
  );
}
