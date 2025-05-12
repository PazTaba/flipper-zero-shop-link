// src/components/home/ModernHero.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Cpu, Radio } from "lucide-react";

// Simplified Particle effect component
const Particles = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-flipper-purple/10 w-1 h-1 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 10 + 15}s`,
            animation: `float ${Math.random() * 10 + 15}s linear infinite`,
          }}
        />
      ))}
      {[...Array(5)].map((_, i) => (
        <div
          key={i + 'glow'}
          className="absolute bg-flipper-cyan/5 w-2 h-2 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 10 + 15}s`,
            animation: `float ${Math.random() * 10 + 15}s linear infinite, glow 4s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.2), 0 0 15px rgba(139, 92, 246, 0.2)" }}
      className="feature-card bg-flipper-dark/50 border border-flipper-purple/20 p-4 rounded-lg relative overflow-hidden shadow-md hover:border-flipper-purple/40 transition-all duration-300"
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="text-flipper-purple bg-flipper-purple/10 p-2 rounded-md">{icon}</div>
        <h3 className="font-medium text-flipper-purple">{title}</h3>
      </div>
      <p className="text-sm text-gray-300">{description}</p>
    </motion.div>
  );
};

// Main Hero component
const Hero = () => {
  const { t, language, dir } = useLanguage();

  // Define features
  const features = [
    {
      icon: <Radio className="h-5 w-5" />,
      title: t("hero.feature.sub1"),
      description: language === "he"
        ? "פענוח וקריאת שלטים אלחוטיים לדלתות, שערים ומכשירים שונים"
        : "Analyze & decode wireless remotes for doors, gates, and various devices"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: t("hero.feature.nfc"),
      description: language === "he"
        ? "קריאה, כתיבה והעתקה של מפתחות RFID ו-NFC"
        : "Read, write & clone RFID keys and NFC cards"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: t("hero.feature.ir"),
      description: language === "he"
        ? "למידה ושליטה במכשירים באמצעות אינפרא-אדום"
        : "Learn & control IR devices like TVs and appliances"
    },
    {
      icon: <Cpu className="h-5 w-5" />,
      title: t("hero.feature.os"),
      description: language === "he"
        ? "חומרה ותוכנה בקוד פתוח לחלוטין עם קהילת מפתחים נרחבת"
        : "Fully open source hardware & software with active developer community"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden hero-gradient py-16">
      {/* Background effects - simplified */}
      <div className="absolute inset-0 grid-bg opacity-20"></div>
      <Particles />

      {/* Floating device illustration */}
      <div className="absolute right-[-5%] top-1/2 transform -translate-y-1/2 w-2/5 hidden xl:block">
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 1, 0, -1, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "mirror"
          }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-flipper-purple/20 to-flipper-cyan/20 rounded-full blur-3xl opacity-30"></div>
          <img
            src="/images/flipper-device.png"
            alt="Flipper Zero Device"
            className="relative z-10 w-full h-full object-contain"
            onError={(e) => {
              // Fallback if image doesn't load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10" dir={dir}>
        <div className="max-w-2xl relative">
          {/* Main title with gradient effect */}
          <h1 className="mb-4 text-4xl sm:text-5xl lg:text-6xl font-bold">
            <span className="block text-gradient bg-gradient-to-r from-flipper-purple to-flipper-cyan bg-clip-text text-transparent">
              {t("hero.title1")}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl text-gray-300 mb-8 max-w-xl leading-relaxed"
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Link to="/products">
              <Button className="button-3d text-base px-6 py-5 w-full sm:w-auto group">
                {t("hero.cta.products")}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/products/flipper-zero">
              <Button variant="outline" className="text-base px-6 py-5 border-flipper-purple/50 text-flipper-purple hover:border-flipper-purple hover:bg-flipper-purple/10 w-full sm:w-auto">
                {t("hero.cta.flagship")}
              </Button>
            </Link>
          </motion.div>

          {/* What is Flipper Zero - SEO content with modern design */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="glass-card p-6 mb-10 max-w-xl bg-flipper-dark/30 border border-flipper-purple/20 rounded-lg shadow-md"
          >
            <h2 className="text-flipper-cyan text-xl font-semibold mb-3 flex items-center gap-2">
              <span className="inline-block bg-flipper-cyan/20 text-flipper-cyan p-1 rounded">?</span>
              {language === "he" ? "מה זה פליפר זירו?" : "What is Flipper Zero?"}
            </h2>
            <p className="text-gray-200 leading-relaxed">
              {language === "he"
                ? "פליפר זירו הוא גאדג'ט רב-תכליתי למקצועני אבטחת מידע, חובבי טכנולוגיה והאקרים. הוא מאפשר אינטראקציה עם מערכות אלחוטיות, RFID, NFC, אינפרא-אדום ועוד. מושלם לבדיקות אבטחה, פיתוח מערכות ופרויקטים טכניים מתקדמים."
                : "Flipper Zero is a multi-tool gadget for cybersecurity professionals, tech enthusiasts, and hackers. It enables interaction with wireless systems, RFID, NFC, infrared, and more. Perfect for security testing, system development, and advanced technical projects."}
            </p>
          </motion.div>

          {/* Feature Cards - Using a simple grid layout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Simplified decorative element */}
      <div className="absolute bottom-0 right-0 w-full h-16 bg-gradient-to-t from-flipper-dark to-transparent"></div>
    </section>
  );
};

export default Hero;