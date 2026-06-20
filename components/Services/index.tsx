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
import {
  PiChartLineUp,
  PiLink,
  PiHandshake,
  PiBank,
  PiFiles,
  PiCheckCircle,
} from "react-icons/pi";

gsap.registerPlugin(ScrollTrigger);

const COLORS = {
  primary: "#0D2340",
  gold: "#C7A15A",
  textSecondary: "#3a4356",
};

const services = [
  {
    icon: PiChartLineUp,
    title: "Sales Progression",
    description:
      "We actively manage every stage of the transaction, ensuring all parties remain aligned and informed.",
  },
  {
    icon: PiLink,
    title: "Chain Management",
    description:
      "Proactive monitoring of property chains to minimise delays and identify risks early.",
  },
  {
    icon: PiHandshake,
    title: "Buyer & Seller Support",
    description:
      "Dedicated communication and guidance throughout the transaction journey.",
  },
  {
    icon: PiBank,
    title: "Mortgage Coordination",
    description:
      "Liaising with lenders and brokers to help keep finance approvals on schedule.",
  },
  {
    icon: PiFiles,
    title: "Documentation Management",
    description:
      "Ensuring all required documents are collected, reviewed, and processed efficiently.",
  },
  {
    icon: PiCheckCircle,
    title: "Completion Support",
    description:
      "Final-stage coordination to achieve smooth and timely completion.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
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
            What We Do
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
            Our Services
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
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
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
                    cursor: "default",
                    height: "100%",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 24px 48px rgba(13,35,64,0.1)",
                      borderColor: "rgba(199,161,90,0.2)",
                      "& .service-icon": {
                        background: `linear-gradient(135deg, ${COLORS.gold}, #d4b365)`,
                        color: "#ffffff",
                        transform: "scale(1.1) rotate(5deg)",
                      },
                    },
                  }}
                >
                  <Box
                    className="service-icon"
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "14px",
                      background: "rgba(199,161,90,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2.5,
                      transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      color: COLORS.gold,
                    }}
                  >
                    <Icon size={26} />
                  </Box>

                  <Typography
                    sx={{
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      color: COLORS.primary,
                      mb: 1.5,
                      fontFamily: "'Manrope', sans-serif",
                    }}
                  >
                    {service.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      color: COLORS.textSecondary,
                      lineHeight: 1.7,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {service.description}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}