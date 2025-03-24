
import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

interface TimeRangeSelectorProps {
  duration: number; // in seconds
  onChange: (start: number, end: number) => void;
  disabled?: boolean;
  useTimeRange: boolean;
  onUseTimeRangeChange: (useTimeRange: boolean) => void;
}

const formatTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  
  return [
    h > 0 ? String(h).padStart(2, '0') : null,
    String(m).padStart(h > 0 ? 2 : 1, '0'),
    String(s).padStart(2, '0'),
  ].filter(Boolean).join(':');
};

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  duration,
  onChange,
  disabled = false,
  useTimeRange,
  onUseTimeRangeChange
}) => {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(duration);
  
  // Update end time when duration changes
  useEffect(() => {
    setEndTime(duration);
  }, [duration]);

  const handleStartChange = (value: number[]) => {
    const newStart = value[0];
    setStartTime(newStart);
    onChange(newStart, endTime);
  };

  const handleEndChange = (value: number[]) => {
    const newEnd = value[0];
    setEndTime(newEnd);
    onChange(startTime, newEnd);
  };

  return (
    <div className={cn("space-y-4 animate-slide-up", disabled ? "opacity-60 pointer-events-none" : "")}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-gray-700">
          <Clock size={18} className="text-gray-600" />
          <h3 className="font-medium text-sm">Time range</h3>
        </div>
        
        <div className="flex items-center gap-2">
          <Switch
            checked={useTimeRange}
            onCheckedChange={onUseTimeRangeChange}
            disabled={disabled}
            className={cn(
              useTimeRange ? "bg-brand-500" : "bg-gray-200",
            )}
          />
          <span className="text-sm text-gray-600">
            {useTimeRange ? "On" : "Off"}
          </span>
        </div>
      </div>
      
      {useTimeRange && (
        <div className="pt-1 space-y-5 bg-gray-50 p-4 rounded-lg">
          <div className="space-y-6">
            <div className="flex justify-between text-xs text-gray-500 px-1">
              <span>Start: {formatTime(startTime)}</span>
              <span>End: {formatTime(endTime)}</span>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="text-xs font-medium text-gray-500">Start time: {formatTime(startTime)}</label>
                <Slider
                  value={[startTime]}
                  min={0}
                  max={endTime}
                  step={1}
                  onValueChange={handleStartChange}
                  disabled={disabled || !useTimeRange}
                  className="mt-1"
                />
              </div>
              
              <div className="space-y-4">
                <label className="text-xs font-medium text-gray-500">End time: {formatTime(endTime)}</label>
                <Slider
                  value={[endTime]}
                  min={startTime}
                  max={duration}
                  step={1}
                  onValueChange={handleEndChange}
                  disabled={disabled || !useTimeRange}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeRangeSelector;
