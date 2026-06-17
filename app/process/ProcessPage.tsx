"use client";

import React, { useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Stack,
} from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IoChevronForward } from "react-icons/io5";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// Centralized theme colors
const COLORS = {
  primary: "#0a1535",
  primaryHover: "#1a237e",
  gold: "#c8a951",
  goldLight: "#d4b365",
  textSecondary: "#3a4356",
  textMuted: "#5a6378",
  white: "#ffffff",
  bgLight: "#f8f9fb",
};

const processSteps = [
  {
    number: "01",
    title: "Offer Accepted",
    description: "We confirm the details and outline the next steps.",
  },
  {
    number: "02",
    title: "Documentation Review",
    description:
      "We collect and review all required documents to ensure everything is in order.",
  },
  {
    number: "03",
    title: "Mortgage & Legal Coordination",
    description:
      "We liaise with lenders, solicitors and other parties to keep things moving.",
  },
  {
    number: "04",
    title: "Sales Progression Management",
    description:
      "We proactively manage updates, chase outstanding items and resolve issues.",
  },
  {
    number: "05",
    title: "Exchange & Completion",
    description:
      "We coordinate exchange of contracts and completion for a smooth finish.",
  },
];

export default function ProcessPage() {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  const processSectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const connectingLineRef = useRef<HTMLDivElement>(null);

  const ctaSectionRef = useRef<HTMLDivElement>(null);
  const ctaTitleRef = useRef<HTMLHeadingElement>(null);
  const ctaSubtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);

  // Hero animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgImageRef.current,
        { scale: 1.15, opacity: 0.7 },
        { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }
      );

      gsap.fromTo(
        heroTitleRef.current,
        { opacity: 0, y: 50, rotationX: -10 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      gsap.fromTo(
        heroSubtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          delay: 0.5,
        }
      );

      gsap.fromTo(
        breadcrumbRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.7,
        }
      );

      if (bgImageRef.current) {
        gsap.to(bgImageRef.current, {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  // Process steps animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Connecting line draw animation (desktop only)
      if (connectingLineRef.current) {
        gsap.fromTo(
          connectingLineRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1.8,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: processSectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Step circles and content
      const validSteps = stepsRef.current.filter(
        (step): step is HTMLDivElement => step !== null
      );
      if (validSteps.length > 0) {
        gsap.fromTo(
          validSteps,
          { opacity: 0, y: 50, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.18,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: processSectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, processSectionRef);

    return () => ctx.revert();
  }, []);

  // CTA section animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ctaSectionRef.current,
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaSectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        [ctaTitleRef.current, ctaSubtitleRef.current, ctaButtonRef.current],
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: ctaSectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, ctaSectionRef);

    return () => ctx.revert();
  }, []);

  // Step circle hover animations
  useEffect(() => {
    const circles = document.querySelectorAll("[data-step-circle]");
    const handlers: {
      circle: Element;
      onEnter: () => void;
      onLeave: () => void;
    }[] = [];

    circles.forEach((circle) => {
      const number = circle.querySelector("span");

      const onEnter = () => {
        gsap.to(circle, {
          duration: 0.5,
          scale: 1.12,
          background: COLORS.gold,
          borderColor: COLORS.gold,
          boxShadow: "0 12px 30px rgba(200, 169, 81, 0.4)",
          ease: "back.out(1.5)",
          overwrite: "auto",
        });
        if (number) {
          gsap.to(number, {
            duration: 0.4,
            color: COLORS.white,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      };

      const onLeave = () => {
        gsap.to(circle, {
          duration: 0.4,
          scale: 1,
          background: COLORS.white,
          borderColor: "rgba(200, 169, 81, 0.4)",
          boxShadow: "0 4px 12px rgba(10, 21, 53, 0.06)",
          ease: "power2.out",
          overwrite: "auto",
        });
        if (number) {
          gsap.to(number, {
            duration: 0.4,
            color: COLORS.gold,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      };

      circle.addEventListener("mouseenter", onEnter);
      circle.addEventListener("mouseleave", onLeave);
      handlers.push({ circle, onEnter, onLeave });
    });

    return () => {
      handlers.forEach(({ circle, onEnter, onLeave }) => {
        circle.removeEventListener("mouseenter", onEnter);
        circle.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <Box component="main">
      {/* HERO SECTION */}
      <Box
        ref={heroSectionRef}
        sx={{
          position: "relative",
          width: "100%",
          minHeight: { xs: "260px", md: "320px", lg: "360px" },
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          ref={bgImageRef}
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=90')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(
              90deg,
              rgba(10, 21, 53, 0.95) 0%,
              rgba(10, 21, 53, 0.85) 40%,
              rgba(10, 21, 53, 0.55) 70%,
              rgba(10, 21, 53, 0.3) 100%
            )`,
            zIndex: 1,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "2px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(200, 169, 81, 0.5) 50%, transparent 100%)",
            zIndex: 2,
          }}
        />

        <Container
          maxWidth="xl"
          sx={{ position: "relative", zIndex: 3, py: { xs: 4, md: 6 } }}
        >
          <Typography
            ref={heroTitleRef}
            component="h1"
            sx={{
              fontSize: {
                xs: "2.25rem",
                sm: "2.75rem",
                md: "3.5rem",
                lg: "4rem",
              },
              fontWeight: 700,
              color: COLORS.white,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              mb: 2,
              fontFamily: "'Playfair Display', serif",
              textShadow: "0 2px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            Our Process
          </Typography>

          <Typography
            ref={heroSubtitleRef}
            sx={{
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              color: "rgba(255, 255, 255, 0.85)",
              lineHeight: 1.6,
              maxWidth: "520px",
              fontWeight: 400,
              mb: 2.5,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            A clear, proven process designed to get you from offer to
            completion.
          </Typography>

          {/* Breadcrumb */}
          <Stack
            ref={breadcrumbRef}
            direction="row"
            spacing={1}
            sx={{ mt: 2, alignItems: "center" }}
          >
            <Link href="/" style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  color: "rgba(255, 255, 255, 0.85)",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "color 0.3s ease",
                  fontFamily: "'Inter', sans-serif",
                  "&:hover": { color: COLORS.gold },
                }}
              >
                Home
              </Typography>
            </Link>
            <IoChevronForward size={14} color="rgba(255, 255, 255, 0.6)" />
            <Typography
              sx={{
                fontSize: "0.9rem",
                color: COLORS.gold,
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Our Process
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* PROCESS STEPS SECTION */}
      <Box
        ref={processSectionRef}
        sx={{
          background: COLORS.white,
          py: { xs: 6, md: 10 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background subtle gradients */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(circle at 10% 30%, rgba(200, 169, 81, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 90% 70%, rgba(10, 21, 53, 0.02) 0%, transparent 50%)
            `,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ position: "relative" }}>
            {/* Connecting Line (Desktop Only) */}
            <Box
              ref={connectingLineRef}
              sx={{
                position: "absolute",
                top: "32px",
                left: "10%",
                right: "10%",
                height: "1.5px",
                background: `linear-gradient(90deg, 
                  transparent 0%, 
                  rgba(200, 169, 81, 0.4) 10%, 
                  rgba(200, 169, 81, 0.6) 50%, 
                  rgba(200, 169, 81, 0.4) 90%, 
                  transparent 100%
                )`,
                display: { xs: "none", md: "block" },
                zIndex: 0,
              }}
            />

            <Grid container spacing={{ xs: 4, md: 2 }} sx={{ position: "relative", zIndex: 1 }}>
              {processSteps.map((step, index) => (
                <Grid
                  size={{ xs: 12, sm: 6, md: 12 / 5 }}
                  key={index}
                >
                  <Box
                    ref={(el: HTMLDivElement | null) => {
                      stepsRef.current[index] = el;
                    }}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      px: { xs: 1, md: 1.5 },
                    }}
                  >
                    {/* Number Circle */}
                    <Box
                      data-step-circle
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        background: COLORS.white,
                        border: "2px solid rgba(200, 169, 81, 0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        mb: 3,
                        boxShadow: "0 4px 12px rgba(10, 21, 53, 0.06)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Typography
                        component="span"
                        sx={{
                          fontSize: "1.15rem",
                          fontWeight: 700,
                          color: COLORS.gold,
                          fontFamily: "'Playfair Display', serif",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {step.number}
                      </Typography>
                    </Box>

                    {/* Title */}
                    <Typography
                      sx={{
                        fontSize: { xs: "1rem", md: "1.05rem" },
                        fontWeight: 700,
                        color: COLORS.primary,
                        mb: 1.5,
                        lineHeight: 1.3,
                        fontFamily: "'Playfair Display', serif",
                        letterSpacing: "-0.01em",
                        minHeight: { md: "52px" },
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {step.title}
                    </Typography>

                    {/* Description */}
                    <Typography
                      sx={{
                        fontSize: { xs: "0.875rem", md: "0.9rem" },
                        color: COLORS.textMuted,
                        lineHeight: 1.7,
                        fontWeight: 400,
                        fontFamily: "'Inter', sans-serif",
                        maxWidth: "220px",
                      }}
                    >
                      {step.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* CTA SECTION */}
      <Box
        sx={{
          background: COLORS.white,
          pb: { xs: 6, md: 10 },
          px: { xs: 2, md: 0 },
        }}
      >
        <Container maxWidth="xl">
          <Box
            ref={ctaSectionRef}
            sx={{
              background: COLORS.primary,
              borderRadius: "16px",
              p: { xs: 4, sm: 5, md: 6 },
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 12px 40px rgba(10, 21, 53, 0.15)",
            }}
          >
            {/* Background radial accents */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: `
                  radial-gradient(circle at 20% 50%, rgba(200, 169, 81, 0.08) 0%, transparent 50%),
                  radial-gradient(circle at 80% 50%, rgba(200, 169, 81, 0.05) 0%, transparent 50%)
                `,
                pointerEvents: "none",
                zIndex: 0,
              }}
            />

            {/* Top gold accent line */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "2px",
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(200, 169, 81, 0.5) 50%, transparent 100%)",
                zIndex: 1,
              }}
            />

            <Box sx={{ position: "relative", zIndex: 2 }}>
              <Typography
                ref={ctaTitleRef}
                component="h2"
                sx={{
                  fontSize: { xs: "1.5rem", sm: "1.85rem", md: "2.15rem" },
                  fontWeight: 700,
                  color: COLORS.white,
                  mb: 1.5,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Ready to get started?
              </Typography>

              <Typography
                ref={ctaSubtitleRef}
                sx={{
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  color: "rgba(255, 255, 255, 0.75)",
                  mb: 4,
                  lineHeight: 1.6,
                  fontWeight: 400,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Let our team manage your transaction from start to finish.
              </Typography>

              <Button
                ref={ctaButtonRef}
                variant="contained"
                sx={{
                  background: COLORS.white,
                  color: COLORS.primary,
                  px: 4,
                  py: 1.5,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  borderRadius: "8px",
                  textTransform: "none",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
                  position: "relative",
                  overflow: "hidden",
                  fontFamily: "'Inter', sans-serif",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(90deg, transparent, rgba(200, 169, 81, 0.2), transparent)",
                    transition: "left 0.5s ease",
                  },
                  "&:hover": {
                    background: COLORS.gold,
                    color: COLORS.white,
                    transform: "translateY(-4px)",
                    boxShadow: "0 16px 40px rgba(200, 169, 81, 0.4)",
                    "&::before": { left: "100%" },
                  },
                  transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                Book a Consultation
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}