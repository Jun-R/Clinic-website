import React from "react";
import Header from "./components/Header.jsx";
import About from "./components/About.jsx";
import Review from "./components/Review.jsx";
import Banner from "./components/Banner.jsx";
import BlogSidebar from "./components/BlogSidebar.jsx";
import LocationHours from "./components/LocationHours.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="w-full">
        {/* --- SECTION 1: Gallery --- */}
        <section className="w-full">
          <Banner />
        </section>

        {/* --- SECTION 2: About --- */}
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <About />
        </div>

        {/* --- SECTION 3: Events --- */}
        <div id="blog" className="w-full px-4 sm:px-6 lg:px-8 mt-12">
          <BlogSidebar />
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-8 mt-12 lg:mt-12">
          <Review />
        </div>

        {/* --- SECTION 4: Bottom Content --- */}
        <div className="w-full px-4 sm:px-6 lg:px-8 mt-12 lg:mt-12">
          <LocationHours />
        </div>
      </main>
      <Footer />
    </div>
  );
}