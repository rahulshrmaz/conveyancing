"use client";

import React, { useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PiQuotes } from "react-icons/pi";

gsap.registerPlugin(ScrollTrigger);

const COLORS = {
  primary: "#0D2340",
  gold: "#C7A15A",
  textSecondary: "#3a4356",
};

const testimonials = [
  {
    quote:
      "Professional, responsive, and incredibly efficient throughout the entire process.",
    author: "Property Seller",
  },
  {
    quote:
      "The team kept us informed every step of the way and ensured a smooth completion.",
    author: "Property Buyer",
  },
  {
    quote:
      "Excellent communication and exceptional attention to detail.",
    author: "Property Investor",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box ref={sectionRef} sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
          <Typography
            sx={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: COLORS.gold,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              mb: 2,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Client Feedback
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              fontWeight: 700,
              color: COLORS.primary,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              fontFamily: "'Manrope', sans-serif",
              mb: 2,
            }}
          >
            Client Testimonials
          </Typography>
          <Box
            sx={{
              width: 60,
              height: 3,
              background: `linear-gradient(90deg, ${COLORS.gold}, #d4b365)`,
              borderRadius: 4,
              mx: "auto",
            }}
          />
        </Box>

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {testimonials.map((testimonial, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Paper
                ref={(el: HTMLDivElement | null) => {
                  cardsRef.current[index] = el;
                }}
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: "20px",
                  background: "#ffffff",
                  border: "1px solid rgba(13,35,64,0.06)",
                  transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 24px 48px rgba(13,35,64,0.1)",
                    borderColor: "rgba(199,161,90,0.2)",
                  },
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    opacity: 0.08,
                    color: COLORS.gold,
                  }}
                >
                  <PiQuotes size={60} />
                </Box>

                <Typography
                  sx={{
                    fontSize: "1rem",
                    color: COLORS.primary,
                    lineHeight: 1.8,
                    fontStyle: "italic",
                    mb: 3,
                    fontFamily: "'Inter', sans-serif",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  &ldquo;{testimonial.quote}&rdquo;
                </Typography>

                <Box
                  sx={{
                    width: 40,
                    height: 2,
                    background: `linear-gradient(90deg, ${COLORS.gold}, transparent)`,
                    borderRadius: 4,
                    mb: 2,
                  }}
                />

                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: COLORS.gold,
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {testimonial.author}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}