
import React from "react";
import { Download, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DownloadButtonProps {
  onClick: () => void;
  isProcessing: boolean;
  isDisabled: boolean;
  progress?: number;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  onClick,
  isProcessing,
  isDisabled,
  progress = 0
}) => {
  return (
    <div className="w-full animate-slide-up">
      <button
        onClick={onClick}
        disabled={isDisabled || isProcessing}
        className={cn(
          "w-full py-4 px-6 rounded-xl font-medium",
          "transition-all duration-300 transform",
          "flex items-center justify-center space-x-2",
          "shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500",
          "btn-bounce",
          isDisabled || isProcessing ? 
            "bg-gray-300 text-gray-500 cursor-not-allowed" : 
            "bg-brand-500 text-white hover:bg-brand-600"
        )}
      >
        {isProcessing ? (
          <>
            <Loader2 size={20} className="animate-spin-slow mr-2" />
            <span>
              {progress > 0 
                ? `Downloading... ${Math.round(progress)}%` 
                : "Processing..."}
            </span>
          </>
        ) : (
          <>
            <Download size={20} />
            <span>Download Now</span>
          </>
        )}
      </button>
      
      {!isDisabled && !isProcessing && (
        <p className="text-center text-sm text-gray-500 mt-3 animate-fade-in">
          Click to start your download
        </p>
      )}
    </div>
  );
};

export default DownloadButton;
