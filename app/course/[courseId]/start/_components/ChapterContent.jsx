import React, { useState } from "react";
import YouTube from "react-youtube";
import ReactMarkdown from "react-markdown";
import { HiMenuAlt2, HiOutlineClipboardList } from "react-icons/hi";
import "./youtubeAdjustments.css";
import { Button } from "@/components/ui/button";

function ChapterContent({ chapter, content, handleSideBarFunction }) {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  
  // Helper to extract clean video ID
  const getSanitizedVideoId = (id, index = 0) => {
    if (!id) return null;
    
    // If it's an array, take the element at the specified index
    const actualId = Array.isArray(id) ? id[index] : id;
    if (typeof actualId !== 'string') return null;

    // Standard YouTube ID is usually 11 characters
    if (actualId.length === 11 && !actualId.includes('/') && !actualId.includes('?')) {
      return actualId;
    }

    // Try to extract from URL
    const match = actualId.match(/(?:v=|youtu\.be\/|embed\/|\/v\/|\/e\/|watch\?v=|\&v=)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  // Function to render YouTube video
  const renderYouTubeVideo = () => {
    const sanitizedId = getSanitizedVideoId(content?.videoId, selectedVideoIndex);
    if (!sanitizedId) return null;

    const isArray = Array.isArray(content?.videoId);
    const videoCount = isArray ? content?.videoId?.length : 1;

    return (
      <div className="space-y-4 my-8">
        {/* Video Switcher */}
        {isArray && videoCount > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar no-scrollbar">
            {content.videoId.map((_, index) => (
              <Button
                key={index}
                variant={selectedVideoIndex === index ? "default" : "ghost"}
                onClick={() => setSelectedVideoIndex(index)}
                className={`flex-none px-4 rounded-md text-xs font-medium h-8 transition-colors duration-150 ${
                  selectedVideoIndex === index 
                    ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900" 
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                Tutorial {index + 1}
              </Button>
            ))}
          </div>
        )}

        <div className="aspect-video w-full rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
          <YouTube 
            videoId={sanitizedId} 
            opts={{ 
              playerVars: { autoplay: 0 },
              width: '100%',
              height: '100%',
            }} 
            className="w-full h-full"
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Mobile Header */}
      <div className="flex items-center justify-between mb-8 md:hidden">
        <button
          onClick={() => handleSideBarFunction(true)}
          className="p-2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-150"
        >
          <HiMenuAlt2 size={20} />
        </button>
      </div>

      {/* Chapter Information */}
      <div className="space-y-3 mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          {chapter?.ChapterName}
        </h2>
        <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-3xl">
          {chapter?.About}
        </p>
      </div>

      {/* Video Section */}
      {renderYouTubeVideo()}

      {/* Content Section */}
      <div className="space-y-10 mt-10">
        {content?.content?.chapters?.map((item, index) => (
          <div key={index} className="space-y-5">
            <div className="flex items-start gap-3">
               <div className="flex-none w-7 h-7 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-xs font-medium text-zinc-500">
                  {index + 1}
               </div>
               <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mt-0.5">
                  {item?.title}
               </h3>
            </div>
            
            <div className="pl-0 md:pl-10">
              <div className="prose prose-zinc dark:prose-invert max-w-none text-sm text-zinc-600 dark:text-zinc-300">
                <ReactMarkdown className="leading-relaxed">
                  {item?.explanation}
                </ReactMarkdown>
              </div>

              {/* Code Example Section */}
              {item?.codeExample && (
                <div className="relative mt-6 group">
                  <div className="absolute top-3 right-3 z-10">
                    <button
                      onClick={async () => {
                        await navigator.clipboard.writeText(item.codeExample.replace(/<\/?precode>/g, ""));
                      }}
                      className="p-1.5 rounded-md bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-700/80 transition-colors border border-zinc-700/50"
                    >
                      <HiOutlineClipboardList size={16} />
                    </button>
                  </div>
                  <div className="bg-[#0f1117] rounded-lg p-5 border border-zinc-800 overflow-hidden">
                    <pre className="overflow-x-auto custom-scrollbar">
                      <code className="text-zinc-300 font-mono text-xs leading-relaxed">
                        {item.codeExample.replace(/<\/?precode>/g, "")}
                      </code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
            
            {index !== content?.content?.chapters?.length - 1 && (
              <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-8 md:ml-10" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterContent;
