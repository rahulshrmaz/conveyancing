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
import { HiArrowRight } from "react-icons/hi2";
import { IoChevronForward } from "react-icons/io5";
import {
  PiUserLight,
  PiClockCountdownLight,
  PiSealCheckLight,
  PiHandshakeLight,
} from "react-icons/pi";
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

const features = [
  {
    icon: PiUserLight,
    title: "Client Focused",
    description: "Personalised support and clear communication.",
  },
  {
    icon: PiClockCountdownLight,
    title: "Proactive & Efficient",
    description: "We solve issues before they cause delays.",
  },
  {
    icon: PiSealCheckLight,
    title: "Industry Expertise",
    description: "Extensive knowledge of property transactions.",
  },
  {
    icon: PiHandshakeLight,
    title: "Trusted Relationships",
    description:
      "Strong connections with agents, solicitors, lenders and brokers.",
  },
];

export default function AboutPage() {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  const contentSectionRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphsRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);
  const featureCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Hero animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background image entry
      gsap.fromTo(
        bgImageRef.current,
        { scale: 1.15, opacity: 0.7 },
        { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }
      );

      // Hero title animation
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

      // Breadcrumb animation
      gsap.fromTo(
        breadcrumbRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.6,
        }
      );

      // Parallax effect
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

  // Content section animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtitle
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Title
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Paragraphs - filter out null values
      const validParagraphs = paragraphsRef.current.filter(
        (p): p is HTMLParagraphElement => p !== null
      );
      if (validParagraphs.length > 0) {
        gsap.fromTo(
          validParagraphs,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: validParagraphs[0],
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // CTA Button
      gsap.fromTo(
        ctaButtonRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ctaButtonRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Feature cards - filter out null values
      const validFeatureCards = featureCardsRef.current.filter(
        (card): card is HTMLDivElement => card !== null
      );
      if (validFeatureCards.length > 0) {
        gsap.fromTo(
          validFeatureCards,
          { opacity: 0, x: 50, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: validFeatureCards[0],
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, contentSectionRef);

    return () => ctx.revert();
  }, []);

  // Feature card hover animations
  useEffect(() => {
    const cards = document.querySelectorAll("[data-feature-card]");
    const handlers: {
      card: Element;
      onEnter: () => void;
      onLeave: () => void;
    }[] = [];

    cards.forEach((card) => {
      const iconCircle = card.querySelector("[data-icon-circle]");
      const icon = iconCircle?.querySelector("svg") as SVGSVGElement | null;

      const onEnter = () => {
        gsap.to(card, {
          duration: 0.4,
          y: -6,
          boxShadow: "0 16px 40px rgba(10, 21, 53, 0.12)",
          borderColor: "rgba(200, 169, 81, 0.3)",
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(iconCircle, {
          duration: 0.5,
          scale: 1.1,
          borderColor: COLORS.gold,
          background: "rgba(200, 169, 81, 0.08)",
          ease: "back.out(1.5)",
          overwrite: "auto",
        });
        if (icon) {
          gsap.to(icon, {
            duration: 0.5,
            rotationZ: 360,
            ease: "back.out(1.5)",
            overwrite: "auto",
          });
        }
      };

      const onLeave = () => {
        gsap.to(card, {
          duration: 0.4,
          y: 0,
          boxShadow: "0 4px 16px rgba(10, 21, 53, 0.04)",
          borderColor: "rgba(10, 21, 53, 0.06)",
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(iconCircle, {
          duration: 0.4,
          scale: 1,
          borderColor: "rgba(200, 169, 81, 0.3)",
          background: "transparent",
          ease: "power2.out",
          overwrite: "auto",
        });
        if (icon) {
          gsap.to(icon, {
            duration: 0.4,
            rotationZ: 0,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      };

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
      handlers.push({ card, onEnter, onLeave });
    });

    return () => {
      handlers.forEach(({ card, onEnter, onLeave }) => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
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
          minHeight: { xs: "280px", md: "360px", lg: "400px" },
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Background Image */}
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

        {/* Dark overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(
              90deg,
              rgba(10, 21, 53, 0.92) 0%,
              rgba(10, 21, 53, 0.85) 40%,
              rgba(10, 21, 53, 0.6) 70%,
              rgba(10, 21, 53, 0.4) 100%
            )`,
            zIndex: 1,
          }}
        />

        {/* Subtle gold accent line at bottom */}
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
          sx={{
            position: "relative",
            zIndex: 3,
            py: { xs: 4, md: 6 },
          }}
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
            About 1 Conveyancing
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
            <IoChevronForward
              size={14}
              color="rgba(255, 255, 255, 0.6)"
            />
            <Typography
              sx={{
                fontSize: "0.9rem",
                color: COLORS.gold,
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              About Us
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* CONTENT SECTION */}
      <Box
        ref={contentSectionRef}
        sx={{
          background: COLORS.white,
          py: { xs: 6, md: 10 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle background pattern */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(circle at 10% 20%, rgba(200, 169, 81, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 90% 80%, rgba(10, 21, 53, 0.02) 0%, transparent 50%)
            `,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <Container
          maxWidth="xl"
          sx={{ position: "relative", zIndex: 1 }}
        >
          <Grid container spacing={{ xs: 5, md: 8 }}>
            {/* LEFT SIDE - Content */}
            <Grid size={{ xs: 12, md: 6 }}>
              {/* Subtitle */}
              <Typography
                ref={subtitleRef}
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: COLORS.gold,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  mb: 2,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Our Approach
              </Typography>

              {/* Title */}
              <Typography
                ref={titleRef}
                component="h2"
                sx={{
                  fontSize: {
                    xs: "1.85rem",
                    sm: "2.25rem",
                    md: "2.5rem",
                    lg: "2.75rem",
                  },
                  fontWeight: 700,
                  color: COLORS.primary,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  mb: 4,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                A Smarter Way to Progress Property Transactions
              </Typography>

              {/* Paragraphs */}
              <Typography
                ref={(el: HTMLParagraphElement | null) => {
                  paragraphsRef.current[0] = el;
                }}
                sx={{
                  fontSize: { xs: "0.95rem", md: "1rem" },
                  color: COLORS.textSecondary,
                  lineHeight: 1.8,
                  mb: 3,
                  fontWeight: 400,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                At 1 Conveyancing, we specialise in sales progression and
                transaction management, ensuring a smooth, transparent and
                stress-free journey for buyers, sellers, investors, and property
                professionals.
              </Typography>

              <Typography
                ref={(el: HTMLParagraphElement | null) => {
                  paragraphsRef.current[1] = el;
                }}
                sx={{
                  fontSize: { xs: "0.95rem", md: "1rem" },
                  color: COLORS.textSecondary,
                  lineHeight: 1.8,
                  mb: 4,
                  fontWeight: 400,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                We work closely with all parties involved to identify potential
                roadblocks early, communicate clearly, and keep every
                transaction moving forward.
              </Typography>

              {/* CTA Button */}
              <Button
                ref={ctaButtonRef}
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
                  boxShadow: "0 8px 25px rgba(10, 21, 53, 0.2)",
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
                    boxShadow: "0 16px 40px rgba(10, 21, 53, 0.35)",
                    "&::before": { left: "100%" },
                  },
                  transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                Book a Consultation
              </Button>
            </Grid>

            {/* RIGHT SIDE - Feature Cards */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={2}>
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <Box
                      key={index}
                      ref={(el: HTMLDivElement | null) => {
                        featureCardsRef.current[index] = el;
                      }}
                      data-feature-card
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 2.5,
                        p: { xs: 2.5, md: 3 },
                        background: COLORS.white,
                        border: "1px solid rgba(10, 21, 53, 0.06)",
                        borderRadius: "12px",
                        boxShadow: "0 4px 16px rgba(10, 21, 53, 0.04)",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {/* Icon Circle */}
                      <Box
                        data-icon-circle
                        sx={{
                          flexShrink: 0,
                          width: 52,
                          height: 52,
                          borderRadius: "50%",
                          border: "1.5px solid rgba(200, 169, 81, 0.3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <Icon size={26} color={COLORS.gold} />
                      </Box>

                      {/* Text Content */}
                      <Box sx={{ flex: 1, pt: 0.5 }}>
                        <Typography
                          sx={{
                            fontSize: { xs: "1.05rem", md: "1.15rem" },
                            fontWeight: 700,
                            color: COLORS.primary,
                            mb: 0.5,
                            lineHeight: 1.3,
                            fontFamily: "'Playfair Display', serif",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {feature.title}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: { xs: "0.875rem", md: "0.925rem" },
                            color: COLORS.textMuted,
                            lineHeight: 1.6,
                            fontWeight: 400,
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          {feature.description}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}