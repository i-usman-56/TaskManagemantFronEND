"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useCreateColumnMutation } from "@/hooks/use-board-hook";

const COLOR_OPTIONS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e",
  "#3b82f6", "#8b5cf6", "#ec4899", "#6b7280",
];

export default function AddColumnDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#3b82f6");
  const createColumn = useCreateColumnMutation();

  const handleSubmit = () => {
    if (!title.trim()) return;
    createColumn.mutate(
      { title: title.trim(), color },
      {
        onSuccess: () => {
          setTitle("");
          setColor("#3b82f6");
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="min-w-[300px] w-[300px] h-full min-h-[120px] border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400 hover:text-primaryBlue hover:border-primaryBlue transition-colors">
          <Plus className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">Add Column</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Column</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div>
            <Label htmlFor="column-title">Column Title</Label>
            <Input
              id="column-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. QA Review, Staging..."
              className="mt-1"
            />
          </div>
          <div>
            <Label>Color</Label>
            <div className="flex gap-2 mt-1">
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c}
                  className={`w-7 h-7 rounded-full border-2 transition-all ${
                    color === c
                      ? "border-gray-900 scale-110"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!title.trim() || createColumn.isLoading}
            className="w-full bg-primaryBlue hover:bg-hoverBlue"
          >
            {createColumn.isLoading ? "Creating..." : "Create Column"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
