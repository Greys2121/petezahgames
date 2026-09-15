import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, HashRouter, Routes, Route, useParams } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProfilePage from "./components/ProfilePage";
import SharedAiPage from "./components/SharedAiPage";
import SvgAccessGate from "./components/SvgAccessGate";
import LegalReagreeModal from "./components/LegalReagreeModal";
import ActivityCaptchaModal from "./components/ActivityCaptchaModal";
import { isSvgShell } from "./lib/siteOrigin";
import { isQuietBoot, whenQuietEnds } from "./lib/quietBoot";

const queryClient = new QueryClient();
const Router = isSvgShell() ? HashRouter : BrowserRouter;

function PublicProfileRoute() {
  const { username } = useParams();
  return <ProfilePage username={username || ""} />;
}

function QuietShell({ children }: { children: React.ReactNode }) {
  const [, bump] = useState(0);
  useEffect(() => whenQuietEnds(() => bump((n) => n + 1)), []);
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <SvgAccessGate>
          <QuietShell>
            {!isQuietBoot() ? <LegalReagreeModal /> : null}
            {!isQuietBoot() ? <ActivityCaptchaModal /> : null}
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/user/:username" element={<PublicProfileRoute />} />
              <Route path="/share/ai/:token" element={<SharedAiPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </QuietShell>
        </SvgAccessGate>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
