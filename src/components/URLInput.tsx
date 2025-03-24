
import React, { useState } from "react";
import { ArrowRight, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface URLInputProps {
  onURLSubmit: (url: string) => void;
  isProcessing: boolean;
}

const URLInput: React.FC<URLInputProps> = ({ onURLSubmit, isProcessing }) => {
  const [url, setUrl] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic URL validation
    if (!url.trim()) {
      toast.error("Please enter a YouTube URL");
      return;
    }
    
    if (!url.includes("youtube.com/") && !url.includes("youtu.be/")) {
      toast.error("Please enter a valid YouTube URL");
      return;
    }
    
    onURLSubmit(url);
  };

  return (
    <div className="w-full animate-slide-up">
      <form onSubmit={handleSubmit} className="relative">
        <div 
          className={cn(
            "relative transition-all duration-300 overflow-hidden",
            "rounded-2xl shadow-soft group",
            isFocused ? "ring-2 ring-brand-300 shadow-soft-md" : "",
            isProcessing ? "opacity-70 pointer-events-none" : ""
          )}
        >
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-400">
            <LinkIcon size={18} />
          </div>
          
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Paste your YouTube URL here..."
            className={cn(
              "w-full py-4 px-12 bg-white",
              "text-base text-gray-700 placeholder:text-gray-400",
              "transition-all duration-300 outline-none"
            )}
            disabled={isProcessing}
          />
          
          <button
            type="submit"
            disabled={isProcessing || !url.trim()}
            className={cn(
              "absolute right-3 top-1/2 transform -translate-y-1/2",
              "bg-brand-500 text-white rounded-lg py-2 px-3",
              "btn-bounce flex items-center justify-center",
              "transition-all duration-300",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              !url.trim() ? "opacity-70" : "hover:bg-brand-600"
            )}
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
      
      <div className="mt-2 text-sm text-muted-foreground px-1 animate-fade-in">
        <p>Just paste a YouTube URL and select your download options</p>
      </div>
    </div>
  );
};

export default URLInput;
