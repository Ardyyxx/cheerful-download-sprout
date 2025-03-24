
import React from "react";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type StatusType = "success" | "error" | "warning" | null;

interface DownloadStatusProps {
  status: StatusType;
  message: string;
  details?: string;
}

const DownloadStatus: React.FC<DownloadStatusProps> = ({
  status,
  message,
  details
}) => {
  if (!status) return null;

  const statusConfig = {
    success: {
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      bgColor: "bg-soft-green",
      borderColor: "border-green-200",
      textColor: "text-green-800"
    },
    error: {
      icon: <XCircle className="h-6 w-6 text-red-500" />,
      bgColor: "bg-soft-red",
      borderColor: "border-red-200",
      textColor: "text-red-800"
    },
    warning: {
      icon: <AlertTriangle className="h-6 w-6 text-amber-500" />,
      bgColor: "bg-soft-yellow",
      borderColor: "border-amber-200",
      textColor: "text-amber-800"
    }
  };

  const config = statusConfig[status];

  return (
    <div className={cn(
      "rounded-xl p-4 border animate-scale-in",
      config.bgColor,
      config.borderColor
    )}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {config.icon}
        </div>
        <div className="ml-3">
          <h3 className={cn("text-sm font-medium", config.textColor)}>
            {message}
          </h3>
          {details && (
            <div className={cn("mt-1 text-sm", config.textColor, "opacity-80")}>
              {details}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadStatus;
