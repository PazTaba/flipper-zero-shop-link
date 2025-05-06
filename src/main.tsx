import App from "./App";
import SEOWrapper from "./components/SEOWrapper";
import { createRoot } from 'react-dom/client'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <SEOWrapper>
    <App />
  </SEOWrapper>
);
