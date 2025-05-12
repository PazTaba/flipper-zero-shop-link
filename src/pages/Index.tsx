// src/pages/Index.tsx
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import AboutSection from "@/components/home/AboutSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useLanguage } from "@/contexts/LanguageContext";
import SEOManager from "@/components/SEO/SEOManager";
import {
  getWebsiteSchema,
  getOrganizationSchema,
  getWebPageSchema,
  getFAQSchema
} from "@/utils/schemaGenerator";

const Index = () => {
  const { language } = useLanguage();

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  // Define the FAQ sections for structured data
  const faqs = [
    {
      question: language === "he" ? "מה זה פליפר זירו?" : "What is Flipper Zero?",
      answer: language === "he"
        ? "פליפר זירו הוא מכשיר נייד רב-תכליתי למקצועני אבטחת מידע, חובבי טכנולוגיה והאקרים. הוא מאפשר אינטראקציה עם מערכות אלחוטיות, RFID, NFC, אינפרא-אדום ועוד. מושלם לבדיקות אבטחה, פיתוח מערכות ופרויקטים טכניים מתקדמים."
        : "Flipper Zero is a multi-tool gadget for cybersecurity professionals, tech enthusiasts, and hackers. It enables interaction with wireless systems, RFID, NFC, infrared, and more. Perfect for security testing, system development, and advanced technical projects."
    },
    {
      question: language === "he" ? "האם ניתן להזמין פליפר זירו בישראל?" : "Can I order Flipper Zero in Israel?",
      answer: language === "he"
        ? "כן, אנחנו מספקים פליפר זירו עם משלוח מהיר לכל רחבי ישראל. אנו המשווק המורשה בישראל, עם אחריות מלאה ושירות לקוחות מעולה."
        : "Yes, we provide Flipper Zero with fast shipping throughout Israel. We are the authorized distributor in Israel, offering full warranty and excellent customer service."
    },
    {
      question: language === "he" ? "אילו אביזרים זמינים לפליפר זירו?" : "What accessories are available for Flipper Zero?",
      answer: language === "he"
        ? "אנו מציעים מגוון אביזרים לפליפר זירו, כולל כרטיס WiFi, כרטיסי NFC, תגי RFID, כיסויי מגן, תיקי נשיאה ועוד. כל האביזרים הם מקוריים ובאיכות גבוהה."
        : "We offer various accessories for Flipper Zero, including WiFi boards, NFC cards, RFID tags, protective cases, carrying pouches, and more. All accessories are original and high quality."
    },
    {
      question: language === "he" ? "האם פליפר זירו קוד פתוח?" : "Is Flipper Zero open source?",
      answer: language === "he"
        ? "כן, פליפר זירו הוא פרויקט קוד פתוח, הן מבחינת החומרה והן מבחינת התוכנה. זה מאפשר למשתמשים לפתח הרחבות ופונקציות חדשות."
        : "Yes, Flipper Zero is an open-source project, both for hardware and software. This allows users to develop extensions and new functions."
    },
    {
      question: language === "he" ? "האם פליפר זירו חוקי בישראל?" : "Is Flipper Zero legal in Israel?",
      answer: language === "he"
        ? "כן, פליפר זירו הוא חוקי בישראל כאשר משתמשים בו למטרות לגיטימיות כמו מחקר אבטחה, פיתוח ובדיקות. כמו כל כלי טכנולוגי, השימוש בו צריך להיות בהתאם לחוקים המקומיים."
        : "Yes, Flipper Zero is legal in Israel when used for legitimate purposes such as security research, development, and testing. Like any technological tool, its use should comply with local laws."
    }
  ];

  // Combined schema for better SEO
  const combinedSchema = [
    getWebsiteSchema(),
    getOrganizationSchema(),
    getWebPageSchema(
      language === "he"
        ? "פליפר זירו (Flipper Zero) - הגאדג'ט האולטימטיבי להאקרים | קנה עכשיו"
        : "Flipper Zero - The Ultimate Hacking Multi-tool | Buy Now",
      language === "he"
        ? "מהו פליפר זירו? גאדג'ט טכנולוגי מתקדם לחובבי האקינג ואבטחת מידע. קנה פליפר זירו עם משלוח מהיר לכל הארץ!"
        : "What is Flipper Zero? An advanced tech gadget for hacking enthusiasts and cybersecurity. Buy Flipper Zero with fast delivery nationwide!"
    ),
    getFAQSchema(faqs)
  ];

  return (
    <div className="min-h-screen flex flex-col" dir={language === "he" ? "rtl" : "ltr"}>
      <SEOManager
        title={
          language === "he"
            ? "פליפר זירו (Flipper Zero) - הגאדג'ט האולטימטיבי להאקרים | קנה עכשיו"
            : "Flipper Zero - The Ultimate Hacking Multi-tool | Buy Now"
        }
        description={
          language === "he"
            ? "מהו פליפר זירו? גאדג'ט טכנולוגי מתקדם לחובבי האקינג ואבטחת מידע. קנה פליפר זירו עם משלוח מהיר לכל הארץ!"
            : "What is Flipper Zero? An advanced tech gadget for hacking enthusiasts and cybersecurity. Buy Flipper Zero with fast delivery nationwide!"
        }
        schema={combinedSchema}
        keywords={
          language === "he"
            ? "פליפר זירו, Flipper Zero, מה זה פליפר זירו, what is Flipper Zero, לקנות פליפר זירו, גאדג'ט האקינג, אביזרים לפליפר זירו, כרטיס WiFi, NFC, RFID, sub-1GHz, הזמנה מהירה"
            : "Flipper Zero, hacking device, penetration testing, security research, NFC, RFID, WiFi, IR blaster, multi-tool, cybersecurity gadget, fast shipping, Israel"
        }
      />
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedProducts />
        <AboutSection />

        {/* FAQ Section for SEO and User Experience */}
        <section className="py-16 bg-flipper-dark/80">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold mb-8 techno-header">
              {language === "he" ? "שאלות נפוצות" : "Frequently Asked Questions"}
            </h2>
            <div className="space-y-6 max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <div key={index} className="tech-container p-6">
                  <h3 className="text-xl font-bold mb-2 text-flipper-purple">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;