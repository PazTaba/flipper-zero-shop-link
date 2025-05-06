
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t, language } = useLanguage();

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
          alt="Flipper Zero - פליפר זירו"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-flipper-dark via-flipper-dark/90 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-flipper-purple to-flipper-cyan">
            <span className="block">{t("hero.title1")}</span>
            <p className="text-xl text-gray-300 mb-8 max-w-xl">
              {t("hero.subtitle")}
            </p>
          </h1>

          {/* What is Flipper Zero - SEO content */}
          <div className="mb-8 bg-flipper-dark/70 p-4 rounded-lg border border-flipper-purple/30 max-w-xl">
            <h2 className="text-flipper-cyan text-lg font-semibold mb-2">
              {language === "he" ? "מה זה פליפר זירו?" : "What is Flipper Zero?"}
            </h2>
            <p className="text-gray-200 text-sm">
              {language === "he" 
                ? "פליפר זירו הוא גאדג'ט רב-תכליתי למקצועני אבטחת מידע, חובבי טכנולוגיה והאקרים. הוא מאפשר אינטראקציה עם מערכות אלחוטיות, RFID, NFC, אינפרא-אדום ועוד. מושלם לבדיקות אבטחה, פיתוח מערכות ופרויקטים טכניים מתקדמים."
                : "Flipper Zero is a multi-tool gadget for cybersecurity professionals, tech enthusiasts, and hackers. It enables interaction with wireless systems, RFID, NFC, infrared, and more. Perfect for security testing, system development, and advanced technical projects."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/products">
              <Button className="btn-tech text-lg px-8 py-6 w-full sm:w-auto">
                {t("hero.cta.products")}
              </Button>
            </Link>
            <Link to="/products/flipper-zero">
              <Button variant="outline" className="text-lg px-8 py-6 border-flipper-purple text-flipper-purple hover:bg-flipper-purple/10 w-full sm:w-auto">
                {t("hero.cta.flagship")}
              </Button>
            </Link>
          </div>

          {/* Tech Specs Highlights */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="tech-container p-3">
              <div className="text-flipper-cyan font-mono text-sm">SUB-1 GHZ</div>
              <div className="text-white font-semibold">{t("hero.feature.sub1")}</div>
            </div>
            <div className="tech-container p-3">
              <div className="text-flipper-cyan font-mono text-sm">NFC + RFID</div>
              <div className="text-white font-semibold">{t("hero.feature.nfc")}</div>
            </div>
            <div className="tech-container p-3">
              <div className="text-flipper-cyan font-mono text-sm">IR SENDER</div>
              <div className="text-white font-semibold">{t("hero.feature.ir")}</div>
            </div>
            <div className="tech-container p-3">
              <div className="text-flipper-cyan font-mono text-sm">OPEN SOURCE</div>
              <div className="text-white font-semibold">{t("hero.feature.os")}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 w-1/2 h-40 bg-gradient-to-t from-flipper-dark to-transparent"></div>
    </section>
  );
};

export default Hero;
