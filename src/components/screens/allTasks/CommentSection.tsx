"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash2, Send, Loader } from "lucide-react";
import {
  useCommentsQuery,
  useAddCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
} from "@/hooks/use-comment-hook";

interface CommentSectionProps {
  taskId: string;
  currentUserId: string;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function CommentSection({
  taskId,
  currentUserId,
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const { data, isLoading } = useCommentsQuery(taskId);
  const addComment = useAddCommentMutation();
  const editComment = useEditCommentMutation();
  const deleteComment = useDeleteCommentMutation();

  const comments = data?.comments || [];

  const handleAdd = () => {
    if (!newComment.trim()) return;
    addComment.mutate(
      { taskId, content: newComment.trim() },
      { onSuccess: () => setNewComment("") }
    );
  };

  const handleEdit = (commentId: string) => {
    if (!editContent.trim()) return;
    editComment.mutate(
      { commentId, content: editContent.trim(), taskId },
      {
        onSuccess: () => {
          setEditingId(null);
          setEditContent("");
        },
      }
    );
  };

  const handleDelete = (commentId: string) => {
    deleteComment.mutate({ commentId, taskId });
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      action();
    }
  };

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-gray-700">
        Comments {comments.length > 0 && `(${comments.length})`}
      </h4>

      {/* Comments list */}
      <div className="space-y-3 max-h-[300px] overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <Loader className="w-4 h-4 animate-spin text-gray-400" />
          </div>
        ) : comments.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-4">
            No comments yet. Start the conversation!
          </p>
        ) : (
          comments.map((comment) => {
            const user = comment.commentedBy;
            const isOwn = user?._id === currentUserId;
            const initials = `${user?.firstName?.[0] || ""}${
              user?.lastName?.[0] || ""
            }`.toUpperCase();

            return (
              <div key={comment._id} className="flex gap-2">
                <Avatar className="w-7 h-7 mt-0.5 shrink-0">
                  <AvatarImage src={user?.profilePic || undefined} />
                  <AvatarFallback className="bg-primaryBlue text-white text-[10px]">
                    {initials || "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-800">
                      {user?.firstName} {user?.lastName}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {timeAgo(comment.createdAt)}
                    </span>
                    {comment.isEdited && (
                      <span className="text-[10px] text-gray-400 italic">
                        (edited)
                      </span>
                    )}
                  </div>

                  {editingId === comment._id ? (
                    <div className="mt-1">
                      <Textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        onKeyDown={(e) =>
                          handleKeyDown(e, () => handleEdit(comment._id))
                        }
                        className="text-xs min-h-[60px] resize-none"
                        autoFocus
                      />
                      <div className="flex gap-1 mt-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 text-xs"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          className="h-6 text-xs bg-primaryBlue hover:bg-hoverBlue"
                          onClick={() => handleEdit(comment._id)}
                          disabled={editComment.isLoading}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-600 mt-0.5 whitespace-pre-wrap break-words">
                      {comment.content}
                    </p>
                  )}

                  {isOwn && editingId !== comment._id && (
                    <div className="flex gap-1 mt-1">
                      <button
                        className="text-gray-400 hover:text-primaryBlue"
                        onClick={() => {
                          setEditingId(comment._id);
                          setEditContent(comment.content);
                        }}
                      >
                        <Edit className="w-3 h-3" />
                      </button>
                      <button
                        className="text-gray-400 hover:text-red-500"
                        onClick={() => handleDelete(comment._id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add comment input */}
      <div className="flex gap-2 items-end border-t pt-3">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, handleAdd)}
          placeholder="Write a comment..."
          className="text-xs min-h-[40px] max-h-[100px] resize-none flex-1"
        />
        <Button
          size="sm"
          className="h-9 px-3 bg-primaryBlue hover:bg-hoverBlue shrink-0"
          onClick={handleAdd}
          disabled={!newComment.trim() || addComment.isLoading}
        >
          {addComment.isLoading ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
