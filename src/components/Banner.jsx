import React, {useState, useEffect } from "react";
import ScrollReveal from "./ScrollReveal.jsx";
import { supabase } from "../lib/Data.js";

export default function Banner() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getGallery();
    }, []);
    
    async function getGallery() {
        const { data, error } = await supabase
            .from('gallery') // Must match the table name we created in SQL
            .select('*')
            .order('id', { ascending: true });
    
        if (error) {
            console.error("Error fetching gallery:", error);
        } else {
            setItems(data || []);
        }
    }
    
    //Seamless loop
    const loop = items.length > 0 ? [...items, ...items, ...items] : [];


    return (
        <section id="gallery" className="scroll-mt-20">
            <ScrollReveal dir="up">
                <div className="card p-4 sm:p-6">
                <h2 className="text-xl font-semibold mb-3">갤러리</h2>
                    <div className="relative overflow-hidden rounded-xl">
                        <div className="scrolling-banner gap-4 pr-4">
                        {loop.map((item, i) => (
                            <img
                            key={i}
                            src={item.image_url}
                            alt="banner item"
                            className="h-40 sm:h-48 w-auto rounded-xl object-cover"
                            />
                            ))
                        }
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
}