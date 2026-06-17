"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Stack,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi2";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Our Process", href: "/process" },
  { name: "Team", href: "/team" },
  { name: "Insights", href: "/insights" },
  { name: "Contact Us", href: "/contact" },
];

export default function NavbarPremium() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const navLinksRef = useRef<(HTMLDivElement | null)[]>([]);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const ctaButtonRef = useRef<HTMLButtonElement | null>(null);
  const appBarRef = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const drawerContentRef = useRef<HTMLDivElement | null>(null);
  const hasAnimated = useRef(false);

  // ═══════════ SCROLL HANDLER ═══════════
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ═══════════ SCROLL NAVBAR SHADOW ═══════════
  useEffect(() => {
    if (appBarRef.current) {
      gsap.to(appBarRef.current, {
        duration: 0.5,
        boxShadow: scrolled
          ? "0 8px 48px rgba(10, 21, 53, 0.12), 0 2px 12px rgba(200, 169, 81, 0.08)"
          : "none",
        ease: "power2.out",
      });
    }
  }, [scrolled]);

  // ═══════════ INITIAL ENTRANCE ANIMATIONS ═══════════
  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      const masterTL = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      // 1) Navbar slides down
      masterTL.fromTo(
        appBarRef.current,
        { y: -120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1 }
      );

      // 2) Logo 3D flip entrance with bounce
      masterTL.fromTo(
        logoRef.current,
        {
          opacity: 0,
          scale: 0.3,
          rotateY: -180,
          x: -50,
        },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          x: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
        },
        "-=0.7"
      );

      // 3) Logo glow fade in
      if (glowRef.current) {
        masterTL.fromTo(
          glowRef.current,
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.6"
        );
      }

      // 4) Nav links wave from center
      const validNavLinks = navLinksRef.current.filter(
        (link): link is HTMLDivElement => link !== null
      );
      masterTL.fromTo(
        validNavLinks,
        { opacity: 0, y: -35, scale: 0.85, rotateX: -15 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.7,
          stagger: {
            each: 0.06,
            from: "center",
            ease: "power2.out",
          },
          ease: "back.out(1.4)",
        },
        "-=0.6"
      );

      // 5) CTA button slides in
      masterTL.fromTo(
        ctaButtonRef.current,
        { opacity: 0, x: 60, scale: 0.8 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.9,
          ease: "back.out(1.5)",
        },
        "-=0.4"
      );

      // 6) Continuous logo glow pulse (infinite)
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0.3,
          scale: 1.3,
          duration: 2.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.5,
        });
      }
    }, appBarRef);

    return () => ctx.revert();
  }, []);

  // ═══════════ NAV LINK HOVER ANIMATIONS ═══════════
  useEffect(() => {
    const navItems = document.querySelectorAll("[data-nav-link]");

    const enterHandlers: (() => void)[] = [];
    const leaveHandlers: (() => void)[] = [];

    navItems.forEach((item, i) => {
      const underline = item.querySelector("[data-underline]");
      const dot = item.querySelector("[data-dot]");
      const text = item.querySelector("p");

      const enterHandler = () => {
        gsap.to(underline, {
          duration: 0.4,
          scaleX: 1,
          opacity: 1,
          ease: "power3.out",
          overwrite: "auto",
        });
        gsap.to(text, {
          duration: 0.25,
          color: "#0a1535",
          y: -2,
          ease: "power2.out",
          overwrite: "auto",
        });
        if (dot) {
          gsap.to(dot, {
            duration: 0.35,
            scale: 1,
            opacity: 1,
            ease: "back.out(2.5)",
            overwrite: "auto",
          });
        }
        gsap.to(item, {
          duration: 0.3,
          background: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 4px 16px rgba(10, 21, 53, 0.06)",
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const leaveHandler = () => {
        const isActive = item.getAttribute("data-active") === "true";
        gsap.to(underline, {
          duration: 0.3,
          scaleX: isActive ? 1 : 0,
          opacity: isActive ? 1 : 0,
          ease: "power2.inOut",
          overwrite: "auto",
        });
        gsap.to(text, {
          duration: 0.25,
          color: isActive ? "#0a1535" : "#5a6478",
          y: 0,
          ease: "power2.out",
          overwrite: "auto",
        });
        if (dot) {
          gsap.to(dot, {
            duration: 0.2,
            scale: isActive ? 1 : 0,
            opacity: isActive ? 1 : 0,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
        gsap.to(item, {
          duration: 0.3,
          background: isActive ? "rgba(255, 255, 255, 0.9)" : "transparent",
          boxShadow: isActive
            ? "0 2px 12px rgba(10, 21, 53, 0.06)"
            : "none",
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      enterHandlers.push(enterHandler);
      leaveHandlers.push(leaveHandler);

      item.addEventListener("mouseenter", enterHandler);
      item.addEventListener("mouseleave", leaveHandler);
    });

    return () => {
      navItems.forEach((item, i) => {
        item.removeEventListener("mouseenter", enterHandlers[i]);
        item.removeEventListener("mouseleave", leaveHandlers[i]);
      });
    };
  }, [isMobile, pathname]);

  // ═══════════ CTA BUTTON HOVER ═══════════
  useEffect(() => {
    const btn = ctaButtonRef.current;
    if (!btn) return;

    const handleEnter = () => {
      gsap.to(btn, {
        duration: 0.4,
        scale: 1.06,
        y: -3,
        boxShadow:
          "0 20px 50px rgba(10, 21, 53, 0.35), 0 0 25px rgba(200, 169, 81, 0.15)",
        ease: "power2.out",
      });
      const arrow = btn.querySelector(".btn-arrow");
      if (arrow) {
        gsap.to(arrow, {
          x: 5,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleLeave = () => {
      gsap.to(btn, {
        duration: 0.35,
        scale: 1,
        y: 0,
        boxShadow: "0 4px 20px rgba(10, 21, 53, 0.15)",
        ease: "power2.out",
      });
      const arrow = btn.querySelector(".btn-arrow");
      if (arrow) {
        gsap.to(arrow, {
          x: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    btn.addEventListener("mouseenter", handleEnter);
    btn.addEventListener("mouseleave", handleLeave);

    return () => {
      btn.removeEventListener("mouseenter", handleEnter);
      btn.removeEventListener("mouseleave", handleLeave);
    };
  }, [isMobile]);

  // ═══════════ LOGO HOVER ═══════════
  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    const handleEnter = () => {
      gsap.to(logo, {
        duration: 0.5,
        scale: 1.08,
        y: -3,
        ease: "back.out(1.5)",
      });
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          duration: 0.4,
          opacity: 0.8,
          scale: 1.4,
          ease: "power2.out",
        });
      }
    };

    const handleLeave = () => {
      gsap.to(logo, {
        duration: 0.4,
        scale: 1,
        y: 0,
        ease: "power2.out",
      });
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          duration: 0.4,
          opacity: 0.6,
          scale: 1,
          ease: "power2.out",
        });
      }
    };

    logo.addEventListener("mouseenter", handleEnter);
    logo.addEventListener("mouseleave", handleLeave);

    return () => {
      logo.removeEventListener("mouseenter", handleEnter);
      logo.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  // ═══════════ MOBILE DRAWER TOGGLE ═══════════
  const handleDrawerToggle = useCallback(() => {
    if (!mobileOpen) {
      setMobileOpen(true);
      requestAnimationFrame(() => {
        setTimeout(() => {
          const items = document.querySelectorAll(".mobile-drawer-item");
          gsap.fromTo(
            items,
            { opacity: 0, x: 80, scale: 0.9 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.55,
              ease: "power3.out",
              stagger: 0.055,
            }
          );

          const mobileBtn = document.querySelector(".mobile-cta-section");
          if (mobileBtn) {
            gsap.fromTo(
              mobileBtn,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "back.out(1.3)",
                delay: 0.45,
              }
            );
          }

          const mobileLogo = document.querySelector(".mobile-drawer-logo");
          if (mobileLogo) {
            gsap.fromTo(
              mobileLogo,
              { opacity: 0, scale: 0.5, rotateY: -90 },
              {
                opacity: 1,
                scale: 1,
                rotateY: 0,
                duration: 0.8,
                ease: "back.out(1.7)",
              }
            );
          }
        }, 120);
      });
    } else {
      setMobileOpen(false);
    }
  }, [mobileOpen]);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════ */}
      {/* ═══════════ APPBAR ═══════════ */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <AppBar
        ref={appBarRef}
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled
            ? "rgba(255, 255, 255, 0.88)"
            : "rgba(255, 255, 255, 1)",
          backdropFilter: scrolled ? "blur(28px) saturate(200%)" : "none",
          WebkitBackdropFilter: scrolled
            ? "blur(28px) saturate(200%)"
            : "none",
          borderBottom: scrolled
            ? "1px solid rgba(10, 21, 53, 0.05)"
            : "1px solid rgba(10, 21, 53, 0.03)",
          transition:
            "background 0.5s ease, border-bottom 0.5s ease, backdrop-filter 0.5s ease",
          zIndex: 1300,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: { xs: 1, md: 1.2, lg: 1.5 },
              minHeight: {
                xs: "78px",
                sm: "85px",
                md: "105px",
                lg: "115px",
              },
              gap: 2,
            }}
            disableGutters
          >
            {/* ═══════════════════════════════════════ */}
            {/* ═══════════ LOGO ═══════════ */}
            {/* ═══════════════════════════════════════ */}
            <Link href="/" style={{ textDecoration: "none" }}>
              <Box
                ref={logoRef}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  position: "relative",
                  perspective: "800px",
                  height: {
                    xs: "62px",
                    sm: "75px",
                    md: "90px",
                    lg: "100px",
                    xl: "110px",
                  },
                  minWidth: {
                    xs: "62px",
                    sm: "75px",
                    md: "90px",
                    lg: "100px",
                    xl: "110px",
                  },
                }}
              >
                {/* Glow behind logo */}
                <Box
                  ref={glowRef}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "140%",
                    height: "140%",
                    background:
                      "radial-gradient(circle, rgba(200, 169, 81, 0.18) 0%, rgba(200, 169, 81, 0.06) 40%, transparent 70%)",
                    borderRadius: "50%",
                    pointerEvents: "none",
                    opacity: 0.6,
                    filter: "blur(4px)",
                  }}
                />

                {/* Outer ring */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "115%",
                    height: "115%",
                    borderRadius: "50%",
                    border: "1.5px solid rgba(200, 169, 81, 0.1)",
                    pointerEvents: "none",
                    opacity: scrolled ? 0 : 0.6,
                    transition: "opacity 0.5s ease",
                  }}
                />

                <Image
                  src="/logo.png"
                  alt="Premium Consulting Logo"
                  width={300}
                  height={300}
                  priority
                  quality={100}
                  sizes="(max-width: 600px) 62px, (max-width: 900px) 75px, (max-width: 1200px) 90px, 110px"
                  style={{
                    width: "auto",
                    height: "100%",
                    objectFit: "contain",
                    filter:
                      "drop-shadow(0 4px 12px rgba(10, 21, 53, 0.1)) drop-shadow(0 1px 3px rgba(200, 169, 81, 0.08))",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              </Box>
            </Link>

            {/* ═══════════════════════════════════════ */}
            {/* ═══════════ DESKTOP NAVIGATION ═══════════ */}
            {/* ═══════════════════════════════════════ */}
            {!isMobile && (
              <Stack
                direction="row"
                spacing={0.25}
                sx={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: scrolled
                    ? "rgba(245, 247, 251, 0.7)"
                    : "rgba(245, 247, 251, 0.5)",
                  borderRadius: "18px",
                  padding: "7px 12px",
                  border: "1px solid rgba(10, 21, 53, 0.04)",
                  backdropFilter: "blur(12px)",
                  transition: "background 0.4s ease",
                }}
              >
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      style={{ textDecoration: "none" }}
                    >
                      <Box
                        ref={(el: HTMLDivElement | null) => {
                          navLinksRef.current[index] = el;
                        }}
                        data-nav-link
                        data-active={isActive}
                        sx={{
                          position: "relative",
                          px: { md: 1.5, lg: 2, xl: 2.2 },
                          py: 1.1,
                          cursor: "pointer",
                          borderRadius: "12px",
                          background: isActive
                            ? "rgba(255, 255, 255, 0.95)"
                            : "transparent",
                          boxShadow: isActive
                            ? "0 3px 14px rgba(10, 21, 53, 0.07), 0 1px 4px rgba(200, 169, 81, 0.05)"
                            : "none",
                          transition:
                            "background 0.3s ease, box-shadow 0.3s ease",
                        }}
                      >
                        <Typography
                          component="p"
                          sx={{
                            fontSize: {
                              md: "0.82rem",
                              lg: "0.88rem",
                              xl: "0.92rem",
                            },
                            fontWeight: isActive ? 700 : 500,
                            color: isActive ? "#0a1535" : "#5a6478",
                            fontFamily: "'Inter', sans-serif",
                            letterSpacing: "0.015em",
                            whiteSpace: "nowrap",
                            transition: "color 0.3s ease",
                            userSelect: "none",
                          }}
                        >
                          {link.name}
                        </Typography>

                        {/* Active dot */}
                        <Box
                          data-dot
                          sx={{
                            position: "absolute",
                            top: "5px",
                            right: "7px",
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background:
                              "linear-gradient(135deg, #c8a951, #e0c76a)",
                            boxShadow: "0 0 10px rgba(200, 169, 81, 0.5)",
                            transform: isActive ? "scale(1)" : "scale(0)",
                            opacity: isActive ? 1 : 0,
                            transition: "all 0.3s ease",
                          }}
                        />

                        {/* Underline */}
                        <Box
                          data-underline
                          sx={{
                            position: "absolute",
                            bottom: "5px",
                            left: "18%",
                            right: "18%",
                            height: "2.5px",
                            background:
                              "linear-gradient(90deg, #c8a951, #d4b365, #c8a951)",
                            borderRadius: "4px",
                            transformOrigin: "center",
                            transform: isActive ? "scaleX(1)" : "scaleX(0)",
                            opacity: isActive ? 1 : 0,
                            boxShadow: "0 2px 12px rgba(200, 169, 81, 0.35)",
                            transition:
                              "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                          }}
                        />
                      </Box>
                    </Link>
                  );
                })}
              </Stack>
            )}

            {/* ═══════════════════════════════════════ */}
            {/* ═══════════ CTA / HAMBURGER ═══════════ */}
            {/* ═══════════════════════════════════════ */}
            {!isMobile ? (
              <Button
                ref={ctaButtonRef}
                variant="contained"
                endIcon={
                  <Box
                    className="btn-arrow"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <HiArrowRight size={18} />
                  </Box>
                }
                sx={{
                  background:
                    "linear-gradient(135deg, #0a1535 0%, #1a2a5e 100%)",
                  color: "#ffffff",
                  borderRadius: "14px",
                  px: { md: 3, lg: 3.5, xl: 4 },
                  py: { md: 1.3, lg: 1.5 },
                  fontSize: { md: "0.85rem", lg: "0.9rem" },
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: "0 4px 20px rgba(10, 21, 53, 0.15)",
                  position: "relative",
                  overflow: "hidden",
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.02em",
                  border: "1px solid rgba(200, 169, 81, 0.15)",
                  flexShrink: 0,
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(90deg, transparent, rgba(200, 169, 81, 0.2), transparent)",
                    transition: "left 0.7s ease",
                  },
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #0d1b45 0%, #1e3270 100%)",
                    "&::before": {
                      left: "100%",
                    },
                  },
                  transition: "all 0.4s ease",
                }}
              >
                Book Consultation
              </Button>
            ) : (
              <IconButton
                onClick={handleDrawerToggle}
                sx={{
                  color: "#0a1535",
                  width: 52,
                  height: 52,
                  borderRadius: "14px",
                  background: "rgba(10, 21, 53, 0.04)",
                  border: "1px solid rgba(10, 21, 53, 0.06)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "rgba(10, 21, 53, 0.08)",
                    transform: "scale(1.05)",
                  },
                  "&:active": {
                    transform: "scale(0.95)",
                  },
                }}
              >
                <FaBars size={24} />
              </IconButton>
            )}
          </Toolbar>
        </Container>

        {/* Bottom gold accent line on scroll */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: scrolled
              ? "linear-gradient(90deg, transparent 0%, rgba(200, 169, 81, 0.25) 15%, rgba(200, 169, 81, 0.5) 50%, rgba(200, 169, 81, 0.25) 85%, transparent 100%)"
              : "transparent",
            transition: "background 0.6s ease",
          }}
        />
      </AppBar>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* ═══════════ MOBILE DRAWER ═══════════ */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          zIndex: 1400,
          "& .MuiBackdrop-root": {
            background: "rgba(10, 21, 53, 0.35)",
            backdropFilter: "blur(10px)",
          },
          "& .MuiDrawer-paper": {
            width: "90%",
            maxWidth: "400px",
            background: "linear-gradient(180deg, #ffffff 0%, #f7f8fc 100%)",
            padding: 0,
            borderLeft: "none",
            boxShadow: "-24px 0 70px rgba(10, 21, 53, 0.18)",
            overflowX: "hidden",
          },
        }}
      >
        <Box
          ref={drawerContentRef}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          }}
        >
          {/* ═══════════ DRAWER HEADER ═══════════ */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 3,
              pb: 2.5,
              borderBottom: "1px solid rgba(10, 21, 53, 0.05)",
              background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(12px)",
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          >
            <Box
              className="mobile-drawer-logo"
              sx={{
                height: "60px",
                display: "flex",
                alignItems: "center",
                perspective: "600px",
              }}
            >
              <Image
                src="/logo.png"
                alt="Logo"
                width={200}
                height={200}
                quality={100}
                style={{
                  width: "auto",
                  height: "100%",
                  objectFit: "contain",
                  filter:
                    "drop-shadow(0 2px 6px rgba(10, 21, 53, 0.08))",
                }}
              />
            </Box>
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                color: "#0a1535",
                width: 46,
                height: 46,
                borderRadius: "13px",
                background: "rgba(10, 21, 53, 0.04)",
                border: "1px solid rgba(10, 21, 53, 0.06)",
                transition: "all 0.4s ease",
                "&:hover": {
                  background: "rgba(10, 21, 53, 0.08)",
                  transform: "rotate(90deg)",
                },
              }}
            >
              <FaTimes size={22} />
            </IconButton>
          </Box>

          {/* ═══════════ DRAWER NAV LINKS ═══════════ */}
          <Box sx={{ flex: 1, p: 2.5, pt: 3 }}>
            <Typography
              className="mobile-drawer-item"
              sx={{
                fontSize: "0.68rem",
                fontWeight: 700,
                color: "#9aa3b4",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                px: 2,
                mb: 2,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Navigation
            </Typography>

            <List sx={{ p: 0 }}>
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <ListItem
                    key={link.name}
                    disablePadding
                    sx={{ mb: 0.5 }}
                    className="mobile-drawer-item"
                  >
                    <Link
                      href={link.href}
                      style={{
                        textDecoration: "none",
                        width: "100%",
                        color: "inherit",
                      }}
                      onClick={handleDrawerToggle}
                    >
                      <ListItemButton
                        sx={{
                          borderRadius: "14px",
                          py: 1.6,
                          px: 2,
                          background: isActive
                            ? "linear-gradient(135deg, rgba(10, 21, 53, 0.07) 0%, rgba(200, 169, 81, 0.09) 100%)"
                            : "transparent",
                          borderLeft: isActive
                            ? "3.5px solid #c8a951"
                            : "3.5px solid transparent",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            background: isActive
                              ? "linear-gradient(135deg, rgba(10, 21, 53, 0.09) 0%, rgba(200, 169, 81, 0.12) 100%)"
                              : "rgba(10, 21, 53, 0.04)",
                            borderLeftColor: "#c8a951",
                            transform: "translateX(6px)",
                          },
                        }}
                      >
                        {/* Number indicator */}
                        <Typography
                          sx={{
                            fontSize: "0.68rem",
                            fontWeight: 700,
                            color: isActive ? "#c8a951" : "#c0c7d4",
                            fontFamily: "'Inter', sans-serif",
                            mr: 2,
                            minWidth: "22px",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </Typography>

                        <ListItemText
                          primary={link.name}
                          slotProps={{
                            primary: {
                              sx: {
                                fontSize: "0.98rem",
                                fontWeight: isActive ? 700 : 500,
                                color: isActive ? "#0a1535" : "#4a5568",
                                fontFamily: "'Inter', sans-serif",
                                letterSpacing: "0.01em",
                              },
                            },
                          }}
                        />

                        {isActive ? (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Box
                              sx={{
                                width: "9px",
                                height: "9px",
                                borderRadius: "50%",
                                background:
                                  "linear-gradient(135deg, #c8a951, #e0c76a)",
                                boxShadow:
                                  "0 0 12px rgba(200, 169, 81, 0.45)",
                              }}
                            />
                          </Box>
                        ) : (
                          <HiArrowRight
                            size={15}
                            style={{
                              color: "#c0c7d4",
                              transition: "all 0.3s ease",
                            }}
                          />
                        )}
                      </ListItemButton>
                    </Link>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          {/* ═══════════ DRAWER BOTTOM CTA ═══════════ */}
          <Box
            className="mobile-cta-section"
            sx={{
              p: 3,
              borderTop: "1px solid rgba(10, 21, 53, 0.05)",
              background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(12px)",
            }}
          >
            {/* Info card */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 2.5,
                px: 1,
              }}
            >
              <Box
                sx={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "11px",
                  background:
                    "linear-gradient(135deg, rgba(200, 169, 81, 0.16), rgba(200, 169, 81, 0.06))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(200, 169, 81, 0.2)",
                  flexShrink: 0,
                }}
              >
                <Typography sx={{ fontSize: "0.9rem" }}>✦</Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "#0a1535",
                    fontFamily: "'Inter', sans-serif",
                    lineHeight: 1.3,
                  }}
                >
                  Ready to get started?
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.72rem",
                    color: "#7a8499",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Schedule a free consultation today
                </Typography>
              </Box>
            </Box>

            {/* CTA Button */}
            <Button
              fullWidth
              variant="contained"
              endIcon={<HiArrowRight size={18} />}
              onClick={handleDrawerToggle}
              sx={{
                background:
                  "linear-gradient(135deg, #0a1535 0%, #1a2a5e 100%)",
                color: "#ffffff",
                borderRadius: "14px",
                py: 1.7,
                fontSize: "0.96rem",
                fontWeight: 600,
                textTransform: "none",
                fontFamily: "'Inter', sans-serif",
                boxShadow: "0 8px 28px rgba(10, 21, 53, 0.22)",
                border: "1px solid rgba(200, 169, 81, 0.15)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(200, 169, 81, 0.2), transparent)",
                  transition: "left 0.7s ease",
                },
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #0d1b45 0%, #1e3270 100%)",
                  boxShadow: "0 14px 36px rgba(10, 21, 53, 0.32)",
                  "&::before": {
                    left: "100%",
                  },
                },
                "&:active": {
                  transform: "scale(0.98)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Book Consultation
            </Button>

            {/* Footer text */}
            <Typography
              sx={{
                fontSize: "0.64rem",
                color: "#9aa3b4",
                textAlign: "center",
                mt: 2,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.03em",
              }}
            >
              No commitment required • Free initial consultation
            </Typography>
          </Box>
        </Box>
      </Drawer>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* ═══════════ SPACER ═══════════ */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Toolbar
        sx={{
          minHeight: {
            xs: "78px",
            sm: "85px",
            md: "105px",
            lg: "115px",
          },
        }}
      />
    </>
  );
}