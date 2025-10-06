import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound";
import GlobalBackground from "./components/GlobalBackground";

export default function App() {
  return (
    <>
      <GlobalBackground />  {/* renders behind everything */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
