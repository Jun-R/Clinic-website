import React from "react";


export default function Footer() {
return (
<footer className="mt-16 border-t border-black/10 dark:border-white/10">
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-sm flex flex-col sm:flex-row items-center justify-between gap-4">
<div className="opacity-70">© {new Date().getFullYear()} 미톡스 외과의원 </div>
<div className="flex items-center gap-3">
<a href="#about" className="opacity-80 hover:opacity-100">About</a>
<a href="#gallery" className="opacity-80 hover:opacity-100">Gallery</a>
<a href="#location" className="opacity-80 hover:opacity-100">Visit</a>
</div>
</div>
</footer>
);
}