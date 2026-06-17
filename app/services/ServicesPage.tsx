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
import { HiArrowRight } from "react-icons/hi2";
import { IoChevronForward } from "react-icons/io5";
import {
  PiHouseLineLight,
  PiLinkSimpleLight,
  PiUsersThreeLight,
  PiBankLight,
  PiFileTextLight,
  PiCheckCircleLight,
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

const services = [
  {
    icon: PiHouseLineLight,
    title: "Sales Progression",
    description:
      "We manage your transaction from instruction to completion, ensuring every step stays on track.",
  },
  {
    icon: PiLinkSimpleLight,
    title: "Chain Management",
    description:
      "We monitor the entire chain to identify issues early and minimise delays.",
  },
  {
    icon: PiUsersThreeLight,
    title: "Buyer & Seller Liaison",
    description:
      "We communicate with all parties to ensure a smooth and stress-free transaction.",
  },
  {
    icon: PiBankLight,
    title: "Mortgage Coordination",
    description:
      "We work with lenders and brokers to keep mortgage approvals and funding on schedule.",
  },
  {
    icon: PiFileTextLight,
    title: "Documentation Support",
    description:
      "Assistance with document collection, compliance and verification to keep your transaction moving.",
  },
  {
    icon: PiCheckCircleLight,
    title: "Completion Management",
    description:
      "We coordinate exchange and completion to ensure a seamless and successful finish.",
  },
];

export default function ServicesPage() {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  const servicesSectionRef = useRef<HTMLDivElement>(null);
  const serviceCardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      // Hero subtitle
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

      // Breadcrumb animation
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

  // Service cards animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const validServiceCards = serviceCardsRef.current.filter(
        (card): card is HTMLDivElement => card !== null
      );
      if (validServiceCards.length > 0) {
        gsap.fromTo(
          validServiceCards,
          { opacity: 0, y: 60, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: {
              each: 0.12,
              from: "start",
            },
            ease: "power3.out",
            scrollTrigger: {
              trigger: validServiceCards[0],
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, servicesSectionRef);

    return () => ctx.revert();
  }, []);

  // Service card hover animations
  useEffect(() => {
    const cards = document.querySelectorAll("[data-service-card]");
    const handlers: {
      card: Element;
      onEnter: () => void;
      onLeave: () => void;
    }[] = [];

    cards.forEach((card) => {
      const iconCircle = card.querySelector("[data-icon-circle]");
      const icon = iconCircle?.querySelector("svg") as SVGSVGElement | null;
      const arrowBox = card.querySelector("[data-arrow]");
      const arrowIcon = arrowBox?.querySelector("svg") as SVGSVGElement | null;

      const onEnter = () => {
        gsap.to(card, {
          duration: 0.5,
          y: -8,
          boxShadow: "0 20px 50px rgba(10, 21, 53, 0.15)",
          borderColor: "rgba(200, 169, 81, 0.4)",
          ease: "power3.out",
          overwrite: "auto",
        });
        gsap.to(iconCircle, {
          duration: 0.5,
          scale: 1.1,
          borderColor: COLORS.gold,
          background: "rgba(200, 169, 81, 0.1)",
          ease: "back.out(1.5)",
          overwrite: "auto",
        });
        if (icon) {
          gsap.to(icon, {
            duration: 0.6,
            rotationZ: 360,
            ease: "back.out(1.5)",
            overwrite: "auto",
          });
        }
        gsap.to(arrowBox, {
          duration: 0.4,
          scale: 1.15,
          background: COLORS.gold,
          borderColor: COLORS.gold,
          ease: "back.out(1.5)",
          overwrite: "auto",
        });
        if (arrowIcon) {
          gsap.to(arrowIcon, {
            duration: 0.4,
            x: 4,
            color: COLORS.white,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      };

      const onLeave = () => {
        gsap.to(card, {
          duration: 0.4,
          y: 0,
          boxShadow: "0 4px 16px rgba(10, 21, 53, 0.05)",
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
        gsap.to(arrowBox, {
          duration: 0.4,
          scale: 1,
          background: "transparent",
          borderColor: "rgba(200, 169, 81, 0.3)",
          ease: "power2.out",
          overwrite: "auto",
        });
        if (arrowIcon) {
          gsap.to(arrowIcon, {
            duration: 0.4,
            x: 0,
            color: COLORS.gold,
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
              rgba(10, 21, 53, 0.95) 0%,
              rgba(10, 21, 53, 0.85) 40%,
              rgba(10, 21, 53, 0.55) 70%,
              rgba(10, 21, 53, 0.3) 100%
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
            Our Services
          </Typography>

          <Typography
            ref={heroSubtitleRef}
            sx={{
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              color: "rgba(255, 255, 255, 0.85)",
              lineHeight: 1.6,
              maxWidth: "480px",
              fontWeight: 400,
              mb: 2.5,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Comprehensive support at every stage of your property transaction.
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
              Services
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* SERVICES GRID SECTION */}
      <Box
        ref={servicesSectionRef}
        sx={{
          background: COLORS.bgLight,
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
              radial-gradient(circle at 10% 20%, rgba(200, 169, 81, 0.04) 0%, transparent 50%),
              radial-gradient(circle at 90% 80%, rgba(10, 21, 53, 0.03) 0%, transparent 50%)
            `,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <Container
          maxWidth="xl"
          sx={{ position: "relative", zIndex: 1 }}
        >
          <Grid container spacing={{ xs: 3, md: 3.5 }}>
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <Box
                    ref={(el: HTMLDivElement | null) => {
                      serviceCardsRef.current[index] = el;
                    }}
                    data-service-card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      p: { xs: 3, md: 3.5 },
                      background: COLORS.white,
                      border: "1px solid rgba(10, 21, 53, 0.06)",
                      borderRadius: "14px",
                      boxShadow: "0 4px 16px rgba(10, 21, 53, 0.05)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      position: "relative",
                      overflow: "hidden",
                      minHeight: { xs: "260px", md: "280px" },
                    }}
                  >
                    {/* Top section - Icon + Title */}
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ mb: 2.5, alignItems: "center" }}
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

                      {/* Title */}
                      <Typography
                        sx={{
                          fontSize: { xs: "1.05rem", md: "1.15rem" },
                          fontWeight: 700,
                          color: COLORS.primary,
                          lineHeight: 1.3,
                          fontFamily: "'Playfair Display', serif",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {service.title}
                      </Typography>
                    </Stack>

                    {/* Description */}
                    <Typography
                      sx={{
                        fontSize: { xs: "0.875rem", md: "0.92rem" },
                        color: COLORS.textMuted,
                        lineHeight: 1.7,
                        fontWeight: 400,
                        fontFamily: "'Inter', sans-serif",
                        flex: 1,
                        mb: 3,
                      }}
                    >
                      {service.description}
                    </Typography>

                    {/* Arrow Button */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: "auto",
                      }}
                    >
                      <Box
                        data-arrow
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          border: "1.5px solid rgba(200, 169, 81, 0.3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.3s ease",
                          background: "transparent",
                        }}
                      >
                        <HiArrowRight size={16} color={COLORS.gold} />
                      </Box>
                    </Box>
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