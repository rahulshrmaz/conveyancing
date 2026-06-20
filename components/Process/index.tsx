"use client";

import React, { useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
} from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  PiFileText,
  PiMagnifyingGlass,
  PiBank,
  PiArrowsClockwise,
  PiSignature,
} from "react-icons/pi";

gsap.registerPlugin(ScrollTrigger);

const COLORS = {
  primary: "#0D2340",
  gold: "#C7A15A",
  textSecondary: "#3a4356",
};

const steps = [
  {
    icon: PiFileText,
    number: "01",
    title: "Offer Accepted",
    description:
      "We confirm the details and outline the next steps, ensuring clear timelines for all stakeholders involved.",
  },
  {
    icon: PiMagnifyingGlass,
    number: "02",
    title: "Documentation Review",
    description:
      "We collect and review all required documents to ensure everything is in order.",
  },
  {
    icon: PiBank,
    number: "03",
    title: "Mortgage & Legal Coordination",
    description:
      "We liaise with lenders, solicitors, and other parties to keep things moving.",
  },
  {
    icon: PiArrowsClockwise,
    number: "04",
    title: "Sales Progression Management",
    description:
      "We proactively manage updates, chase outstanding items, and resolve issues.",
  },
  {
    icon: PiSignature,
    number: "05",
    title: "Exchange & Completion",
    description:
      "We coordinate exchange of contracts and completion for a smooth finish.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        stepsRef.current.filter(Boolean),
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
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
            How It Works
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
            Our Process
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

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <Grid 
                size={{ xs: 12, md: index === 4 ? 12 : 6, lg: index === 4 ? 12 : 6 }} 
                key={index}
              >
                <Box
                  ref={(el: HTMLDivElement | null) => {
                    stepsRef.current[index] = el;
                  }}
                  sx={{
                    display: "flex",
                    gap: { xs: 2.5, md: 3 },
                    p: { xs: 3, md: 4 },
                    borderRadius: "20px",
                    background: "#ffffff",
                    border: "1px solid rgba(13,35,64,0.06)",
                    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 20px 40px rgba(13,35,64,0.08)",
                      borderColor: "rgba(199,161,90,0.15)",
                      "& .step-number": {
                        color: COLORS.gold,
                        transform: "scale(1.1)",
                      },
                      "& .step-icon": {
                        background: `linear-gradient(135deg, ${COLORS.gold}, #d4b365)`,
                        color: "#ffffff",
                      },
                    },
                  }}
                >
                  <Box
                    className="step-icon"
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: "14px",
                      background: "rgba(199,161,90,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "all 0.4s ease",
                      color: COLORS.gold,
                    }}
                  >
                    <Icon size={24} />
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    {/* FIX: Stack ka saara logic sx mein daala */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 1.5,
                        mb: 1,
                      }}
                    >
                      <Typography
                        className="step-number"
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: "rgba(13,35,64,0.3)",
                          fontFamily: "'Manrope', sans-serif",
                          transition: "all 0.3s ease",
                        }}
                      >
                        {step.number}
                      </Typography>
                      <Box
                        sx={{
                          flex: 1,
                          height: "1px",
                          background:
                            "linear-gradient(90deg, rgba(13,35,64,0.08), transparent)",
                        }}
                      />
                    </Box>

                    <Typography
                      sx={{
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: COLORS.primary,
                        mb: 1,
                        fontFamily: "'Manrope', sans-serif",
                      }}
                    >
                      {step.title}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "0.9rem",
                        color: COLORS.textSecondary,
                        lineHeight: 1.7,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {step.description}
                    </Typography>
                  </Box>

                  {!isLast && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: -20,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "1px",
                        height: "40px",
                        background:
                          "linear-gradient(180deg, rgba(199,161,90,0.2), transparent)",
                        display: { xs: "none", md: "block" },
                      }}
                    />
                  )}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}