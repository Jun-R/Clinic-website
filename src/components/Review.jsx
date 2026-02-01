import React from "react";
import ScrollReveal from "./ScrollReveal.jsx";
import { data } from "../lib/Data.js";

export default function Review() {
  // We repeat the data 3 times to ensure the loop is long enough to be seamless
  // (Reviews are often fewer than gallery images, so we need more items to fill the width)
  const loop = [...data.reviews, ...data.reviews, ...data.reviews];

  return (
    <section id="reviews" className="scroll-mt-20">
      <ScrollReveal dir="up">
        <div className="card p-4 sm:p-6">
          <h2 className="text-xl font-semibold mb-3">미톡스 후기</h2>

          {/* Wrapper: Masks the overflow just like Banner.jsx */}
          <div className="relative overflow-hidden rounded-xl">
            
            {/* Moving Container: Uses the same 'scrolling-banner' class */}
            <div className="scrolling-banner gap-4 pr-4 flex">
              {loop.map((review, index) => (
                /* CARD ITEM:
                   - flex-shrink-0: Prevents the card from being squished
                   - w-[300px]: Fixed width is required for the scrolling to look even
                */
                <article 
                  key={index} 
                  className="
                    w-[280px] sm:w-[320px] 
                    flex-shrink-0
                    flex flex-col gap-3 
                    p-4 
                    border border-gray-100 rounded-2xl bg-gray-50/50
                  "
                >
                  {/* Image Section */}
                  {review.image ? (
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-black/5 bg-white">
                      <img
                        src={review.image}
                        alt={`${review.author} review`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    // Fallback placeholder
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                      No Image
                    </div>
                  )}

                  {/* Text Content */}
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-end mb-2">
                      <span className="font-semibold text-gray-900">{review.author}</span>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      "{review.content}"
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center border-t border-gray-100 pt-6">
            <a 
              href="https://map.naver.com/p/entry/place/1225820706?c=15.00,0,0,0,dh&placePath=/review?additionalHeight=76&fromPanelNum=1&locale=ko&svcName=map_pcv5&timestamp=202601311550&additionalHeight=76&timestamp=202601311550&locale=ko&svcName=map_pcv5&fromPanelNum=1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block text-sm text-green-600 font-medium hover:underline bg-green-50 px-4 py-2 rounded-full border border-green-100 transition-colors hover:bg-green-100"
            >
              네이버 지도에서 더 많은 후기 보기 →
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}