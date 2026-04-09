"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, X, ExternalLink, Loader } from "lucide-react";
import { useeditTaskMutation } from "@/hooks/use-task-hook";

interface AttachmentSectionProps {
  taskId: string;
  attachments: string[];
  image: string | null;
}

export default function AttachmentSection({
  taskId,
  attachments,
  image,
}: AttachmentSectionProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editTask = useeditTaskMutation();

  // Combine image + attachments for display
  const allImages = [
    ...(image ? [image] : []),
    ...(attachments || []),
  ].filter((url, i, arr) => arr.indexOf(url) === i); // dedupe

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("attachments", files[i]);
    }

    editTask.mutate(
      { id: taskId, data: formData },
      { onSettled: () => setUploading(false) }
    );

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemove = (url: string) => {
    const formData = new FormData();
    formData.append("removeAttachments", JSON.stringify([url]));
    editTask.mutate({ id: taskId, data: formData });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-700">Attachments</h4>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-primaryBlue hover:text-hoverBlue"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <Loader className="w-3 h-3 animate-spin mr-1" />
            ) : (
              <ImagePlus className="w-3 h-3 mr-1" />
            )}
            Add
          </Button>
        </div>
      </div>

      {allImages.length === 0 ? (
        <p className="text-xs text-gray-400">No attachments</p>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {allImages.map((url, i) => (
            <div key={i} className="relative group">
              <img
                src={url}
                alt={`Attachment ${i + 1}`}
                className="w-full h-20 object-cover rounded-md border"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center gap-1">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 bg-white/80 rounded hover:bg-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-3 h-3 text-gray-800" />
                </a>
                <button
                  className="p-1 bg-white/80 rounded hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(url);
                  }}
                >
                  <X className="w-3 h-3 text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
