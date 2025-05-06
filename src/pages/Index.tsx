
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import AboutSection from "@/components/home/AboutSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { language } = useLanguage();
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".speakable"]
    },
    "name": language === "he" ? "פליפר זירו - הגאדג'ט הטכנולוגי המוביל" : "Flipper Zero - The Ultimate Tech Gadget",
    "description": language === "he" 
      ? "פליפר זירו למכירה בישראל עם אביזרים, הרחבות ומשלוח מהיר. מהו פליפר זירו? גאדג'ט האקינג רב-תכליתי לאבטחת מידע ופרויקטים טכניים."
      : "Buy Flipper Zero in Israel with accessories, extensions, and fast delivery. What is Flipper Zero? A multi-purpose hacking gadget for cybersecurity and technical projects."
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
        <title>
          {language === "he" 
            ? "פליפר זירו (Flipper Zero) - מה זה ואיפה לקנות בישראל" 
            : "Flipper Zero - What it is and where to buy in Israel"}
        </title>
        <meta name="description" content={
          language === "he"
            ? "מהו פליפר זירו? גאדג'ט טכנולוגי מתקדם לחובבי האקינג ואבטחת מידע. קנה פליפר זירו עם משלוח מהיר לכל הארץ!"
            : "What is Flipper Zero? An advanced tech gadget for hacking enthusiasts and cybersecurity. Buy Flipper Zero with fast delivery nationwide!"
        } />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedProducts />
        <AboutSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
