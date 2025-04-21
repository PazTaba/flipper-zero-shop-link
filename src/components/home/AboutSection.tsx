
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-flipper-dark/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-heading font-bold mb-6 techno-header">
              {t("about.title")}
            </h2>
            
            <div className="space-y-4 text-gray-300">
              <p>
                {t("about.paragraph1")}
              </p>
              
              <p>
                {t("about.paragraph2").replace("��", "ו")}
              </p>
            </div>
            
            {/* Feature list */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-flipper-purple rounded-full"></div>
                <span>{t("about.feature.sub1")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-flipper-purple rounded-full"></div>
                <span>{t("about.feature.rfid")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-flipper-purple rounded-full"></div>
                <span>{t("about.feature.nfc")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-flipper-purple rounded-full"></div>
                <span>{t("about.feature.ir")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-flipper-purple rounded-full"></div>
                <span>{t("about.feature.ibutton")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-flipper-purple rounded-full"></div>
                <span>{t("about.feature.gpio")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-flipper-purple rounded-full"></div>
                <span>{t("about.feature.usb")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-flipper-purple rounded-full"></div>
                <span>{t("about.feature.bt")}</span>
              </div>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden border border-flipper-purple/30">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                alt="Flipper Zero Usage"
                className="w-full h-auto rounded-lg"
              />
              {/* Overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-flipper-purple/20 to-transparent"></div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-flipper-cyan rounded-lg z-[-1]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
