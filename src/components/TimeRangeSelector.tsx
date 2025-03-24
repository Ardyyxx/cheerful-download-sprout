
import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

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

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = parseInt(e.target.value);
    setStartTime(newStart);
    onChange(newStart, endTime);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEnd = parseInt(e.target.value);
    setEndTime(newEnd);
    onChange(startTime, newEnd);
  };

  return (
    <div className={cn("space-y-3 animate-slide-up", disabled ? "opacity-60 pointer-events-none" : "")}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock size={18} className="text-gray-600" />
          <h3 className="font-medium text-sm text-gray-700">Time range</h3>
        </div>
        
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={useTimeRange}
            onChange={() => onUseTimeRangeChange(!useTimeRange)}
            disabled={disabled}
          />
          <div className={cn(
            "relative w-10 h-5 transition-colors duration-200 ease-in-out rounded-full",
            useTimeRange ? "bg-brand-500" : "bg-gray-200",
          )}>
            <div className={cn(
              "absolute w-3.5 h-3.5 transition-transform duration-200 ease-in-out bg-white rounded-full left-0.75 top-0.75",
              useTimeRange && "transform translate-x-5"
            )}></div>
          </div>
          <span className="ml-2 text-sm text-gray-600">
            {useTimeRange ? "On" : "Off"}
          </span>
        </label>
      </div>
      
      {useTimeRange && (
        <div className="pt-1 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-500 px-1">
              <span>Start: {formatTime(startTime)}</span>
              <span>End: {formatTime(endTime)}</span>
            </div>
            
            <div className="relative h-7">
              <input
                type="range"
                min={0}
                max={duration}
                value={startTime}
                onChange={handleStartChange}
                className="absolute w-full top-1/2 transform -translate-y-1/2"
                disabled={disabled || !useTimeRange}
              />
              <input
                type="range"
                min={0}
                max={duration}
                value={endTime}
                onChange={handleEndChange}
                className="absolute w-full top-1/2 transform -translate-y-1/2"
                disabled={disabled || !useTimeRange}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-gray-500">Start time</label>
              <input
                type="text"
                value={formatTime(startTime)}
                className="w-full py-1.5 px-3 border border-gray-200 rounded-lg text-sm"
                disabled={disabled || !useTimeRange}
                readOnly
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs text-gray-500">End time</label>
              <input
                type="text"
                value={formatTime(endTime)}
                className="w-full py-1.5 px-3 border border-gray-200 rounded-lg text-sm"
                disabled={disabled || !useTimeRange}
                readOnly
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeRangeSelector;
