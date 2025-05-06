
import { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";

interface SEOWrapperProps {
  children: ReactNode;
}

const SEOWrapper = ({ children }: SEOWrapperProps) => {
  return <HelmetProvider>{children}</HelmetProvider>;
};

export default SEOWrapper;
