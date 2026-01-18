"use client";

import { uploadImageAction } from "@/actions/upload/uplooad-image-action";
import { IMAGE_UPLOAD_MAX_SIZE } from "@/lib/constants";
import { ImageUp } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { Button } from "../Button";

export function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isPending, startTransition] = useTransition();
  const [imgUrl, setImgUrl] = useState<string>("");

  function handleChooseFile() {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  }

  function handleChange() {
    toast.dismiss();

    if (!fileInputRef.current) {
      setImgUrl("");
      return;
    }

    const file = fileInputRef.current.files?.[0];
    const fileInput = fileInputRef.current;

    if (!file || !fileInput) {
      setImgUrl("");
      return;
    }

    if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
      const readableMaxSize = IMAGE_UPLOAD_MAX_SIZE / 1024;
      toast.error(`Imagem muito grande. Max: ${readableMaxSize}KB`);

      fileInput.value = "";
      setImgUrl("");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    startTransition(async () => {
      const result = await uploadImageAction(formData);
      if (result.error) {
        toast.error(result.error);
        setImgUrl("");
        fileInput.value = "";
        return;
      }

      toast.success("Imagem enviada com sucesso!");
      setImgUrl(result.url);
    });

    fileInput.value = "";
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      <Button
        disabled={isPending}
        onClick={handleChooseFile}
        type="button"
        className="self-start"
      >
        <ImageUp />
        Enviar uma Imagem
      </Button>

      {!!imgUrl && (
        <div className="flex flex-col gap-4">
          <p>
            <b>URL:</b> {imgUrl}
          </p>
          {/** biome-ignore lint/performance/noImgElement: false positive*/}
          <img className="rounded-lg" src={imgUrl} alt="" />
        </div>
      )}
      <input
        onChange={handleChange}
        ref={fileInputRef}
        className="hidden"
        type="file"
        name="file"
        accept="image/*"
      />
    </div>
  );
}
