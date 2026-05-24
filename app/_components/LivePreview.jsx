import React from "react";
import { HiOutlinePlayCircle, HiOutlineDocumentText, HiOutlineCodeBracket, HiOutlineClock, HiOutlineBookOpen, HiOutlineAcademicCap } from "react-icons/hi2";

function LivePreview() {
  const mockChapters = [
    { title: "Introduction to React Hooks", duration: "10 mins", active: true },
    { title: "State Management with Context", duration: "15 mins", active: false },
    { title: "Data Fetching & SWR", duration: "12 mins", active: false },
    { title: "Building a Custom Hook", duration: "18 mins", active: false }
  ];

  return (
    <section className="py-24 px-6 bg-white dark:bg-zinc-950">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Premium learning experience
          </h2>
          <p className="mt-4 text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            Every generated course features a clean, distraction-free interface optimized for reading, watching, and coding.
          </p>
        </div>

        {/* Mockup Container */}
        <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-xl shadow-zinc-200/50 dark:shadow-none overflow-hidden ring-1 ring-zinc-900/5 dark:ring-zinc-100/10">
          
          {/* Browser Header Mock */}
          <div className="h-12 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50 flex items-center px-4 gap-4">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
              <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
              <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
            </div>
            <div className="flex-1 max-w-md mx-auto bg-white dark:bg-zinc-950 rounded-md h-7 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center px-3 text-[10px] text-zinc-400 font-mono select-none">
              <span className="opacity-50">https://</span>edugenie.app/course/react-masterclass
            </div>
            <div className="w-10"></div> {/* Spacer to balance header */}
          </div>

          {/* App UI Body */}
          <div className="flex flex-col md:flex-row min-h-[500px]">
            {/* Sidebar */}
            <div className="w-full md:w-72 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 hidden md:block">
              <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
                <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 line-clamp-1">Advanced React Patterns</h3>
                <div className="flex items-center gap-3 mt-2 text-xs text-zinc-500">
                   <div className="flex items-center gap-1"><HiOutlineBookOpen size={12}/> 4 Chapters</div>
                   <div className="flex items-center gap-1"><HiOutlineAcademicCap size={12}/> Intermediate</div>
                </div>
              </div>
              <div className="p-2 space-y-0.5">
                {mockChapters.map((chapter, i) => (
                  <div key={i} className={`flex items-start gap-3 p-2.5 rounded-lg transition-colors ${chapter.active ? 'bg-white dark:bg-zinc-800 shadow-sm border border-zinc-200/60 dark:border-zinc-700' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800/50 border border-transparent'}`}>
                    <div className={`w-6 h-6 shrink-0 rounded flex items-center justify-center text-[10px] font-medium mt-0.5 ${chapter.active ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'}`}>{i + 1}</div>
                    <div className="space-y-1">
                       <div className={`text-xs font-medium leading-tight ${chapter.active ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-600 dark:text-zinc-400'}`}>{chapter.title}</div>
                       <div className="flex items-center gap-1 text-[10px] text-zinc-400">
                         <HiOutlineClock size={10} /> {chapter.duration}
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6 md:p-10 bg-white dark:bg-zinc-950 overflow-hidden relative">
              <div className="max-w-2xl">
                <div className="mb-8">
                  <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 mb-3">
                    Introduction to React Hooks
                  </h1>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class. In this chapter, we will learn how to modernize our components using useState and useEffect.
                  </p>
                </div>

                <div className="relative aspect-video w-full rounded-xl bg-zinc-900 overflow-hidden border border-zinc-800 flex flex-col items-center justify-center mb-10 group cursor-pointer">
                  {/* Fake video thumbnail look */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                     <div className="w-full flex items-center gap-4">
                        <HiOutlinePlayCircle className="w-8 h-8 text-white hover:text-zinc-300 transition-colors" />
                        <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                           <div className="h-full w-1/3 bg-red-500 rounded-full"></div>
                        </div>
                        <span className="text-xs text-white font-mono">03:42 / 10:00</span>
                     </div>
                  </div>
                  <HiOutlinePlayCircle className="w-16 h-16 text-white/90 group-hover:scale-110 transition-transform duration-300 shadow-2xl" />
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
                      <span className="text-xs font-medium text-zinc-500">1</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Understanding useState</h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        The <code>useState</code> hook allows functional components to maintain internal state. It returns an array containing the current state value and a function to update it. This fundamentally shifts how we approach component lifecycle and state management.
                      </p>
                    </div>
                  </div>

                  <div className="md:ml-10 rounded-xl bg-[#0f1117] p-5 border border-zinc-800 shadow-xl overflow-hidden">
                    <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-3">
                       <div className="flex items-center gap-2">
                         <HiOutlineCodeBracket className="text-zinc-400" />
                         <span className="text-xs font-mono text-zinc-400">Counter.jsx</span>
                       </div>
                       <div className="flex gap-1.5">
                         <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                         <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                       </div>
                    </div>
                    <pre className="text-xs font-mono leading-relaxed overflow-x-auto text-zinc-300">
<span className="text-pink-400">import</span> React, {'{'} useState {'}'} <span className="text-pink-400">from</span> <span className="text-emerald-300">'react'</span>;{'\n\n'}
<span className="text-pink-400">export default function</span> <span className="text-amber-200">Counter</span>() {'{'}{'\n'}
{'  '}<span className="text-pink-400">const</span> [count, setCount] = <span className="text-blue-300">useState</span>(<span className="text-orange-300">0</span>);{'\n\n'}
{'  '}<span className="text-pink-400">return</span> ({'\n'}
{'    '}<span className="text-zinc-500">&lt;</span><span className="text-blue-400">div</span><span className="text-zinc-500">&gt;</span>{'\n'}
{'      '}<span className="text-zinc-500">&lt;</span><span className="text-blue-400">p</span><span className="text-zinc-500">&gt;</span>You clicked {'{'}count{'}'} times<span className="text-zinc-500">&lt;/</span><span className="text-blue-400">p</span><span className="text-zinc-500">&gt;</span>{'\n'}
{'      '}<span className="text-zinc-500">&lt;</span><span className="text-blue-400">button</span> <span className="text-emerald-200">onClick</span>={'{\n'}
{'        '}<span className="text-zinc-500">() =&gt;</span> <span className="text-blue-300">setCount</span>(count + <span className="text-orange-300">1</span>){'\n'}
{'      }'}<span className="text-zinc-500">&gt;</span>{'\n'}
{'        '}Click me{'\n'}
{'      '}<span className="text-zinc-500">&lt;/</span><span className="text-blue-400">button</span><span className="text-zinc-500">&gt;</span>{'\n'}
{'    '}<span className="text-zinc-500">&lt;/</span><span className="text-blue-400">div</span><span className="text-zinc-500">&gt;</span>{'\n'}
{'  '});{'\n'}
{'}'}
                    </pre>
                  </div>
                </div>
              </div>
              
              {/* Fade out bottom to make it look like a peek */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default LivePreview;
