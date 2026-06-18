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
  const hasAnimated = useRef(false);

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

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        appBarRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      );

      tl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.3, rotateY: -180 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
        },
        "-=0.6"
      );

      const validLinks = navLinksRef.current.filter(Boolean);
      tl.fromTo(
        validLinks,
        { opacity: 0, y: -30, scale: 0.85 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: { each: 0.06, from: "center" },
          ease: "back.out(1.4)",
        },
        "-=0.5"
      );

      tl.fromTo(
        ctaButtonRef.current,
        { opacity: 0, x: 50, scale: 0.8 },
        { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "back.out(1.5)" },
        "-=0.3"
      );
    }, appBarRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const navItems = document.querySelectorAll("[data-nav-link]");
    const handlers: { el: Element; enter: () => void; leave: () => void }[] =
      [];

    navItems.forEach((item) => {
      const underline = item.querySelector("[data-underline]");
      const text = item.querySelector("p");

      const enter = () => {
        gsap.to(underline, {
          scaleX: 1,
          opacity: 1,
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(text, { color: "#0a1535", y: -1, duration: 0.25 });
        gsap.to(item, {
          background: "rgba(255,255,255,0.9)",
          duration: 0.25,
        });
      };
      const leave = () => {
        const active = item.getAttribute("data-active") === "true";
        gsap.to(underline, {
          scaleX: active ? 1 : 0,
          opacity: active ? 1 : 0,
          duration: 0.3,
        });
        gsap.to(text, {
          color: active ? "#0a1535" : "#5a6478",
          y: 0,
          duration: 0.25,
        });
        gsap.to(item, {
          background: active ? "rgba(255,255,255,0.95)" : "transparent",
          duration: 0.25,
        });
      };

      item.addEventListener("mouseenter", enter);
      item.addEventListener("mouseleave", leave);
      handlers.push({ el: item, enter, leave });
    });

    return () =>
      handlers.forEach(({ el, enter, leave }) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
  }, [isMobile, pathname]);

  useEffect(() => {
    const btn = ctaButtonRef.current;
    if (!btn) return;
    const enter = () =>
      gsap.to(btn, {
        scale: 1.05,
        y: -2,
        boxShadow: "0 12px 35px rgba(10,21,53,0.25)",
        duration: 0.3,
      });
    const leave = () =>
      gsap.to(btn, {
        scale: 1,
        y: 0,
        boxShadow: "0 4px 20px rgba(10,21,53,0.12)",
        duration: 0.3,
      });
    btn.addEventListener("mouseenter", enter);
    btn.addEventListener("mouseleave", leave);
    return () => {
      btn.removeEventListener("mouseenter", enter);
      btn.removeEventListener("mouseleave", leave);
    };
  }, [isMobile]);

  const handleDrawerToggle = useCallback(() => {
    if (!mobileOpen) {
      setMobileOpen(true);
      requestAnimationFrame(() => {
        setTimeout(() => {
          const items = document.querySelectorAll(".mobile-drawer-item");
          gsap.fromTo(
            items,
            { opacity: 0, x: 60 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              stagger: 0.05,
              ease: "power3.out",
            }
          );
        }, 100);
      });
    } else {
      setMobileOpen(false);
    }
  }, [mobileOpen]);

  return (
    <>
      <AppBar
        ref={appBarRef}
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled
            ? "rgba(255,255,255,0.55)"
            : "rgba(255,255,255,0.65)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          borderBottom: scrolled
            ? "1px solid rgba(10,21,53,0.08)"
            : "1px solid rgba(10,21,53,0.04)",
          boxShadow: scrolled
            ? "0 4px 30px rgba(10,21,53,0.08), 0 1px 8px rgba(200,169,81,0.04)"
            : "0 1px 12px rgba(10,21,53,0.03)",
          transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 1300,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: { xs: 0.3, md: 0.4, lg: 0.5 },
              minHeight: {
                xs: "64px",
                sm: "68px",
                md: "72px",
                lg: "76px",
              },
              gap: 2,
            }}
            disableGutters
          >
            {/* ══════ LOGO - BIGGER ══════ */}
            <Link href="/" style={{ textDecoration: "none" }}>
              <Box
                ref={logoRef}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  perspective: "1000px",
                  position: "relative",
                  height: {
                    xs: "100px",
                    sm: "120px",
                    md: "150px",
                    lg: "170px",
                    xl: "185px",
                  },
                  width: {
                    xs: "100px",
                    sm: "120px",
                    md: "150px",
                    lg: "170px",
                    xl: "185px",
                  },
                  transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                  "&:hover": {
                    transform: "scale(1.06) translateY(-2px)",
                  },
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/logo.png"
                  alt="Premium Consulting Logo"
                  width={185}
                  height={185}
                  priority
                  quality={100}
                  sizes="(max-width: 640px) 100px, (max-width: 900px) 120px, (max-width: 1200px) 150px, (max-width: 1536px) 170px, 185px"
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                    filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.05))",
                  }}
                />
              </Box>
            </Link>

            {/* ══════ DESKTOP NAV ══════ */}
            {!isMobile && (
              <Stack
                direction="row"
                spacing={0.3}
                sx={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(255,255,255,0.45)",
                  borderRadius: "16px",
                  padding: "5px 10px",
                  border: "1px solid rgba(255,255,255,0.5)",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 2px 12px rgba(10,21,53,0.04)",
                  transition: "all 0.4s ease",
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
                          px: { md: 1.4, lg: 1.8, xl: 2.2 },
                          py: 0.8,
                          cursor: "pointer",
                          borderRadius: "11px",
                          background: isActive
                            ? "rgba(255,255,255,0.85)"
                            : "transparent",
                          boxShadow: isActive
                            ? "0 2px 10px rgba(10,21,53,0.06)"
                            : "none",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <Typography
                          component="p"
                          sx={{
                            fontSize: {
                              md: "0.82rem",
                              lg: "0.87rem",
                              xl: "0.92rem",
                            },
                            fontWeight: isActive ? 700 : 500,
                            color: isActive ? "#0a1535" : "#5a6478",
                            fontFamily: "'Inter', sans-serif",
                            letterSpacing: "0.01em",
                            whiteSpace: "nowrap",
                            userSelect: "none",
                          }}
                        >
                          {link.name}
                        </Typography>

                        <Box
                          data-underline
                          sx={{
                            position: "absolute",
                            bottom: "3px",
                            left: "20%",
                            right: "20%",
                            height: "2.5px",
                            background:
                              "linear-gradient(90deg, #c8a951, #d4b365, #c8a951)",
                            borderRadius: "4px",
                            transformOrigin: "center",
                            transform: isActive ? "scaleX(1)" : "scaleX(0)",
                            opacity: isActive ? 1 : 0,
                            boxShadow: "0 1px 8px rgba(200,169,81,0.3)",
                            transition:
                              "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                          }}
                        />
                      </Box>
                    </Link>
                  );
                })}
              </Stack>
            )}

            {/* ══════ CTA / HAMBURGER ══════ */}
            {!isMobile ? (
              <Button
                ref={ctaButtonRef}
                variant="contained"
                endIcon={<HiArrowRight size={17} />}
                sx={{
                  background:
                    "linear-gradient(135deg, #0a1535 0%, #162550 50%, #1a2a5e 100%)",
                  color: "#fff",
                  borderRadius: "13px",
                  px: { md: 2.8, lg: 3.2, xl: 3.8 },
                  py: { md: 1, lg: 1.2 },
                  fontSize: { md: "0.84rem", lg: "0.89rem" },
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: "0 4px 20px rgba(10,21,53,0.12)",
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.02em",
                  border: "1px solid rgba(200,169,81,0.12)",
                  flexShrink: 0,
                  position: "relative",
                  overflow: "hidden",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(135deg, transparent 40%, rgba(200,169,81,0.08) 100%)",
                    pointerEvents: "none",
                  },
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #0d1b45 0%, #1a2f65 50%, #1e3270 100%)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Book Consultation
              </Button>
            ) : (
              <IconButton
                onClick={handleDrawerToggle}
                sx={{
                  color: "#0a1535",
                  width: 44,
                  height: 44,
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.5)",
                  border: "1px solid rgba(10,21,53,0.06)",
                  backdropFilter: "blur(8px)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "rgba(255,255,255,0.7)",
                    transform: "scale(1.05)",
                  },
                }}
              >
                <FaBars size={20} />
              </IconButton>
            )}
          </Toolbar>
        </Container>

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: scrolled ? "2px" : "0px",
            background:
              "linear-gradient(90deg, transparent 5%, rgba(200,169,81,0.15) 25%, rgba(200,169,81,0.4) 50%, rgba(200,169,81,0.15) 75%, transparent 95%)",
            transition: "height 0.5s ease",
          }}
        />
      </AppBar>

      {/* ══════ MOBILE DRAWER ══════ */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          zIndex: 1400,
          "& .MuiBackdrop-root": {
            background: "rgba(10,21,53,0.25)",
            backdropFilter: "blur(8px)",
          },
          "& .MuiDrawer-paper": {
            width: "88%",
            maxWidth: "380px",
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(30px) saturate(180%)",
            WebkitBackdropFilter: "blur(30px) saturate(180%)",
            boxShadow: "-16px 0 50px rgba(10,21,53,0.12)",
          },
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2.5,
              borderBottom: "1px solid rgba(10,21,53,0.05)",
            }}
          >
            <Box
              sx={{
                height: "80px",
                width: "80px",
                position: "relative",
                flexShrink: 0,
              }}
            >
              <Image
                src="/logo.png"
                alt="Logo"
                width={80}
                height={80}
                quality={100}
                sizes="80px"
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                  filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.05))",
                }}
              />
            </Box>
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                color: "#0a1535",
                width: 44,
                height: 44,
                borderRadius: "12px",
                background: "rgba(10,21,53,0.04)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "rgba(10,21,53,0.08)",
                  transform: "rotate(90deg)",
                },
              }}
            >
              <FaTimes size={20} />
            </IconButton>
          </Box>

          <Box sx={{ flex: 1, px: 2, pt: 2.5 }}>
            <List sx={{ p: 0 }}>
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <ListItem
                    key={link.name}
                    disablePadding
                    sx={{ mb: 0.4 }}
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
                          borderRadius: "13px",
                          py: 1.5,
                          px: 2,
                          background: isActive
                            ? "rgba(200,169,81,0.07)"
                            : "transparent",
                          borderLeft: isActive
                            ? "3px solid #c8a951"
                            : "3px solid transparent",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            background: "rgba(10,21,53,0.03)",
                            transform: "translateX(4px)",
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "0.68rem",
                            fontWeight: 700,
                            color: isActive ? "#c8a951" : "#c0c7d4",
                            mr: 2,
                            minWidth: "20px",
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </Typography>
                        <ListItemText
                          primary={link.name}
                          slotProps={{
                            primary: {
                              sx: {
                                fontSize: "0.94rem",
                                fontWeight: isActive ? 700 : 500,
                                color: isActive ? "#0a1535" : "#4a5568",
                                fontFamily: "'Inter', sans-serif",
                              },
                            },
                          }}
                        />
                        <HiArrowRight
                          size={14}
                          style={{
                            color: isActive ? "#c8a951" : "#c0c7d4",
                          }}
                        />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box
            sx={{
              p: 2.5,
              borderTop: "1px solid rgba(10,21,53,0.05)",
            }}
            className="mobile-drawer-item"
          >
            <Button
              fullWidth
              variant="contained"
              endIcon={<HiArrowRight size={17} />}
              onClick={handleDrawerToggle}
              sx={{
                background:
                  "linear-gradient(135deg, #0a1535 0%, #1a2a5e 100%)",
                color: "#fff",
                borderRadius: "13px",
                py: 1.6,
                fontSize: "0.94rem",
                fontWeight: 600,
                textTransform: "none",
                fontFamily: "'Inter', sans-serif",
                boxShadow: "0 6px 24px rgba(10,21,53,0.18)",
                border: "1px solid rgba(200,169,81,0.1)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #0d1b45 0%, #1e3270 100%)",
                },
              }}
            >
              Book Consultation
            </Button>
            <Typography
              sx={{
                fontSize: "0.65rem",
                color: "#9aa3b4",
                textAlign: "center",
                mt: 1.5,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Free consultation • No commitment
            </Typography>
          </Box>
        </Box>
      </Drawer>

      <Toolbar
        sx={{
          minHeight: {
            xs: "64px",
            sm: "68px",
            md: "72px",
            lg: "76px",
          },
        }}
      />
    </>
  );
}