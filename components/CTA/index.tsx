"use client";

import React, { useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiArrowRight } from "react-icons/hi2";
import { FaPhone, FaEnvelope } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const COLORS = {
  gold: "#C7A15A",
  goldLight: "#d4b365",
};

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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
    <Box ref={sectionRef} sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="xl">
        <Box
          ref={contentRef}
          sx={{
            textAlign: "center",
            maxWidth: "800px",
            mx: "auto",
          }}
        >
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
            Get Started
          </Typography>

          <Typography
            component="h2"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3.2rem" },
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              fontFamily: "'Manrope', sans-serif",
              mb: 3,
            }}
          >
            Let&apos;s Move Your Transaction Forward
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.8,
              mb: 4,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Whether you&apos;re buying, selling, investing, or managing multiple transactions, our team is ready to help.
          </Typography>

          {/* FIX: justifyContent and alignItems inside sx */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Button
              variant="contained"
              endIcon={<HiArrowRight size={18} />}
              sx={{
                background: `linear-gradient(135deg, ${COLORS.gold} 0%, ${COLORS.goldLight} 100%)`,
                color: "#0D2340",
                px: 4,
                py: 1.7,
                fontSize: "0.95rem",
                fontWeight: 700,
                borderRadius: "12px",
                textTransform: "none",
                boxShadow: "0 8px 25px rgba(199,161,90,0.3)",
                fontFamily: "'Inter', sans-serif",
                transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 16px 40px rgba(199,161,90,0.4)",
                },
              }}
            >
              Schedule a Consultation
            </Button>
          </Stack>

          {/* FIX: Same here */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "rgba(255,255,255,0.6)",
                transition: "color 0.3s ease",
                "&:hover": { color: COLORS.gold },
                cursor: "pointer",
              }}
            >
              <FaPhone size={14} />
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
        +971569778391

              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "rgba(255,255,255,0.6)",
                transition: "color 0.3s ease",
                "&:hover": { color: COLORS.gold },
                cursor: "pointer",
              }}
            >
              <FaEnvelope size={14} />
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                hello@1conveyancing.com
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                London | Dubai
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}