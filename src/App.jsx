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
            {/* ABOUT*/}
            <section className="min-w-0">
              <About />
            </section>

            {/* BLOG*/}
            <aside id="blog" className="min-w-0 lg:col-start-2 lg:row-auto pt-10 sm:pt-14">
              <BlogSidebar />
            </aside>

            {/* GALLERY*/}
            <section className="min-w-0 lg:col-span-2">
              <Banner />
            </section>

            {/* VISIT US*/}
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