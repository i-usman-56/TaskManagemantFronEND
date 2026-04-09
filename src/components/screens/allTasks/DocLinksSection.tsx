"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Plus, X } from "lucide-react";
import { useeditTaskMutation } from "@/hooks/use-task-hook";
import { DocLink } from "@/lib/task/task";

interface DocLinksSectionProps {
  taskId: string;
  docLinks: DocLink[];
}

export default function DocLinksSection({
  taskId,
  docLinks,
}: DocLinksSectionProps) {
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const editTask = useeditTaskMutation();

  const handleAdd = () => {
    if (!title.trim() || !url.trim()) return;
    const updated = [...(docLinks || []), { title: title.trim(), url: url.trim() }];
    const formData = new FormData();
    formData.append("docLinks", JSON.stringify(updated));
    editTask.mutate(
      { id: taskId, data: formData },
      {
        onSuccess: () => {
          setTitle("");
          setUrl("");
          setAdding(false);
        },
      }
    );
  };

  const handleRemove = (index: number) => {
    const updated = docLinks.filter((_, i) => i !== index);
    const formData = new FormData();
    formData.append("docLinks", JSON.stringify(updated));
    editTask.mutate({ id: taskId, data: formData });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-700">Doc Links</h4>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs text-primaryBlue hover:text-hoverBlue"
          onClick={() => setAdding(!adding)}
        >
          <Plus className="w-3 h-3 mr-1" />
          Add
        </Button>
      </div>

      {adding && (
        <div className="space-y-2 p-2 bg-gray-50 rounded-md">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Link title"
            className="text-xs h-8"
          />
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
            className="text-xs h-8"
          />
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              className="h-6 text-xs"
              onClick={() => {
                setAdding(false);
                setTitle("");
                setUrl("");
              }}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="h-6 text-xs bg-primaryBlue hover:bg-hoverBlue"
              onClick={handleAdd}
              disabled={!title.trim() || !url.trim()}
            >
              Save
            </Button>
          </div>
        </div>
      )}

      {(!docLinks || docLinks.length === 0) && !adding ? (
        <p className="text-xs text-gray-400">No doc links</p>
      ) : (
        <div className="space-y-1">
          {(docLinks || []).map((link, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-2 py-1.5 bg-gray-50 rounded-md group"
            >
              <ExternalLink className="w-3 h-3 text-primaryBlue shrink-0" />
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primaryBlue hover:underline truncate flex-1"
              >
                {link.title}
              </a>
              <button
                className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
                onClick={() => handleRemove(i)}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
