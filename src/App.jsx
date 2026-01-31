import React from "react";
import Header from "./components/Header.jsx";
import About from "./components/About.jsx";
import Banner from "./components/Banner.jsx";
import BlogSidebar from "./components/BlogSidebar.jsx";
import LocationHours from "./components/LocationHours.jsx";
import Footer from "./components/Footer.jsx";
import ChatWidget from "./components/ChatWidget.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="w-full">
        
        {/* --- SECTION 1: Top Content --- */}
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div
            className="
              grid items-start gap-8 lg:gap-10
              grid-cols-1
              lg:grid-cols-[minmax(0,1fr)_360px]
            "
          >
            <div className="min-w-0">
              <About />
            </div>
            <aside id="blog" className="min-w-0 pt-10 sm:pt-14">
              <BlogSidebar />
            </aside>
          </div>
        </div>

        {/* --- SECTION 2: Banner --- */}
        {/* CHANGED: px-8 -> px-4 sm:px-6 lg:px-8 to match the other containers */}
        <section className="w-full px-4 sm:px-6 lg:px-8 mt-12 lg:mt-12">
          <Banner />
        </section>

        {/* --- SECTION 3: Bottom Content --- */}
        <div className="w-full px-4 sm:px-6 lg:px-8 mt-12 lg:mt-12">
          <LocationHours />
        </div>

      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}