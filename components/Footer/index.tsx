"use client";

import React, { useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  IconButton,
  Divider,
  Grid,
} from "@mui/material";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Our Process", href: "/process" },
  { name: "Team", href: "/team" },
  { name: "Contact Us", href: "/contact" },
];

const services = [
  { name: "Sales Progression", href: "/services" },
  { name: "Chain Management", href: "/services" },
  { name: "Buyer & Seller Liaison", href: "/services" },
  { name: "Mortgage Coordination", href: "/services" },
  { name: "Documentation Support", href: "/services" },
  { name: "Completion Management", href: "/services" },
];

const contactInfo = [
  {
    icon: FaPhone,
    text: "+971569778391",
    href: "tel:+971569778391",
  },
  {
    icon: FaEnvelope,
    text: "hello@1conveyancing.com",
    href: "mailto:hello@1conveyancing.com",
  },
  {
    icon: FaMapMarkerAlt,
    text: "London | Dubai",
    href: null,
  },
];

const socialLinks = [
  { icon: FaLinkedin, href: "https://linkedin.com/company/1conveyancing" },
  { icon: FaFacebook, href: "https://facebook.com/1conveyancing" },
];

export default function Footer() {
  const footerRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const logoGlowRef = useRef<HTMLDivElement | null>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dividerRef = useRef<HTMLHRElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (logoRef.current) {
        gsap.fromTo(
          logoRef.current,
          { opacity: 0, scale: 0.4, rotateY: -120, y: 30 },
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            y: 0,
            duration: 1.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (logoGlowRef.current) {
        gsap.fromTo(
          logoGlowRef.current,
          { opacity: 0, scale: 0.6 },
          {
            opacity: 0.7,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            onComplete: () => {
              gsap.to(logoGlowRef.current, {
                opacity: 0.3,
                scale: 1.3,
                duration: 2.5,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
              });
            },
          }
        );
      }

      const validColumns = columnsRef.current.filter(
        (col): col is HTMLDivElement => col !== null
      );
      gsap.fromTo(
        validColumns,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: dividerRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (bottomRef.current) {
        gsap.fromTo(
          bottomRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bottomRef.current,
              start: "top 98%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={footerRef}
      component="footer"
      sx={{
        background: "linear-gradient(180deg, #0a1a33 0%, #0D2340 40%, #091a30 100%)",
        color: "#ffffff",
        position: "relative",
        overflow: "hidden",
        pt: { xs: 7, md: 9 },
        pb: 0,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(199, 161, 90, 0.15) 20%, rgba(199, 161, 90, 0.6) 50%, rgba(199, 161, 90, 0.15) 80%, transparent 100%)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "-120px",
          right: "-80px",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(199, 161, 90, 0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-100px",
          left: "-60px",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(199, 161, 90, 0.03) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 5, md: 6 }} sx={{ pb: 6 }}>
          <Grid
            size={{ xs: 12, sm: 6, md: 3 }}
            ref={(el: HTMLDivElement | null) => {
              columnsRef.current[0] = el;
            }}
          >
            <Link href="/" style={{ textDecoration: "none" }}>
              <Box
                ref={logoRef}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  position: "relative",
                  perspective: "800px",
                  width: "fit-content",
                  height: {
                    xs: "75px",
                    sm: "85px",
                    md: "95px",
                    lg: "110px",
                  },
                  mb: 2.5,
                  transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  "&:hover": {
                    transform: "translateY(-3px) scale(1.04)",
                  },
                }}
              >
                <Box
                  ref={logoGlowRef}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "160%",
                    height: "160%",
                    background:
                      "radial-gradient(circle, rgba(199, 161, 90, 0.2) 0%, rgba(199, 161, 90, 0.06) 40%, transparent 70%)",
                    borderRadius: "50%",
                    pointerEvents: "none",
                    opacity: 0.6,
                    filter: "blur(8px)",
                  }}
                />

                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "130%",
                    height: "130%",
                    borderRadius: "50%",
                    border: "1px solid rgba(199, 161, 90, 0.08)",
                    pointerEvents: "none",
                  }}
                />

                <Image
                  src="/logo.png"
                  alt="1 Conveyancing Logo"
                  width={300}
                  height={300}
                  quality={100}
                  sizes="(max-width: 600px) 75px, (max-width: 900px) 85px, (max-width: 1200px) 95px, 110px"
                  style={{
                    width: "auto",
                    height: "100%",
                    objectFit: "contain",
                    filter:
                      "drop-shadow(0 4px 16px rgba(199, 161, 90, 0.15)) drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3)) brightness(1.1)",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              </Box>
            </Link>

            <Typography
              sx={{
                fontSize: "0.85rem",
                color: "rgba(255, 255, 255, 0.55)",
                lineHeight: 1.7,
                maxWidth: "280px",
                fontFamily: "'Inter', sans-serif",
                mb: 3,
              }}
            >
              A specialist sales progression and conveyancing support company helping buyers, sellers, investors, developers, and estate agencies complete property transactions with confidence.
            </Typography>

            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1,
                borderRadius: "10px",
                background: "rgba(199, 161, 90, 0.08)",
                border: "1px solid rgba(199, 161, 90, 0.15)",
              }}
            >
              <Box
                sx={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#4ade80",
                  boxShadow: "0 0 8px rgba(74, 222, 128, 0.4)",
                }}
              />
              <Typography
                sx={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "rgba(255, 255, 255, 0.7)",
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.03em",
                }}
              >
                Trusted by 500+ clients
              </Typography>
            </Box>
          </Grid>

          <Grid
            size={{ xs: 6, sm: 6, md: 2.5 }}
            ref={(el: HTMLDivElement | null) => {
              columnsRef.current[1] = el;
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
              <Box
                sx={{
                  width: "3px",
                  height: "18px",
                  borderRadius: "4px",
                  background: "linear-gradient(180deg, #C7A15A, rgba(199, 161, 90, 0.3))",
                }}
              />
              <Typography
                sx={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.02em",
                }}
              >
                Quick Links
              </Typography>
            </Box>

            <Stack spacing={1.2}>
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  style={{ textDecoration: "none" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      py: 0.3,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        "& .link-text": {
                          color: "#C7A15A",
                          transform: "translateX(6px)",
                        },
                        "& .link-dash": {
                          width: "16px",
                          background: "#C7A15A",
                        },
                      },
                    }}
                  >
                    <Box
                      className="link-dash"
                      sx={{
                        width: "8px",
                        height: "1.5px",
                        borderRadius: "2px",
                        background: "rgba(255, 255, 255, 0.25)",
                        transition: "all 0.3s ease",
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      className="link-text"
                      sx={{
                        fontSize: "0.875rem",
                        color: "rgba(255, 255, 255, 0.6)",
                        transition: "all 0.3s ease",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {link.name}
                    </Typography>
                  </Box>
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid
            size={{ xs: 6, sm: 6, md: 3.5 }}
            ref={(el: HTMLDivElement | null) => {
              columnsRef.current[2] = el;
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
              <Box
                sx={{
                  width: "3px",
                  height: "18px",
                  borderRadius: "4px",
                  background: "linear-gradient(180deg, #C7A15A, rgba(199, 161, 90, 0.3))",
                }}
              />
              <Typography
                sx={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.02em",
                }}
              >
                Services
              </Typography>
            </Box>

            <Stack spacing={1.2}>
              {services.map((service) => (
                <Link
                  key={service.name}
                  href={service.href}
                  style={{ textDecoration: "none" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      py: 0.3,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        "& .link-text": {
                          color: "#C7A15A",
                          transform: "translateX(6px)",
                        },
                        "& .link-dash": {
                          width: "16px",
                          background: "#C7A15A",
                        },
                      },
                    }}
                  >
                    <Box
                      className="link-dash"
                      sx={{
                        width: "8px",
                        height: "1.5px",
                        borderRadius: "2px",
                        background: "rgba(255, 255, 255, 0.25)",
                        transition: "all 0.3s ease",
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      className="link-text"
                      sx={{
                        fontSize: "0.875rem",
                        color: "rgba(255, 255, 255, 0.6)",
                        transition: "all 0.3s ease",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {service.name}
                    </Typography>
                  </Box>
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid
            size={{ xs: 12, sm: 6, md: 3 }}
            ref={(el: HTMLDivElement | null) => {
              columnsRef.current[3] = el;
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
              <Box
                sx={{
                  width: "3px",
                  height: "18px",
                  borderRadius: "4px",
                  background: "linear-gradient(180deg, #C7A15A, rgba(199, 161, 90, 0.3))",
                }}
              />
              <Typography
                sx={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.02em",
                }}
              >
                Contact
              </Typography>
            </Box>

            <Stack spacing={2.2}>
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                const content = (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      cursor: item.href ? "pointer" : "default",
                      transition: "all 0.3s ease",
                      "&:hover": item.href
                        ? {
                            transform: "translateX(4px)",
                            "& .icon-box": {
                              background: "rgba(199, 161, 90, 0.18)",
                              borderColor: "#C7A15A",
                              boxShadow:
                                "0 0 16px rgba(199, 161, 90, 0.15)",
                            },
                            "& .contact-text": {
                              color: "#C7A15A",
                            },
                          }
                        : {},
                    }}
                  >
                    <Box
                      className="icon-box"
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "10px",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        background: "rgba(255, 255, 255, 0.05)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Icon size={14} color="rgba(199, 161, 90, 0.9)" />
                    </Box>
                    <Typography
                      className="contact-text"
                      sx={{
                        fontSize: "0.875rem",
                        color: "rgba(255, 255, 255, 0.75)",
                        transition: "all 0.3s ease",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {item.text}
                    </Typography>
                  </Box>
                );

                return item.href ? (
                  <Link
                    key={index}
                    href={item.href}
                    style={{ textDecoration: "none" }}
                  >
                    {content}
                  </Link>
                ) : (
                  <Box key={index}>{content}</Box>
                );
              })}
            </Stack>

            <Stack direction="row" spacing={1.5} sx={{ mt: 3.5 }}>
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <IconButton
                    key={index}
                    component="a"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: "12px",
                      background: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      color: "#ffffff",
                      transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #C7A15A, #d4b365)",
                        borderColor: "#C7A15A",
                        transform: "translateY(-4px) scale(1.05)",
                        boxShadow: "0 10px 25px rgba(199, 161, 90, 0.35)",
                      },
                    }}
                  >
                    <Icon size={17} />
                  </IconButton>
                );
              })}
            </Stack>
          </Grid>
        </Grid>

        <Divider
          ref={dividerRef}
          sx={{
            borderColor: "rgba(255, 255, 255, 0.06)",
            mt: 2,
            transformOrigin: "center",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: "-1px",
              left: "30%",
              right: "30%",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(199, 161, 90, 0.2), transparent)",
            },
          }}
        />

        <Box
          ref={bottomRef}
          sx={{
            py: 3,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                height: "24px",
                opacity: 0.5,
                transition: "opacity 0.3s ease",
                "&:hover": { opacity: 0.8 },
              }}
            >
              <Image
                src="/logo.png"
                alt="Logo"
                width={60}
                height={60}
                quality={100}
                style={{
                  width: "auto",
                  height: "100%",
                  objectFit: "contain",
                  filter: "brightness(1.2) drop-shadow(0 1px 3px rgba(0,0,0,0.2))",
                }}
              />
            </Box>

            <Typography
              sx={{
                fontSize: "0.78rem",
                color: "rgba(255, 255, 255, 0.4)",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              © {new Date().getFullYear()} 1 Conveyancing. All Rights Reserved.
            </Typography>
          </Box>

          <Stack
            direction="row"
            spacing={3}
            divider={
              <Box
                sx={{
                  width: "3px",
                  height: "3px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.2)",
                  alignSelf: "center",
                }}
              />
            }
          >
            {[
              { name: "Privacy Policy", href: "/privacy-policy" },
              { name: "Terms of Service", href: "/terms" },
              { name: "Cookies", href: "/cookies" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                style={{ textDecoration: "none" }}
              >
                <Typography
                  sx={{
                    fontSize: "0.78rem",
                    color: "rgba(255, 255, 255, 0.4)",
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                    transition: "all 0.3s ease",
                    position: "relative",
                    "&:hover": {
                      color: "#C7A15A",
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: "-2px",
                      left: 0,
                      right: 0,
                      height: "1px",
                      background: "#C7A15A",
                      transform: "scaleX(0)",
                      transformOrigin: "center",
                      transition: "transform 0.3s ease",
                    },
                    "&:hover::after": {
                      transform: "scaleX(1)",
                    },
                  }}
                >
                  {item.name}
                </Typography>
              </Link>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}