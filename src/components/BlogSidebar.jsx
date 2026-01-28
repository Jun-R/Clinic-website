import React from "react";
import ScrollReveal from "./ScrollReveal.jsx";
import { Calendar } from "lucide-react";

const EVENTS_DATA = [
  {
    id: 1,
    title: "겨울맞이 이벤트",
    //date: "2024. 12. 01 ~ 2025. 02. 28",
    description: "올 겨울, 미톡스에서 준비한 특별한 혜택을 만나보세요.", // Add description
    // IMPORTANT: Use forward slashes (/) for web paths
    imageUrl: "/img/원내이벤트25년겨울.jpg", 
  },
  // Add more events here...
];

export default function BlogSidebar() {
  return (
    <ScrollReveal dir="left">
      <div className="card p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Calendar size={20} className="opacity-70" />
            이벤트 & 소식
          </h3>
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {EVENTS_DATA.map((event) => (
            /* 1. WRAPPER: Everything for one event must go inside this single parent */
            <article key={event.id} className="flex flex-col gap-3">
              
              {/* Image Section */}
              <div className="overflow-hidden rounded-xl border border-black/5 dark:border-white/5 bg-black/5">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-auto object-cover block" 
                />
              </div>

              {/* Text Section */}
              <div>
                <h4 className="font-semibold leading-tight text-[color:var(--mint-600)]">
                  {event.title}
                </h4>
                
                {/* Only render date if it exists */}
                {event.date && (
                  <div className="text-xs font-medium opacity-60 mt-1 mb-2">
                    {event.date}
                  </div>
                )}

                {/* Only render description if it exists */}
                {event.description && (
                  <p className="text-sm opacity-80 leading-relaxed whitespace-pre-wrap">
                    {event.description}
                  </p>
                )}
              </div>
            </article>
          ))}
          
          {EVENTS_DATA.length === 0 && (
             <div className="text-sm opacity-70 py-6 text-center">
               진행 중인 이벤트가 없습니다.
             </div>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
}