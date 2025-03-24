
import React from "react";
import { Check, Video, Music } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Quality {
  id: string;
  label: string;
  value: string;
  icon?: React.ReactNode;
  audioOnly?: boolean;
}

interface QualitySelectorProps {
  qualities: Quality[];
  selectedQuality: string;
  onQualityChange: (quality: string) => void;
  audioOnly: boolean;
  onAudioOnlyChange: (audioOnly: boolean) => void;
  disabled?: boolean;
}

const QualitySelector: React.FC<QualitySelectorProps> = ({
  qualities,
  selectedQuality,
  onQualityChange,
  audioOnly,
  onAudioOnlyChange,
  disabled = false
}) => {
  const videoQualities = qualities.filter(q => !q.audioOnly);
  const audioQualities = qualities.filter(q => q.audioOnly);

  return (
    <div className={cn("space-y-4 animate-slide-up", disabled ? "opacity-60 pointer-events-none" : "")}>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-sm text-gray-700">Download format</h3>
          
          <div className="flex items-center gap-3">
            <div 
              className={cn(
                "flex items-center space-x-2 px-3 py-1.5 rounded-lg cursor-pointer",
                "transition-colors duration-200",
                !audioOnly ? "bg-brand-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
              onClick={() => !disabled && onAudioOnlyChange(false)}
            >
              <Video size={16} />
              <span className="text-sm font-medium">Video</span>
            </div>
            
            <div 
              className={cn(
                "flex items-center space-x-2 px-3 py-1.5 rounded-lg cursor-pointer",
                "transition-colors duration-200",
                audioOnly ? "bg-brand-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
              onClick={() => !disabled && onAudioOnlyChange(true)}
            >
              <Music size={16} />
              <span className="text-sm font-medium">Audio</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 pt-1">
          {(audioOnly ? audioQualities : videoQualities).map((quality) => (
            <div
              key={quality.id}
              className={cn(
                "flex items-center justify-center py-2.5 px-1",
                "rounded-lg border border-gray-200 cursor-pointer",
                "transition-all duration-200",
                selectedQuality === quality.value
                  ? "border-brand-400 bg-brand-50 text-brand-700 shadow-sm"
                  : "hover:border-gray-300 hover:bg-gray-50"
              )}
              onClick={() => !disabled && onQualityChange(quality.value)}
            >
              <div className="text-center">
                <div className="flex justify-center mb-1">
                  {selectedQuality === quality.value ? (
                    <div className="h-5 w-5 rounded-full bg-brand-500 flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </div>
                  ) : (
                    quality.icon || (
                      <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>
                    )
                  )}
                </div>
                <span className={cn(
                  "text-sm font-medium",
                  selectedQuality === quality.value ? "text-brand-700" : "text-gray-700"
                )}>
                  {quality.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QualitySelector;
