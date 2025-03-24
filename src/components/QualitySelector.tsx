
import React from "react";
import { Check, Video, Music } from "lucide-react";
import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-sm text-gray-700">Download format</h3>
          
          <ToggleGroup type="single" value={audioOnly ? "audio" : "video"}>
            <ToggleGroupItem 
              value="video" 
              aria-label="Video format"
              onClick={() => !disabled && onAudioOnlyChange(false)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg",
                !audioOnly ? "bg-brand-500 text-white hover:bg-brand-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              <Video size={16} />
              <span className="text-sm font-medium">Video</span>
            </ToggleGroupItem>
            
            <ToggleGroupItem 
              value="audio" 
              aria-label="Audio format"
              onClick={() => !disabled && onAudioOnlyChange(true)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg",
                audioOnly ? "bg-brand-500 text-white hover:bg-brand-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              <Music size={16} />
              <span className="text-sm font-medium">Audio</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div className="grid grid-cols-3 gap-2.5 pt-1">
          {(audioOnly ? audioQualities : videoQualities).map((quality) => (
            <div
              key={quality.id}
              className={cn(
                "relative flex flex-col items-center justify-center py-3 px-1",
                "rounded-lg border cursor-pointer transition-all duration-200",
                selectedQuality === quality.value
                  ? "border-brand-400 bg-brand-50 text-brand-700 shadow-sm"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              )}
              onClick={() => !disabled && onQualityChange(quality.value)}
            >
              {selectedQuality === quality.value && (
                <div className="absolute top-2 right-2">
                  <div className="h-4 w-4 rounded-full bg-brand-500 flex items-center justify-center">
                    <Check size={10} className="text-white" />
                  </div>
                </div>
              )}
              
              <div className="text-center">
                {quality.icon || (
                  <div className={cn(
                    "h-5 w-5 mx-auto mb-1.5 flex items-center justify-center",
                    selectedQuality === quality.value 
                      ? "text-brand-600" 
                      : "text-gray-400"
                  )}>
                    {audioOnly ? <Music size={16} /> : <Video size={16} />}
                  </div>
                )}
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
