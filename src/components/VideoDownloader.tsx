
import React, { useState, useEffect } from "react";
import { ExternalLink, Image } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import URLInput from "./URLInput";
import QualitySelector, { Quality } from "./QualitySelector";
import TimeRangeSelector from "./TimeRangeSelector";
import DownloadButton from "./DownloadButton";
import DownloadStatus, { StatusType } from "./DownloadStatus";

const VideoDownloader: React.FC = () => {
  // State for video URL and metadata
  const [url, setUrl] = useState<string>("");
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  
  // State for download options
  const [selectedQuality, setSelectedQuality] = useState<string>("720p");
  const [audioOnly, setAudioOnly] = useState<boolean>(false);
  const [useTimeRange, setUseTimeRange] = useState<boolean>(false);
  const [timeRange, setTimeRange] = useState<{ start: number; end: number }>({ start: 0, end: 0 });
  const [downloadThumbnail, setDownloadThumbnail] = useState<boolean>(false);
  
  // State for download process
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<{ type: StatusType; message: string; details?: string }>({
    type: null,
    message: "",
    details: ""
  });

  // Video qualities
  const videoQualities: Quality[] = [
    { id: "1080p", label: "1080p", value: "1080p", icon: <span className="text-xs text-gray-500">HD</span> },
    { id: "720p", label: "720p", value: "720p", icon: <span className="text-xs text-gray-500">HD</span> },
    { id: "480p", label: "480p", value: "480p" },
    { id: "360p", label: "360p", value: "360p" },
    { id: "240p", label: "240p", value: "240p" },
    { id: "144p", label: "144p", value: "144p" },
  ];

  // Audio qualities
  const audioQualities: Quality[] = [
    { id: "320kbps", label: "320 kbps", value: "320kbps", audioOnly: true },
    { id: "256kbps", label: "256 kbps", value: "256kbps", audioOnly: true },
    { id: "192kbps", label: "192 kbps", value: "192kbps", audioOnly: true },
    { id: "128kbps", label: "128 kbps", value: "128kbps", audioOnly: true },
    { id: "96kbps", label: "96 kbps", value: "96kbps", audioOnly: true },
    { id: "64kbps", label: "64 kbps", value: "64kbps", audioOnly: true },
  ];
  
  const allQualities = [...videoQualities, ...audioQualities];

  // Reset state when switching between audio and video
  useEffect(() => {
    if (audioOnly) {
      setSelectedQuality("320kbps");
    } else {
      setSelectedQuality("720p");
    }
  }, [audioOnly]);

  // Handle URL submission
  const handleURLSubmit = (newUrl: string) => {
    setUrl(newUrl);
    setIsProcessing(true);
    
    // Simulate fetching video metadata
    setTimeout(() => {
      // This is a simulation - in a real app, you'd fetch actual metadata from the URL
      setVideoTitle("Sample YouTube Video - Amazing Content");
      setVideoDuration(360); // 6 minutes
      setThumbnailUrl("https://via.placeholder.com/480x360");
      setTimeRange({ start: 0, end: 360 });
      setIsProcessing(false);
      
      toast.success("Video details retrieved successfully");
    }, 1500);
  };

  // Handle time range change
  const handleTimeRangeChange = (start: number, end: number) => {
    setTimeRange({ start, end });
  };

  // Handle download button click
  const handleDownload = () => {
    setIsProcessing(true);
    setDownloadProgress(0);
    setStatusMessage({ type: null, message: "", details: "" });
    
    // Simulate download process
    const downloadTimer = setInterval(() => {
      setDownloadProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        
        if (newProgress >= 100) {
          clearInterval(downloadTimer);
          
          setTimeout(() => {
            setIsProcessing(false);
            setStatusMessage({
              type: "success",
              message: "Download completed successfully!",
              details: `Your file has been saved to your downloads folder.`
            });
          }, 500);
          
          return 100;
        }
        
        return newProgress;
      });
    }, 500);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 bg-brand-50 text-brand-600 px-3 py-1 rounded-full text-sm font-medium mb-2 animate-fade-in">
          <span className="animate-pulse-gentle">●</span>
          <span>YouTube Downloader</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-3 animate-slide-down">
          Download YouTube Videos Easily
        </h1>
        <p className="text-gray-600 max-w-lg mx-auto animate-slide-down">
          Enter a YouTube URL, select your preferred quality, and download videos in just a few clicks.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-soft-lg p-6 animate-scale-in">
        <URLInput onURLSubmit={handleURLSubmit} isProcessing={isProcessing} />
        
        {url && (
          <div className="mt-6 space-y-6">
            {/* Video preview */}
            <div className="animate-slide-up">
              <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-video">
                {thumbnailUrl ? (
                  <img 
                    src={thumbnailUrl} 
                    alt={videoTitle} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-400">Video thumbnail</p>
                  </div>
                )}
                
                {videoTitle && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-3 text-white">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-sm line-clamp-2">{videoTitle}</h3>
                      
                      <a 
                        href={url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-shrink-0 ml-2 text-gray-300 hover:text-white transition-colors"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <Separator className="my-6" />
            
            {/* Quality options */}
            <QualitySelector
              qualities={allQualities}
              selectedQuality={selectedQuality}
              onQualityChange={setSelectedQuality}
              audioOnly={audioOnly}
              onAudioOnlyChange={setAudioOnly}
              disabled={isProcessing}
            />
            
            {videoDuration > 0 && (
              <TimeRangeSelector
                duration={videoDuration}
                onChange={handleTimeRangeChange}
                disabled={isProcessing}
                useTimeRange={useTimeRange}
                onUseTimeRangeChange={setUseTimeRange}
              />
            )}
            
            {/* Thumbnail download option */}
            <div className={cn("animate-slide-up", isProcessing ? "opacity-60 pointer-events-none" : "")}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Image size={18} className="text-gray-600" />
                  <h3 className="font-medium text-sm text-gray-700">Download thumbnail</h3>
                </div>
                
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={downloadThumbnail}
                    onChange={() => setDownloadThumbnail(!downloadThumbnail)}
                    disabled={isProcessing}
                  />
                  <div className={cn(
                    "relative w-10 h-5 transition-colors duration-200 ease-in-out rounded-full",
                    downloadThumbnail ? "bg-brand-500" : "bg-gray-200",
                  )}>
                    <div className={cn(
                      "absolute w-3.5 h-3.5 transition-transform duration-200 ease-in-out bg-white rounded-full left-0.75 top-0.75",
                      downloadThumbnail && "transform translate-x-5"
                    )}></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {downloadThumbnail ? "Yes" : "No"}
                  </span>
                </label>
              </div>
              
              {downloadThumbnail && (
                <p className="text-xs text-gray-500 mt-1 ml-7">
                  The video thumbnail will be saved along with your download
                </p>
              )}
            </div>
            
            <Separator className="my-6" />
            
            {/* Status message */}
            {statusMessage.type && (
              <div className="mb-6">
                <DownloadStatus
                  status={statusMessage.type}
                  message={statusMessage.message}
                  details={statusMessage.details}
                />
              </div>
            )}
            
            {/* Download button */}
            <DownloadButton
              onClick={handleDownload}
              isProcessing={isProcessing}
              isDisabled={!url}
              progress={downloadProgress}
            />
          </div>
        )}
      </div>
      
      <div className="mt-6 text-center text-xs text-gray-500 animate-fade-in">
        <p>For personal use only. Please respect copyright laws and YouTube's terms of service.</p>
      </div>
    </div>
  );
};

export default VideoDownloader;
