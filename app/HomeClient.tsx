"use client";

import React from "react";
import { Box } from "@mui/material";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

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
      <Navbar />
      <Hero />
      <Box sx={{ pt: { xs: 8, md: 7, lg: 8 } }} />
      <Box
        sx={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Section background="#ffffff" spacing={8}>
          <Services />
        </Section>
        <Section background="#F8F8F8" spacing={8}>
          <Process />
        </Section>
        <Section background="#ffffff" spacing={8}>
          <Team />
        </Section>
        <Section background="#F8F8F8" spacing={8}>
          <Testimonials />
        </Section>
        <Section background="#0D2340" spacing={8}>
          <CTA />
        </Section>
      </Box>
      <Footer />
    </Box>
  );
}