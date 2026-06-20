"use client";

import React, { useEffect, useRef, useState } from "react";
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
  primary: "#0D2340",
  primaryHover: "#1a2f5e",
  gold: "#C7A15A",
  goldLight: "#d4b365",
  textSecondary: "#3a4356",
  white: "#ffffff",
};

const heroImages = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
];

const stats = [
  { icon: PiHouseLineLight, value: "1,000+", label: "Transactions Managed" },
  { icon: PiMedalLight, value: "17+", label: "Years Experience" },
  { icon: PiUsersThreeLight, value: "98%", label: "Client Satisfaction" },
  { icon: PiClockCountdownLight, value: "24/7", label: "Transaction Updates" },
];

export default function HeroPremium() {
  const heroContentRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const statsContainerRef = useRef<HTMLDivElement | null>(null);
  const statItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgImageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [currentImage, setCurrentImage] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const cycleImages = () => {
      setCurrentImage((prev) => {
        const next = (prev + 1) % heroImages.length;

        if (bgImageRefs.current[prev]) {
          gsap.to(bgImageRefs.current[prev], {
            opacity: 0,
            scale: 1.08,
            duration: 1.5,
            ease: "power2.inOut",
          });
        }

        if (bgImageRefs.current[next]) {
          gsap.fromTo(
            bgImageRefs.current[next],
            { opacity: 0, scale: 1.15 },
            {
              opacity: 1,
              scale: 1,
              duration: 1.5,
              ease: "power2.inOut",
            }
          );
        }

        if (progressBarRef.current) {
          gsap.fromTo(
            progressBarRef.current,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 5,
              ease: "none",
            }
          );
        }

        dotsRef.current.forEach((dot, i) => {
          if (dot) {
            gsap.to(dot, {
              scale: i === next ? 1.4 : 1,
              background:
                i === next ? COLORS.gold : "rgba(255,255,255,0.4)",
              boxShadow:
                i === next
                  ? "0 0 12px rgba(199,161,90,0.5)"
                  : "0 0 0px transparent",
              duration: 0.4,
              ease: "back.out(1.5)",
            });
          }
        });

        return next;
      });
    };

    if (bgImageRefs.current[0]) {
      gsap.set(bgImageRefs.current[0], { opacity: 1, scale: 1 });
    }
    heroImages.forEach((_, i) => {
      if (i !== 0 && bgImageRefs.current[i]) {
        gsap.set(bgImageRefs.current[i], { opacity: 0, scale: 1.15 });
      }
    });

    if (progressBarRef.current) {
      gsap.fromTo(
        progressBarRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 5, ease: "none" }
      );
    }

    intervalRef.current = setInterval(cycleImages, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const particles = document.querySelectorAll("[data-particle]");
      particles.forEach((p) => {
        gsap.fromTo(
          p,
          {
            y: "100%",
            opacity: 0,
            x: gsap.utils.random(-20, 20),
          },
          {
            y: "-100%",
            opacity: gsap.utils.random(0.1, 0.4),
            duration: gsap.utils.random(8, 15),
            repeat: -1,
            delay: gsap.utils.random(0, 5),
            ease: "none",
          }
        );
      });

      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, x: -30, filter: "blur(10px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
          delay: 0.3,
        }
      );

      const tl = gsap.timeline();

      const headingEl = headingRef.current;
      if (headingEl) {
        const words = headingEl.querySelectorAll("[data-word]");
        tl.fromTo(
          words,
          {
            opacity: 0,
            y: 80,
            rotationX: -30,
            transformOrigin: "center bottom",
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
          }
        );
      }

      tl.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 40, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      ).fromTo(
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

      statItemsRef.current.filter(Boolean).forEach((item) => {
        const valueEl = item?.querySelector("[data-stat-value]");
        if (!valueEl) return;
        const text = valueEl.textContent || "";
        const numMatch = text.match(/[\d,]+/);
        if (!numMatch) return;
        const target = parseInt(numMatch[0].replace(/,/g, ""));
        const suffix = text.replace(numMatch[0], "");

        ScrollTrigger.create({
          trigger: item,
          start: "top 85%",
          onEnter: () => {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: target,
              duration: 2,
              ease: "power2.out",
              onUpdate: () => {
                const v = Math.round(obj.val);
                valueEl.textContent =
                  v >= 1000
                    ? v.toLocaleString() + suffix
                    : v + suffix;
              },
            });
          },
          once: true,
        });
      });
    }, heroContentRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const iconCircles = document.querySelectorAll("[data-stat-icon]");
    const handlers: { circle: Element; onEnter: () => void; onLeave: () => void }[] = [];

    iconCircles.forEach((circle) => {
      gsap.set(circle, { transformOrigin: "center center" });
      const svg = circle.querySelector("svg");

      const onEnter = () => {
        gsap.to(circle, {
          duration: 0.5,
          scale: 1.15,
          borderColor: COLORS.gold,
          boxShadow: "0 8px 24px rgba(199,161,90,0.3)",
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
          boxShadow: "0 0px 0px rgba(199,161,90,0)",
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

  const goToImage = (index: number) => {
    if (index === currentImage) return;

    if (intervalRef.current) clearInterval(intervalRef.current);

    const prev = currentImage;

    if (bgImageRefs.current[prev]) {
      gsap.to(bgImageRefs.current[prev], {
        opacity: 0,
        scale: 1.08,
        duration: 1.2,
        ease: "power2.inOut",
      });
    }
    if (bgImageRefs.current[index]) {
      gsap.fromTo(
        bgImageRefs.current[index],
        { opacity: 0, scale: 1.15 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.inOut" }
      );
    }

    dotsRef.current.forEach((dot, i) => {
      if (dot) {
        gsap.to(dot, {
          scale: i === index ? 1.4 : 1,
          background:
            i === index ? COLORS.gold : "rgba(255,255,255,0.4)",
          boxShadow:
            i === index
              ? "0 0 12px rgba(199,161,90,0.5)"
              : "0 0 0px transparent",
          duration: 0.4,
        });
      }
    });

    if (progressBarRef.current) {
      gsap.fromTo(
        progressBarRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 5, ease: "none" }
      );
    }

    setCurrentImage(index);

    intervalRef.current = setInterval(() => {
      setCurrentImage((prev) => {
        const next = (prev + 1) % heroImages.length;
        if (bgImageRefs.current[prev]) {
          gsap.to(bgImageRefs.current[prev], {
            opacity: 0,
            scale: 1.08,
            duration: 1.5,
            ease: "power2.inOut",
          });
        }
        if (bgImageRefs.current[next]) {
          gsap.fromTo(
            bgImageRefs.current[next],
            { opacity: 0, scale: 1.15 },
            { opacity: 1, scale: 1, duration: 1.5, ease: "power2.inOut" }
          );
        }
        if (progressBarRef.current) {
          gsap.fromTo(
            progressBarRef.current,
            { scaleX: 0 },
            { scaleX: 1, duration: 5, ease: "none" }
          );
        }
        dotsRef.current.forEach((dot, i) => {
          if (dot) {
            gsap.to(dot, {
              scale: i === next ? 1.4 : 1,
              background:
                i === next ? COLORS.gold : "rgba(255,255,255,0.4)",
              boxShadow:
                i === next
                  ? "0 0 12px rgba(199,161,90,0.5)"
                  : "0 0 0px transparent",
              duration: 0.4,
            });
          }
        });
        return next;
      });
    }, 5000);
  };

  const headingLines = [
    "Property Transactions",
    "Managed.",
    "Relationships Built.",
  ];

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
      <Box
        sx={{
          position: "relative",
          width: "100%",
          minHeight: { xs: "90vh", md: "650px", lg: "750px" },
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {heroImages.map((img, i) => (
          <Box
            key={i}
            ref={(el: HTMLDivElement | null) => {
              bgImageRefs.current[i] = el;
            }}
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url('${img}')`,
              backgroundSize: "cover",
              backgroundPosition: "center right",
              backgroundRepeat: "no-repeat",
              opacity: i === 0 ? 1 : 0,
              willChange: "opacity, transform",
              zIndex: 0,
            }}
          />
        ))}

        {Array.from({ length: 12 }).map((_, i) => (
          <Box
            key={`particle-${i}`}
            data-particle
            sx={{
              position: "absolute",
              width: gsap.utils.random(3, 8) + "px",
              height: gsap.utils.random(3, 8) + "px",
              borderRadius: "50%",
              background: `rgba(199, 161, 90, ${gsap.utils.random(
                0.15,
                0.35
              )})`,
              left: `${gsap.utils.random(5, 95)}%`,
              top: `${gsap.utils.random(0, 100)}%`,
              zIndex: 4,
              pointerEvents: "none",
              filter: "blur(1px)",
            }}
          />
        ))}

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: {
              xs: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)",
              md: `linear-gradient(
                90deg,
                rgba(255, 255, 255, 0.98) 0%,
                rgba(255, 255, 255, 0.95) 18%,
                rgba(255, 255, 255, 0.75) 32%,
                rgba(255, 255, 255, 0.35) 48%,
                rgba(255, 255, 255, 0.08) 62%,
                rgba(255, 255, 255, 0) 78%
              )`,
            },
            zIndex: 1,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(
              180deg,
              rgba(13, 35, 64, 0.03) 0%,
              transparent 15%,
              transparent 85%,
              rgba(13, 35, 64, 0.05) 100%
            )`,
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: { xs: 20, md: 32 },
            right: { xs: "50%", md: 48 },
            transform: { xs: "translateX(50%)", md: "none" },
            zIndex: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Stack direction="row" spacing={1}>
            {heroImages.map((_, i) => (
              <Box
                key={i}
                ref={(el: HTMLDivElement | null) => {
                  dotsRef.current[i] = el;
                }}
                onClick={() => goToImage(i)}
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background:
                    i === 0 ? COLORS.gold : "rgba(255,255,255,0.4)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  transform: i === 0 ? "scale(1.4)" : "scale(1)",
                  boxShadow:
                    i === 0
                      ? "0 0 12px rgba(199,161,90,0.5)"
                      : "0 0 0px transparent",
                  "&:hover": {
                    background: COLORS.goldLight,
                    transform: "scale(1.5)",
                  },
                }}
              />
            ))}
          </Stack>

          <Box
            sx={{
              width: 120,
              height: 2,
              borderRadius: 4,
              background: "rgba(255,255,255,0.15)",
              overflow: "hidden",
            }}
          >
            <Box
              ref={progressBarRef}
              sx={{
                width: "100%",
                height: "100%",
                background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.goldLight})`,
                transformOrigin: "left",
                borderRadius: 4,
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: { xs: 16, md: 32 },
            right: { xs: 16, md: 48 },
            zIndex: 5,
            background: "rgba(13, 35, 64, 0.6)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            px: 2,
            py: 0.8,
            display: "flex",
            alignItems: "center",
            gap: 0.8,
          }}
        >
          <Typography
            sx={{
              fontSize: "0.8rem",
              fontWeight: 700,
              color: COLORS.gold,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {String(currentImage + 1).padStart(2, "0")}
          </Typography>
          <Box
            sx={{
              width: 16,
              height: 1,
              background: "rgba(255,255,255,0.3)",
            }}
          />
          <Typography
            sx={{
              fontSize: "0.8rem",
              fontWeight: 500,
              color: "rgba(255,255,255,0.5)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {String(heroImages.length).padStart(2, "0")}
          </Typography>
        </Box>

        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            zIndex: 3,
            py: { xs: 8, md: 10 },
          }}
        >
          <Grid container>
            <Grid size={{ xs: 12, md: 7, lg: 6 }}>
              <Box ref={badgeRef} sx={{ display: "inline-block", mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.2,
                    background:
                      "linear-gradient(135deg, rgba(199, 161, 90, 0.12), rgba(26, 35, 126, 0.08))",
                    px: 2.5,
                    py: 1,
                    borderRadius: "50px",
                    border: "1px solid rgba(199, 161, 90, 0.25)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: COLORS.gold,
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        inset: -3,
                        borderRadius: "50%",
                        border: `2px solid ${COLORS.gold}`,
                        animation: "pulse-ring 2s ease-out infinite",
                      },
                      "@keyframes pulse-ring": {
                        "0%": {
                          transform: "scale(1)",
                          opacity: 0.6,
                        },
                        "100%": {
                          transform: "scale(2.2)",
                          opacity: 0,
                        },
                      },
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: COLORS.primary,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Welcome to 1 Conveyancing
                  </Typography>
                </Box>
              </Box>

              <Box ref={headingRef} sx={{ mb: 3, perspective: "1000px" }}>
                {headingLines.map((line, lineIdx) => (
                  <Box key={lineIdx} sx={{ overflow: "hidden" }}>
                    <Typography
                      component={lineIdx === 0 ? "h1" : "span"}
                      sx={{
                        display: "block",
                        fontSize: {
                          xs: "2.5rem",
                          sm: "3rem",
                          md: "3.5rem",
                          lg: "4.2rem",
                        },
                        fontWeight: 700,
                        color:
                          lineIdx === 1 ? COLORS.gold : COLORS.primary,
                        lineHeight: 1.08,
                        letterSpacing: "-0.03em",
                        fontFamily: "'Manrope', sans-serif",
                      }}
                    >
                      {line.split(" ").map((word, wIdx) => (
                        <Box
                          key={wIdx}
                          component="span"
                          data-word
                          sx={{
                            display: "inline-block",
                            mr: "0.3em",
                            willChange: "transform, opacity",
                          }}
                        >
                          {word}
                        </Box>
                      ))}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Box
                sx={{
                  width: 60,
                  height: 3,
                  background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.goldLight})`,
                  borderRadius: 4,
                  mb: 3,
                }}
              />

              <Typography
                ref={descriptionRef}
                sx={{
                  fontSize: { xs: "0.95rem", md: "1.08rem" },
                  color: COLORS.textSecondary,
                  lineHeight: 1.8,
                  mb: 4,
                  maxWidth: "520px",
                  fontWeight: 400,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                A specialist sales progression and conveyancing support company helping buyers, sellers, investors, developers, and estate agencies complete property transactions with confidence.
              </Typography>

              <Box ref={buttonsRef}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{ mt: 4 }}
                >
                  <Button
                    variant="contained"
                    endIcon={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          transition: "transform 0.3s ease",
                          ".MuiButton-root:hover &": {
                            transform: "translateX(4px)",
                          },
                        }}
                      >
                        <HiArrowRight />
                      </Box>
                    }
                    sx={{
                      background: `linear-gradient(135deg, ${COLORS.primary} 0%, #162550 100%)`,
                      color: COLORS.white,
                      px: 4,
                      py: 1.7,
                      fontSize: "0.92rem",
                      fontWeight: 600,
                      borderRadius: "12px",
                      textTransform: "none",
                      boxShadow: "0 8px 25px rgba(13, 35, 64, 0.25)",
                      position: "relative",
                      overflow: "hidden",
                      fontFamily: "'Inter', sans-serif",
                      border: "1px solid rgba(199,161,90,0.1)",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background:
                          "linear-gradient(90deg, transparent, rgba(199,161,90,0.15), transparent)",
                        transition: "left 0.6s ease",
                      },
                      "&:hover": {
                        background: `linear-gradient(135deg, ${COLORS.primaryHover} 0%, #1a2f65 100%)`,
                        transform: "translateY(-3px)",
                        boxShadow: "0 16px 40px rgba(13, 35, 64, 0.35)",
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
                      borderColor: "rgba(13,35,64,0.2)",
                      color: COLORS.primary,
                      borderWidth: "1.5px",
                      px: 4,
                      py: 1.7,
                      fontSize: "0.92rem",
                      fontWeight: 600,
                      borderRadius: "12px",
                      textTransform: "none",
                      background: "rgba(255, 255, 255, 0.6)",
                      backdropFilter: "blur(12px)",
                      fontFamily: "'Inter', sans-serif",
                      "&:hover": {
                        borderColor: COLORS.gold,
                        borderWidth: "1.5px",
                        background: "rgba(255, 255, 255, 0.95)",
                        transform: "translateY(-3px)",
                        boxShadow: "0 12px 32px rgba(13, 35, 64, 0.12)",
                        color: COLORS.primary,
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

      <Box
        ref={statsContainerRef}
        sx={{
          background: `linear-gradient(135deg, ${COLORS.primary} 0%, #0d1e45 50%, #111f4a 100%)`,
          py: { xs: 5, md: 6 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(199,161,90,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(199,161,90,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(circle at 15% 50%, rgba(199, 161, 90, 0.06) 0%, transparent 50%),
              radial-gradient(circle at 85% 50%, rgba(199, 161, 90, 0.04) 0%, transparent 50%),
              radial-gradient(circle at 50% 0%, rgba(199, 161, 90, 0.03) 0%, transparent 40%)
            `,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: `linear-gradient(90deg, transparent 0%, ${COLORS.gold}40 30%, ${COLORS.gold}80 50%, ${COLORS.gold}40 70%, transparent 100%)`,
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
                      py: 2,
                      px: 1,
                      borderRadius: "16px",
                      transition: "all 0.4s ease",
                      cursor: "default",
                      "&:hover": {
                        background: "rgba(255,255,255,0.03)",
                        transform: "translateY(-4px)",
                      },
                      "&::after": !isLast
                        ? {
                            content: '""',
                            position: "absolute",
                            right: { xs: 0, md: "-8px" },
                            top: "20%",
                            bottom: "20%",
                            width: "1px",
                            background:
                              "linear-gradient(180deg, transparent, rgba(199,161,90,0.15), transparent)",
                            display: { xs: "none", md: "block" },
                          }
                        : {},
                    }}
                  >
                    <Box
                      data-stat-icon
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        border: "1.5px solid rgba(255, 255, 255, 0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 1,
                        cursor: "pointer",
                        background: "rgba(255, 255, 255, 0.03)",
                        backdropFilter: "blur(10px)",
                        transition: "all 0.4s ease",
                      }}
                    >
                      <Icon size={28} color={COLORS.gold} />
                    </Box>

                    <Typography
                      data-stat-value
                      sx={{
                        fontSize: { xs: "1.85rem", md: "2.5rem" },
                        fontWeight: 700,
                        color: COLORS.white,
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                        fontFamily: "'Manrope', sans-serif",
                      }}
                    >
                      {stat.value}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: { xs: "0.75rem", md: "0.85rem" },
                        color: "rgba(255, 255, 255, 0.55)",
                        fontWeight: 500,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
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

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: `linear-gradient(90deg, transparent 0%, ${COLORS.gold}20 50%, transparent 100%)`,
          }}
        />
      </Box>
    </Box>
  );
}