"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
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
import { FaBars, FaTimes, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
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
  { name: "Contact Us", href: "/contact" },
];

export default function NavbarPremium() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const navLinksRef = useRef<(HTMLDivElement | null)[]>([]);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const ctaButtonRef = useRef<HTMLButtonElement | null>(null);
  const appBarRef = useRef<HTMLElement | null>(null);
  const hasAnimated = useRef(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;

          setScrolled(currentY > 20);
          setScrollProgress(docHeight > 0 ? (currentY / docHeight) * 100 : 0);

          if (currentY > 150) {
            setHidden(currentY > lastScrollY.current);
          } else {
            setHidden(false);
          }
          lastScrollY.current = currentY;
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
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )
        .fromTo(
          logoRef.current,
          { opacity: 0, scale: 0.5, rotate: -10 },
          { opacity: 1, scale: 1, rotate: 0, duration: 1, ease: "back.out(1.7)" },
          "-=0.6"
        )
        .fromTo(
          navLinksRef.current.filter(Boolean),
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
        )
        .fromTo(
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
    const handlers: { el: Element; enter: () => void; leave: () => void }[] = [];

    navItems.forEach((item) => {
      const underline = item.querySelector("[data-underline]");
      const text = item.querySelector("p");

      const enter = () => {
        gsap.to(underline, { scaleX: 1, opacity: 1, duration: 0.35, ease: "power3.out" });
        gsap.to(text, { color: "#0D2340", y: -1, duration: 0.25 });
        gsap.to(item, { background: "rgba(255,255,255,0.9)", duration: 0.25 });
      };
      const leave = () => {
        const active = item.getAttribute("data-active") === "true";
        gsap.to(underline, { scaleX: active ? 1 : 0, opacity: active ? 1 : 0, duration: 0.3 });
        gsap.to(text, { color: active ? "#0D2340" : "#5a6478", y: 0, duration: 0.25 });
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
    if (!btn || isMobile) return;

    const move = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.25, y: y * 0.35, duration: 0.4, ease: "power2.out" });
    };
    const enter = () =>
      gsap.to(btn, {
        scale: 1.05,
        boxShadow: "0 12px 35px rgba(13,35,64,0.25)",
        duration: 0.3,
      });
    const leave = () =>
      gsap.to(btn, {
        x: 0,
        y: 0,
        scale: 1,
        boxShadow: "0 4px 20px rgba(13,35,64,0.12)",
        duration: 0.4,
        ease: "elastic.out(1, 0.4)",
      });

    btn.addEventListener("mousemove", move);
    btn.addEventListener("mouseenter", enter);
    btn.addEventListener("mouseleave", leave);
    return () => {
      btn.removeEventListener("mousemove", move);
      btn.removeEventListener("mouseenter", enter);
      btn.removeEventListener("mouseleave", leave);
    };
  }, [isMobile]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleDrawerToggle = useCallback(() => {
    if (!mobileOpen) {
      setMobileOpen(true);
      requestAnimationFrame(() => {
        setTimeout(() => {
          const items = document.querySelectorAll(".mobile-drawer-item");
          gsap.fromTo(
            items,
            { opacity: 0, x: 60 },
            { opacity: 1, x: 0, duration: 0.5, stagger: 0.05, ease: "power3.out" }
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
          background: scrolled ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.85)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          borderBottom: scrolled
            ? "1px solid rgba(13,35,64,0.08)"
            : "1px solid rgba(13,35,64,0.04)",
          boxShadow: scrolled ? "0 4px 30px rgba(13,35,64,0.06)" : "none",
          transform: hidden ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1), background 0.5s ease, box-shadow 0.5s ease",
          zIndex: 1300,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "3px",
            width: `${scrollProgress}%`,
            background: "linear-gradient(90deg, #C7A15A, #d4b365, #C7A15A)",
            boxShadow: "0 0 10px rgba(199,161,90,0.5)",
            transition: "width 0.1s linear",
            zIndex: 2,
          }}
        />

        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 0,
              minHeight: {
                xs: "75px !important",
                sm: "80px !important",
                md: "85px !important",
                lg: "90px !important",
              },
              gap: 2,
            }}
          >
            <Link
              href="/"
              style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0 }}
            >
              <Box
                ref={logoRef}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  position: "relative",
                  height: { xs: "55px", sm: "65px", md: "75px", lg: "85px" },
                  width: { xs: "60px", sm: "70px", md: "80px", lg: "90px" },
                  flexShrink: 0,
                  transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                  "&:hover": { transform: "scale(1.04)" },
                }}
              >
                <Image
                  src="/logo.png"
                  alt="1 Conveyancing"
                  width={200}
                  height={200}
                  priority
                  quality={100}
                  sizes="(max-width: 600px) 60px, (max-width: 900px) 70px, (max-width: 1200px) 80px, 90px"
                  style={{ objectFit: "contain", width: "100%", height: "100%" }}
                />
              </Box>
            </Link>

            {!isMobile && (
              /* FIX: Stack hata kar Box use kiya */
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 0.3,
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(245,247,251,0.55)",
                  borderRadius: "14px",
                  padding: "5px 10px",
                  border: "1px solid rgba(255,255,255,0.6)",
                  backdropFilter: "blur(14px)",
                  boxShadow: "0 2px 12px rgba(13,35,64,0.04)",
                }}
              >
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link key={link.name} href={link.href} style={{ textDecoration: "none" }}>
                      <Box
                        ref={(el: HTMLDivElement | null) => {
                          navLinksRef.current[index] = el;
                        }}
                        data-nav-link
                        data-active={isActive}
                        sx={{
                          position: "relative",
                          px: { md: 1.2, lg: 1.5, xl: 1.8 },
                          py: 0.8,
                          cursor: "pointer",
                          borderRadius: "10px",
                          background: isActive ? "rgba(255,255,255,0.95)" : "transparent",
                          boxShadow: isActive ? "0 2px 10px rgba(13,35,64,0.06)" : "none",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <Typography
                          component="p"
                          sx={{
                            fontSize: { md: "0.78rem", lg: "0.82rem", xl: "0.86rem" },
                            fontWeight: isActive ? 700 : 500,
                            color: isActive ? "#0D2340" : "#5a6478",
                            fontFamily: "'Inter', sans-serif",
                            letterSpacing: "0.01em",
                            whiteSpace: "nowrap",
                            userSelect: "none",
                            lineHeight: 1.4,
                          }}
                        >
                          {link.name}
                        </Typography>
                        <Box
                          data-underline
                          sx={{
                            position: "absolute",
                            bottom: "3px",
                            left: "22%",
                            right: "22%",
                            height: "2.5px",
                            background: "linear-gradient(90deg, #C7A15A, #d4b365, #C7A15A)",
                            borderRadius: "4px",
                            transformOrigin: "center",
                            transform: isActive ? "scaleX(1)" : "scaleX(0)",
                            opacity: isActive ? 1 : 0,
                            boxShadow: "0 1px 8px rgba(199,161,90,0.3)",
                            transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                          }}
                        />
                      </Box>
                    </Link>
                  );
                })}
              </Box>
            )}

            {!isMobile ? (
              /* FIX: Stack hata kar Box use kiya */
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 1.5,
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <Link href="/login" style={{ textDecoration: "none" }}>
                  <Typography
                    sx={{
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: "#0D2340",
                      fontFamily: "'Inter', sans-serif",
                      cursor: "pointer",
                      px: 1.5,
                      transition: "color 0.3s ease",
                      "&:hover": { color: "#C7A15A" },
                    }}
                  >
                    Sign In
                  </Typography>
                </Link>

                <Button
                  ref={ctaButtonRef}
                  variant="contained"
                  endIcon={<HiArrowRight size={16} />}
                  sx={{
                    background: "linear-gradient(135deg, #0D2340 0%, #162550 50%, #1a2a5e 100%)",
                    color: "#fff",
                    borderRadius: "12px",
                    px: { md: 2.5, lg: 3, xl: 3.5 },
                    py: { md: 1.1, lg: 1.25 },
                    fontSize: { md: "0.8rem", lg: "0.84rem" },
                    fontWeight: 600,
                    textTransform: "none",
                    boxShadow: "0 4px 18px rgba(13,35,64,0.12)",
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "0.02em",
                    border: "1px solid rgba(199,161,90,0.12)",
                    position: "relative",
                    overflow: "hidden",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(135deg, transparent 40%, rgba(199,161,90,0.08) 100%)",
                      pointerEvents: "none",
                    },
                    "&:hover": {
                      background: "linear-gradient(135deg, #0d1b45 0%, #1a2f65 50%, #1e3270 100%)",
                    },
                  }}
                >
                  Book Consultation
                </Button>
              </Box>
            ) : (
              <IconButton
                onClick={handleDrawerToggle}
                sx={{
                  color: "#0D2340",
                  width: 44,
                  height: 44,
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.5)",
                  border: "1px solid rgba(13,35,64,0.06)",
                  backdropFilter: "blur(8px)",
                  transition: "all 0.3s ease",
                  "&:hover": { background: "rgba(255,255,255,0.7)", transform: "scale(1.05)" },
                }}
              >
                <FaBars size={19} />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          zIndex: 1400,
          "& .MuiBackdrop-root": {
            background: "rgba(13,35,64,0.25)",
            backdropFilter: "blur(8px)",
          },
          "& .MuiDrawer-paper": {
            width: "85%",
            maxWidth: "370px",
            background: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(30px) saturate(180%)",
            WebkitBackdropFilter: "blur(30px) saturate(180%)",
            boxShadow: "-12px 0 40px rgba(13,35,64,0.1)",
          },
        }}
      >
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 2.5,
              py: 1.8,
              borderBottom: "1px solid rgba(13,35,64,0.05)",
            }}
          >
            <Box sx={{ height: "55px", width: "60px", position: "relative", flexShrink: 0 }}>
              <Image
                src="/logo.png"
                alt="1 Conveyancing"
                width={110}
                height={110}
                quality={100}
                sizes="60px"
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
              />
            </Box>
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                color: "#0D2340",
                width: 42,
                height: 42,
                borderRadius: "11px",
                background: "rgba(13,35,64,0.04)",
                transition: "all 0.3s ease",
                "&:hover": { background: "rgba(13,35,64,0.08)", transform: "rotate(90deg)" },
              }}
            >
              <FaTimes size={19} />
            </IconButton>
          </Box>

          <Box sx={{ flex: 1, px: 2, pt: 2.5, overflowY: "auto" }}>
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
                      style={{ textDecoration: "none", width: "100%", color: "inherit" }}
                      onClick={handleDrawerToggle}
                    >
                      <ListItemButton
                        sx={{
                          borderRadius: "12px",
                          py: 1.4,
                          px: 2,
                          background: isActive ? "rgba(199,161,90,0.07)" : "transparent",
                          borderLeft: isActive ? "3px solid #C7A15A" : "3px solid transparent",
                          transition: "all 0.3s ease",
                          "&:hover": { background: "rgba(13,35,64,0.03)", transform: "translateX(4px)" },
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "0.68rem",
                            fontWeight: 700,
                            color: isActive ? "#C7A15A" : "#c0c7d4",
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
                                fontSize: "0.92rem",
                                fontWeight: isActive ? 700 : 500,
                                color: isActive ? "#0D2340" : "#4a5568",
                                fontFamily: "'Inter', sans-serif",
                              },
                            },
                          }}
                        />
                        <HiArrowRight size={14} style={{ color: isActive ? "#C7A15A" : "#c0c7d4" }} />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                );
              })}
            </List>

            <Box className="mobile-drawer-item" sx={{ mt: 2, px: 1 }}>
              <Link href="/login" style={{ textDecoration: "none" }} onClick={handleDrawerToggle}>
                <Typography
                  sx={{
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    color: "#0D2340",
                    fontFamily: "'Inter', sans-serif",
                    "&:hover": { color: "#C7A15A" },
                  }}
                >
                  Sign In / Register
                </Typography>
              </Link>
            </Box>
          </Box>

          <Box sx={{ p: 2.5, borderTop: "1px solid rgba(13,35,64,0.05)" }} className="mobile-drawer-item">
            <Button
              fullWidth
              variant="contained"
              endIcon={<HiArrowRight size={16} />}
              onClick={handleDrawerToggle}
              sx={{
                background: "linear-gradient(135deg, #0D2340 0%, #1a2a5e 100%)",
                color: "#fff",
                borderRadius: "12px",
                py: 1.5,
                fontSize: "0.92rem",
                fontWeight: 600,
                textTransform: "none",
                fontFamily: "'Inter', sans-serif",
                boxShadow: "0 6px 22px rgba(13,35,64,0.18)",
                border: "1px solid rgba(199,161,90,0.1)",
                "&:hover": { background: "linear-gradient(135deg, #0d1b45 0%, #1e3270 100%)" },
              }}
            >
              Book Consultation
            </Button>

            {/* FIX: Stack hata kar Box use kiya */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1.5,
                justifyContent: "center",
                mt: 2,
              }}
            >
              <IconButton
                component="a"
                href="https://wa.me/971500000000"
                target="_blank"
                sx={{
                  width: 40,
                  height: 40,
                  background: "rgba(37,211,102,0.1)",
                  color: "#25D366",
                  "&:hover": { background: "rgba(37,211,102,0.2)" },
                }}
              >
                <FaWhatsapp size={18} />
              </IconButton>
              <IconButton
                component="a"
                href="tel:+971500000000"
                sx={{
                  width: 40,
                  height: 40,
                  background: "rgba(13,35,64,0.07)",
                  color: "#0D2340",
                  "&:hover": { background: "rgba(13,35,64,0.12)" },
                }}
              >
                <FaPhoneAlt size={15} />
              </IconButton>
            </Box>

            <Typography
              sx={{
                fontSize: "0.65rem",
                color: "#9aa3b4",
                textAlign: "center",
                mt: 1.5,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Free consultation. No commitment.
            </Typography>
          </Box>
        </Box>
      </Drawer>

      <Toolbar
        sx={{
          minHeight: {
            xs: "75px !important",
            sm: "80px !important",
            md: "85px !important",
            lg: "90px !important",
          },
        }}
      />
    </>
  );
}