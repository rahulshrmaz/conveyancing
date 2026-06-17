"use client";

import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Navbar from "@/components/Navbar";
import GlobalLoader from "@/components/GlobalLoader";
import Hero from "@/components/Hero";
import Team from "@/components/Team";
import Footer from "@/components/Footer";

// Future Sections (uncomment when ready)
// import Services from "@/components/sections/Services";
// import Process from "@/components/sections/Process";
// import Insights from "@/components/sections/Insights";
// import Testimonials from "@/components/sections/Testimonials";
// import WhatsAppButton from "@/components/common/WhatsAppButton";

interface SectionProps {
  children: React.ReactNode;
  background?: string;
  shadow?: boolean;
  spacing?: number;
}

function Section({
  children,
  background = "#ffffff",
  shadow = false,
  spacing = 0,
}: SectionProps) {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        background,
        py: spacing,
        boxShadow: shadow
          ? "0 -8px 32px -4px rgba(0,0,0,0.07), 0 8px 32px -4px rgba(0,0,0,0.05)"
          : "none",
      }}
    >
      {children}
    </Box>
  );
}

export default function HomeClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          background: "#ffffff",
          overflowX: "hidden",
          position: "relative",
        }}
      >
        <GlobalLoader />
      </Box>
    );
  }

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        background: "#ffffff",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <Hero />

      {/* SPACER */}
      <Box sx={{ pt: { xs: 8, md: 7, lg: 8 } }} />

      {/* MAIN CONTENT */}
      <Box
        sx={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* TEAM SECTION */}
        <Section background="#ffffff" spacing={8}>
          <Team />
        </Section>

        {/* All sections will go here */}

        {/* <Section background="#ffffff">
          <Services />
        </Section>

        <Section background="#ffffff">
          <Process />
        </Section>

        <Section background="#ffffff">
          <Insights />
        </Section>

        <Section background="#F4EFEB">
          <Testimonials />
        </Section> */}
      </Box>

      {/* FOOTER */}
      <Footer />

      {/* WHATSAPP BUTTON (Future) */}
      {/* <WhatsAppButton /> */}
    </Box>
  );
}