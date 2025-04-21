
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
          alt="Flipper Zero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-flipper-dark via-flipper-dark/90 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 text-white">
            <span className="block">Unleash Your</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-flipper-purple to-flipper-cyan">
              Digital Toolkit
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-xl">
            Flipper Zero: The portable multi-tool for pentesters, security researchers, and tech enthusiasts.
            Explore, analyze, and interact with digital systems on the go.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/products">
              <Button className="btn-tech text-lg px-8 py-6 w-full sm:w-auto">
                Explore Products
              </Button>
            </Link>
            <Link to="/products/flipper-zero">
              <Button variant="outline" className="text-lg px-8 py-6 border-flipper-purple text-flipper-purple hover:bg-flipper-purple/10 w-full sm:w-auto">
                Flagship Device
              </Button>
            </Link>
          </div>
          
          {/* Tech Specs Highlights */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="tech-container p-3">
              <div className="text-flipper-cyan font-mono text-sm">SUB-1 GHZ</div>
              <div className="text-white font-semibold">Radio Interface</div>
            </div>
            <div className="tech-container p-3">
              <div className="text-flipper-cyan font-mono text-sm">NFC + RFID</div>
              <div className="text-white font-semibold">Wireless Tech</div>
            </div>
            <div className="tech-container p-3">
              <div className="text-flipper-cyan font-mono text-sm">IR SENDER</div>
              <div className="text-white font-semibold">IR Controller</div>
            </div>
            <div className="tech-container p-3">
              <div className="text-flipper-cyan font-mono text-sm">OPEN SOURCE</div>
              <div className="text-white font-semibold">Hardware & SW</div>
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
