import React from "react";
import ScrollReveal from "./ScrollReveal.jsx";
import { samples } from "../lib/sampleData.js";


export default function Banner() {
    const items = [...samples.gallery, ...samples.ads];
    //Seamless loop
    const loop = [...items, ...items];


    return (
    <section id="gallery" className="scroll-mt-20">
    <ScrollReveal dir="up">
    <div className="card p-4 sm:p-6">
    <h2 className="text-xl font-semibold mb-3">갤러리</h2>
    <div className="relative overflow-hidden rounded-xl">
    <div className="scrolling-banner gap-4 pr-4">
    {loop.map((src, i) => (
    <img
    key={i}
    src={src}
    alt="banner item"
    className="h-40 sm:h-48 w-auto rounded-xl object-cover"
    />
    ))}
    </div>
    </div>
    </div>
    </ScrollReveal>
    </section>
    );
}