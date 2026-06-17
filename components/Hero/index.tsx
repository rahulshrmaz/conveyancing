"use client";

import React, { useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Grid,
} from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiArrowRight } from "react-icons/hi2";
import {
  PiHouseLineLight,
  PiMedalLight,
  PiUsersThreeLight,
  PiClockCountdownLight,
} from "react-icons/pi";

gsap.registerPlugin(ScrollTrigger);

const COLORS = {
  primary: "#0a1535",
  primaryHover: "#1a237e",
  gold: "#c8a951",
  goldLight: "#d4b365",
  textSecondary: "#3a4356",
  white: "#ffffff",
};

const stats = [
  { icon: PiHouseLineLight, value: "1,000+", label: "Transactions Managed" },
  { icon: PiMedalLight, value: "17+", label: "Years Experience" },
  { icon: PiUsersThreeLight, value: "98%", label: "Client Satisfaction" },
  { icon: PiClockCountdownLight, value: "24/7", label: "Transaction Updates" },
];

// ✅ Fix 1: Handler type defined
interface EventHandler {
  circle: Element;
  onEnter: () => void;
  onLeave: () => void;
}

export default function HeroPremium() {
  const heroContentRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  // ✅ Fix 2: buttonsRef typed as HTMLDivElement
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const statsContainerRef = useRef<HTMLDivElement | null>(null);
  // ✅ Fix 3: statItemsRef typed correctly
  const statItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgImageRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);

  // Main entry animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out", delay: 0.3 }
      );

      const tl = gsap.timeline();

      tl.fromTo(
        headingRef.current,
        {
          opacity: 0,
          y: 60,
          rotationX: -15,
          transformOrigin: "center center",
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          ease: "power3.out",
        }
      )
        .fromTo(
          descriptionRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        )
        .fromTo(
          // ✅ Fix 4: querySelectorAll on typed ref
          buttonsRef.current
            ? Array.from(buttonsRef.current.querySelectorAll("button"))
            : [],
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "back.out(1.2)",
          },
          "-=0.5"
        );

      gsap.fromTo(
        bgImageRef.current,
        { scale: 1.1, opacity: 0.8 },
        { scale: 1, opacity: 1, duration: 2.5, ease: "power2.out" }
      );

      gsap.fromTo(
        statItemsRef.current.filter(Boolean),
        { opacity: 0, y: 50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "elastic.out(1, 0.6)",
          scrollTrigger: {
            trigger: statsContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.to(bgImageRef.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroContentRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, heroContentRef);

    return () => ctx.revert();
  }, []);

  // Stat icon hover animations
  useEffect(() => {
    const iconCircles = document.querySelectorAll("[data-stat-icon]");
    // ✅ Fix 5: handlers typed with interface
    const handlers: EventHandler[] = [];

    iconCircles.forEach((circle) => {
      gsap.set(circle, { transformOrigin: "center center" });
      const svg = circle.querySelector("svg");

      const onEnter = () => {
        gsap.to(circle, {
          duration: 0.5,
          scale: 1.15,
          borderColor: COLORS.gold,
          boxShadow: "0 8px 24px rgba(200, 169, 81, 0.3)",
          ease: "back.out(1.5)",
          overwrite: "auto",
        });
        if (svg) {
          gsap.to(svg, {
            duration: 0.5,
            rotationZ: 360,
            ease: "back.out(1.5)",
            overwrite: "auto",
          });
        }
      };

      const onLeave = () => {
        gsap.to(circle, {
          duration: 0.4,
          scale: 1,
          borderColor: "rgba(255, 255, 255, 0.2)",
          boxShadow: "0 0px 0px rgba(200, 169, 81, 0)",
          ease: "power2.out",
          overwrite: "auto",
        });
        if (svg) {
          gsap.to(svg, {
            duration: 0.4,
            rotationZ: 0,
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
    <Box
      component="section"
      ref={heroContentRef}
      sx={{
        position: "relative",
        background: COLORS.white,
        overflow: "hidden",
      }}
    >
      {/* HERO MAIN SECTION */}
      <Box
        ref={bgImageRef}
        sx={{
          position: "relative",
          width: "100%",
          minHeight: { xs: "auto", md: "650px", lg: "720px" },
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=90')",
          backgroundSize: "cover",
          backgroundPosition: "center right",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* White gradient overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: {
              xs: "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.75) 100%)",
              md: `linear-gradient(
                90deg,
                rgba(255, 255, 255, 0.98) 0%,
                rgba(255, 255, 255, 0.92) 20%,
                rgba(255, 255, 255, 0.7) 35%,
                rgba(255, 255, 255, 0.3) 50%,
                rgba(255, 255, 255, 0.05) 65%,
                rgba(255, 255, 255, 0) 80%
              )`,
            },
            zIndex: 1,
          }}
        />

        {/* Top & bottom subtle gradients */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.15) 0%,
              transparent 12%,
              transparent 88%,
              rgba(255, 255, 255, 0.1) 100%
            )`,
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            zIndex: 3,
            py: { xs: 6, md: 8 },
          }}
        >
          <Grid container>
            <Grid size={{ xs: 12, md: 7, lg: 6 }}>
              {/* Welcome Badge */}
              <Box
                ref={badgeRef}
                sx={{
                  display: "inline-block",
                  mb: 3,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: COLORS.primaryHover,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    background:
                      "linear-gradient(135deg, rgba(200, 169, 81, 0.15), rgba(26, 35, 126, 0.1))",
                    px: 2.5,
                    py: 1,
                    borderRadius: "50px",
                    border: "1px solid rgba(200, 169, 81, 0.3)",
                    width: "fit-content",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Welcome to 1 Conveyancing
                </Typography>
              </Box>

              {/* Main Heading */}
              <Typography
                ref={headingRef}
                component="h1"
                sx={{
                  fontSize: {
                    xs: "2.5rem",
                    sm: "3rem",
                    md: "3.5rem",
                    lg: "4rem",
                  },
                  fontWeight: 700,
                  color: COLORS.primary,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  mb: 3,
                  textShadow: "0 2px 20px rgba(255, 255, 255, 0.5)",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Property Transactions <br />
                Managed. <br />
                Relationships Built.
              </Typography>

              {/* Description */}
              <Typography
                ref={descriptionRef}
                sx={{
                  fontSize: { xs: "0.95rem", md: "1.05rem" },
                  color: COLORS.textSecondary,
                  lineHeight: 1.7,
                  mb: 4,
                  maxWidth: "500px",
                  fontWeight: 500,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Specialist sales progression and conveyancing support ensuring
                your property transaction moves smoothly from offer to
                completion.
              </Typography>

              {/* CTA Buttons */}
              {/* ✅ Fix 6: Stack changed to Box with ref for querySelectorAll */}
              <Box ref={buttonsRef}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{ mt: 4 }}
                >
                  <Button
                    variant="contained"
                    endIcon={<HiArrowRight />}
                    sx={{
                      background: COLORS.primary,
                      color: COLORS.white,
                      px: 3.5,
                      py: 1.5,
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      borderRadius: "8px",
                      textTransform: "none",
                      boxShadow: "0 8px 25px rgba(10, 21, 53, 0.25)",
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
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                        transition: "left 0.5s ease",
                      },
                      "&:hover": {
                        background: COLORS.primaryHover,
                        transform: "translateY(-4px)",
                        boxShadow: "0 16px 40px rgba(10, 21, 53, 0.45)",
                        "&::before": { left: "100%" },
                      },
                      transition:
                        "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                  >
                    Book a Consultation
                  </Button>

                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: COLORS.primary,
                      color: COLORS.primary,
                      borderWidth: "1.5px",
                      px: 3.5,
                      py: 1.5,
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      borderRadius: "8px",
                      textTransform: "none",
                      background: "rgba(255, 255, 255, 0.7)",
                      backdropFilter: "blur(10px)",
                      position: "relative",
                      overflow: "hidden",
                      fontFamily: "'Inter', sans-serif",
                      "&:hover": {
                        borderColor: COLORS.primaryHover,
                        borderWidth: "1.5px",
                        background: "rgba(255, 255, 255, 0.95)",
                        transform: "translateY(-4px)",
                        boxShadow: "0 12px 32px rgba(10, 21, 53, 0.2)",
                      },
                      transition:
                        "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                  >
                    Learn More
                  </Button>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* STATS SECTION */}
      <Box
        ref={statsContainerRef}
        sx={{
          background: COLORS.primary,
          py: { xs: 4, md: 5 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial gradient backgrounds */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(circle at 20% 50%, rgba(200, 169, 81, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(200, 169, 81, 0.03) 0%, transparent 50%)
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
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(200, 169, 81, 0.4) 50%, transparent 100%)",
          }}
        />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={{ xs: 3, md: 2 }}>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const isLast = index === stats.length - 1;

              return (
                <Grid size={{ xs: 6, md: 3 }} key={index}>
                  <Box
                    // ✅ Fix 7: ref callback typed correctly
                    ref={(el: HTMLDivElement | null) => {
                      statItemsRef.current[index] = el;
                    }}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      gap: 1.5,
                      position: "relative",
                      "&::after": !isLast
                        ? {
                            content: '""',
                            position: "absolute",
                            right: { xs: 0, md: "-8px" },
                            top: "20%",
                            bottom: "20%",
                            width: "1px",
                            background: "rgba(255, 255, 255, 0.08)",
                            display: { xs: "none", md: "block" },
                          }
                        : {},
                    }}
                  >
                    {/* Icon Circle */}
                    <Box
                      data-stat-icon
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        border: "1.5px solid rgba(255, 255, 255, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 1,
                        cursor: "pointer",
                        background: "rgba(255, 255, 255, 0.02)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <Icon size={26} color={COLORS.white} />
                    </Box>

                    {/* Value */}
                    <Typography
                      sx={{
                        fontSize: { xs: "1.75rem", md: "2.25rem" },
                        fontWeight: 700,
                        color: COLORS.white,
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      {stat.value}
                    </Typography>

                    {/* Label */}
                    <Typography
                      sx={{
                        fontSize: { xs: "0.75rem", md: "0.85rem" },
                        color: "rgba(255, 255, 255, 0.65)",
                        fontWeight: 500,
                        letterSpacing: "0.02em",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}