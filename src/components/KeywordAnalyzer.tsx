
import React, { useState, useEffect } from "react";
import { MessageSquare, Lightbulb, Tag, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface KeywordAnalyzerProps {
  title: string;
}

interface Keyword {
  word: string;
  relevance: number; // 0-100
}

const KeywordAnalyzer: React.FC<KeywordAnalyzerProps> = ({ title }) => {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const analyzeKeywords = () => {
    setIsAnalyzing(true);
    
    // In a real app, we would send the title to an API for analysis
    // This is a simulation that extracts words and assigns random relevance scores
    setTimeout(() => {
      const words = title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .split(' ')
        .filter(word => word.length > 3)
        .map(word => ({
          word,
          relevance: Math.floor(Math.random() * 60) + 40 // Random relevance between 40-100
        }))
        .sort((a, b) => b.relevance - a.relevance)
        .slice(0, 5); // Get top 5 keywords
        
      // Add some common YouTube keywords if we don't have enough
      if (words.length < 5) {
        const commonKeywords = [
          { word: "tutorial", relevance: 85 },
          { word: "review", relevance: 80 },
          { word: "guide", relevance: 75 },
          { word: "howto", relevance: 90 },
          { word: "trending", relevance: 70 }
        ];
        
        for (let i = words.length; i < 5; i++) {
          words.push(commonKeywords[i - words.length]);
        }
      }
      
      setKeywords(words);
      setIsAnalyzing(false);
      setHasAnalyzed(true);
    }, 1500);
  };

  // Reset when title changes
  useEffect(() => {
    setHasAnalyzed(false);
    setKeywords([]);
  }, [title]);

  return (
    <div className="animate-slide-up space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageSquare size={18} className="text-brand-500" />
          <h3 className="font-medium text-gray-700">Keyword Analyzer</h3>
        </div>
        
        {!hasAnalyzed && (
          <button
            onClick={analyzeKeywords}
            disabled={isAnalyzing}
            className={cn(
              "flex items-center gap-1.5 bg-brand-50 text-brand-600 px-3 py-1.5 rounded-lg",
              "text-sm font-medium transition-colors",
              "hover:bg-brand-100",
              isAnalyzing ? "opacity-70 cursor-not-allowed" : ""
            )}
          >
            {isAnalyzing ? (
              <>
                <div className="h-3.5 w-3.5 rounded-full border-2 border-brand-500 border-r-transparent animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Lightbulb size={16} />
                <span>Analyze Keywords</span>
              </>
            )}
          </button>
        )}
      </div>
      
      {hasAnalyzed && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="mb-3">
            <p className="text-sm text-gray-600">Top keywords identified in this video:</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword, index) => (
              <div 
                key={index}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full",
                  "text-sm font-medium",
                  getKeywordColor(keyword.relevance)
                )}
              >
                <Tag size={14} />
                <span>{keyword.word}</span>
                <span className="text-xs opacity-70">{keyword.relevance}%</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <Lightbulb size={12} />
              <span>Keywords can help you understand the content before downloading</span>
            </div>
          </div>
        </div>
      )}
      
      {!hasAnalyzed && !isAnalyzing && (
        <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-400 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-2">
            <Tag size={24} className="opacity-40" />
            <p className="text-sm">Click "Analyze Keywords" to extract topics from this video</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to get color classes based on relevance
const getKeywordColor = (relevance: number): string => {
  if (relevance >= 85) {
    return "bg-brand-100 text-brand-700";
  } else if (relevance >= 70) {
    return "bg-blue-100 text-blue-700";
  } else if (relevance >= 50) {
    return "bg-purple-100 text-purple-700";
  } else {
    return "bg-gray-100 text-gray-700";
  }
};

export default KeywordAnalyzer;
