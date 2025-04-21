
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section className="py-16 bg-flipper-dark/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-heading font-bold mb-6 techno-header">
              What is Flipper Zero?
            </h2>
            
            <div className="space-y-4 text-gray-300">
              <p>
                Flipper Zero is a portable multi-tool for pentesters and geeks in a toy-like body.
                It's designed to explore and experiment with the digital world around us, including
                radio protocols, access control systems, hardware and more.
              </p>
              
              <p>
                This portable device combines commonly used hardware tools in a single, well-designed
                case with an intuitive user interface based on a transflective LCD.
              </p>
              
              <p>
                Whether you're a cybersecurity professional, a hardware hacker, or just curious about
                digital systems, Flipper Zero offers a friendly and powerful platform for exploration
                and learning.
              </p>
            </div>
            
            {/* Feature list */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-flipper-purple rounded-full"></div>
                <span>Sub-1 GHz Radio</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-flipper-purple rounded-full"></div>
                <span>125 kHz RFID</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-flipper-purple rounded-full"></div>
                <span>NFC & 13.56 MHz RFID</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-flipper-purple rounded-full"></div>
                <span>Infrared Transceiver</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-flipper-purple rounded-full"></div>
                <span>iButton Contact Interface</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-flipper-purple rounded-full"></div>
                <span>GPIO & External Add-ons</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-flipper-purple rounded-full"></div>
                <span>USB Type-C</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-flipper-purple rounded-full"></div>
                <span>Bluetooth Connection</span>
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
