import React from "react";
import Header from "./components/Header.jsx";
import About from "./components/About.jsx";
import Banner from "./components/Banner.jsx";
import BlogSidebar from "./components/BlogSidebar.jsx";
import LocationHours from "./components/LocationHours.jsx";
import Footer from "./components/Footer.jsx";
import ChatWidget from "./components/ChatWidget.jsx";

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
    <Header />

      <main className="w-full pb-24">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div
            className="
              grid items-start gap-8 lg:gap-10
              grid-cols-1
              lg:grid-cols-[minmax(0,1fr)_360px]
            "
          >
            {/* LEFT COLUMN: Stack About and Gallery here */}
            <div className="flex flex-col gap-8 lg:gap-10 min-w-0">
              
              {/* ABOUT */}
              <section className="min-w-0">
                <About />
              </section>

              {/* GALLERY (Moved here so sidebar can flow past it) */}
              <section className="min-w-0">
                <Banner />
              </section>

            </div>

            {/* RIGHT COLUMN: Sidebar (Extends naturally alongside About + Gallery) */}
            <aside id="blog" className="min-w-0 pt-10 sm:pt-14">
              <BlogSidebar />
            </aside>

            {/* VISIT US (Full Width at bottom) */}
            <section className="min-w-0 lg:col-span-2">
              <LocationHours />
            </section>
          </div>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}