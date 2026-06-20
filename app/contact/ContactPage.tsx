"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Stack,
  TextField,
  Alert,
} from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiArrowRight } from "react-icons/hi2";
import { IoChevronForward } from "react-icons/io5";
import {
  PiPhoneLight,
  PiEnvelopeLight,
  PiMapPinLight,
  PiClockLight,
} from "react-icons/pi";
import Link from "next/link";
import toast from "react-hot-toast";

gsap.registerPlugin(ScrollTrigger);

const COLORS = {
  primary: "#0D2340",
  primaryHover: "#1a2f5e",
  gold: "#C7A15A",
  goldLight: "#d4b365",
  textSecondary: "#3a4356",
  textMuted: "#5a6378",
  white: "#ffffff",
  bgLight: "#f8f9fb",
  borderLight: "rgba(13, 35, 64, 0.08)",
};

const contactInfo = [
  {
    icon: PiPhoneLight,
    title: "Phone",
    value: "+971569778391",
  },
  {
    icon: PiEnvelopeLight,
    title: "Email",
    value: "customercare@aeconveyancing.one",
  },
  {
    icon: PiMapPinLight,
    title: "Office",
    value: "London, United Kingdom",
  },
  {
    icon: PiClockLight,
    title: "Business Hours",
    value: "Monday – Friday: 9:00 AM – 6:00 PM",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const heroSectionRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  const contentSectionRef = useRef<HTMLDivElement>(null);
  const contactItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);
  const formBoxRef = useRef<HTMLFormElement>(null);
  const formFieldsRef = useRef<(HTMLDivElement | null)[]>([]);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const validContactItems = contactItemsRef.current.filter(
        (item): item is HTMLDivElement => item !== null
      );
      if (validContactItems.length > 0) {
        gsap.fromTo(
          validContactItems,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: validContactItems[0],
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

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

      gsap.fromTo(
        formBoxRef.current,
        { opacity: 0, x: 50, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formBoxRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const validFormFields = formFieldsRef.current.filter(
        (field): field is HTMLDivElement => field !== null
      );
      if (validFormFields.length > 0) {
        gsap.fromTo(
          validFormFields,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.3,
            scrollTrigger: {
              trigger: formBoxRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, contentSectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const icons = document.querySelectorAll("[data-contact-icon]");
    const handlers: {
      iconBox: Element;
      onEnter: () => void;
      onLeave: () => void;
    }[] = [];

    icons.forEach((iconBox) => {
      const icon = iconBox.querySelector("svg") as SVGSVGElement | null;

      const onEnter = () => {
        gsap.to(iconBox, {
          duration: 0.5,
          scale: 1.1,
          borderColor: COLORS.gold,
          background: "rgba(199, 161, 90, 0.08)",
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
        gsap.to(iconBox, {
          duration: 0.4,
          scale: 1,
          borderColor: "rgba(199, 161, 90, 0.3)",
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

      iconBox.addEventListener("mouseenter", onEnter);
      iconBox.addEventListener("mouseleave", onLeave);
      handlers.push({ iconBox, onEnter, onLeave });
    });

    return () => {
      handlers.forEach(({ iconBox, onEnter, onLeave }) => {
        iconBox.removeEventListener("mouseenter", onEnter);
        iconBox.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for this field when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Show success toast
      toast.success("Message sent successfully! 🎉");
      
      // Show additional success toast with details
      toast.custom((t) => (
        <Box
          sx={{
            background: "#ffffff",
            borderRadius: "12px",
            p: 3,
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            border: "1px solid rgba(199, 161, 90, 0.2)",
            maxWidth: "400px",
            minWidth: "300px",
          }}
        >
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: 600,
              color: COLORS.primary,
              fontFamily: "'Manrope', sans-serif",
              mb: 1,
            }}
          >
            ✅ Message Sent!
          </Typography>
          <Typography
            sx={{
              fontSize: "0.9rem",
              color: COLORS.textSecondary,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            We'll get back to you within 24 hours.
          </Typography>
          <Box
            sx={{
              mt: 2,
              pt: 2,
              borderTop: "1px solid rgba(13,35,64,0.06)",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.8rem",
                color: COLORS.textMuted,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <strong>Name:</strong> {formData.name}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.8rem",
                color: COLORS.textMuted,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <strong>Email:</strong> {formData.email}
            </Typography>
          </Box>
        </Box>
      ), {
        duration: 5000,
        position: 'top-right',
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Open mail client as backup (optional)
      // const mailtoLink = `mailto:customercare@aeconveyancing.one?subject=${encodeURIComponent(formData.subject)}&body=Name: ${encodeURIComponent(formData.name)}%0D%0AEmail: ${encodeURIComponent(formData.email)}%0D%0APhone: ${encodeURIComponent(formData.phone)}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(formData.message)}`;
      // window.location.href = mailtoLink;
    }, 1500);
  };

  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      background: COLORS.white,
      fontFamily: "'Inter', sans-serif",
      fontSize: "0.95rem",
      transition: "all 0.3s ease",
      "& fieldset": {
        borderColor: "rgba(13, 35, 64, 0.12)",
        borderWidth: "1px",
        transition: "all 0.3s ease",
      },
      "&:hover fieldset": {
        borderColor: "rgba(199, 161, 90, 0.5)",
      },
      "&.Mui-focused fieldset": {
        borderColor: COLORS.gold,
        borderWidth: "1.5px",
        boxShadow: "0 0 0 3px rgba(199, 161, 90, 0.1)",
      },
      "&.Mui-error fieldset": {
        borderColor: "#ef4444",
      },
    },
    "& .MuiInputBase-input": {
      py: 1.3,
      px: 1.5,
      color: COLORS.primary,
    },
    "& .MuiFormHelperText-root": {
      fontSize: "0.75rem",
      fontFamily: "'Inter', sans-serif",
      ml: 0,
    },
  };

  const labelSx = {
    fontSize: "0.85rem",
    fontWeight: 500,
    color: COLORS.textSecondary,
    mb: 1,
    fontFamily: "'Inter', sans-serif",
    display: "block",
  };

  return (
    <Box component="main">
      {/* Hero Section */}
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
              rgba(13, 35, 64, 0.95) 0%,
              rgba(13, 35, 64, 0.85) 40%,
              rgba(13, 35, 64, 0.55) 70%,
              rgba(13, 35, 64, 0.3) 100%
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
              "linear-gradient(90deg, transparent 0%, rgba(199, 161, 90, 0.5) 50%, transparent 100%)",
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
              fontFamily: "'Manrope', sans-serif",
              textShadow: "0 2px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            Contact Us
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
            Get in touch with our team today.
          </Typography>

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
              Contact Us
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Content Section */}
      <Box
        ref={contentSectionRef}
        sx={{
          background: COLORS.white,
          py: { xs: 6, md: 9 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(circle at 10% 20%, rgba(199, 161, 90, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 90% 80%, rgba(13, 35, 64, 0.02) 0%, transparent 50%)
            `,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={{ xs: 5, md: 6 }}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Stack spacing={3.5} sx={{ mb: 4 }}>
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <Box
                      key={index}
                      ref={(el: HTMLDivElement | null) => {
                        contactItemsRef.current[index] = el;
                      }}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 2.5,
                      }}
                    >
                      <Box
                        data-contact-icon
                        sx={{
                          flexShrink: 0,
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          border: "1.5px solid rgba(199, 161, 90, 0.3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <Icon size={24} color={COLORS.gold} />
                      </Box>

                      <Box sx={{ pt: 0.3 }}>
                        <Typography
                          sx={{
                            fontSize: "1rem",
                            fontWeight: 700,
                            color: COLORS.primary,
                            mb: 0.3,
                            lineHeight: 1.3,
                            fontFamily: "'Manrope', sans-serif",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {info.title}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "0.9rem",
                            color: COLORS.textMuted,
                            lineHeight: 1.5,
                            fontWeight: 400,
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          {info.value}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Stack>

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
                  boxShadow: "0 8px 25px rgba(13, 35, 64, 0.2)",
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
                    boxShadow: "0 16px 40px rgba(13, 35, 64, 0.35)",
                    "&::before": { left: "100%" },
                  },
                  transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                Book a Consultation
              </Button>
            </Grid>

            <Grid size={{ xs: 12, md: 7 }}>
              <Box
                ref={formBoxRef}
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  background: COLORS.bgLight,
                  border: "1px solid rgba(13, 35, 64, 0.06)",
                  borderRadius: "16px",
                  p: { xs: 3, sm: 4, md: 5 },
                  boxShadow: "0 4px 20px rgba(13, 35, 64, 0.04)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "1.35rem", md: "1.5rem" },
                    fontWeight: 700,
                    color: COLORS.primary,
                    mb: 3.5,
                    fontFamily: "'Manrope', sans-serif",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Send us a message
                </Typography>

                <Grid container spacing={2.5}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box
                      ref={(el: HTMLDivElement | null) => {
                        formFieldsRef.current[0] = el;
                      }}
                    >
                      <Typography sx={labelSx}>Your Name *</Typography>
                      <TextField
                        fullWidth
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        variant="outlined"
                        error={!!errors.name}
                        helperText={errors.name}
                        sx={textFieldSx}
                      />
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box
                      ref={(el: HTMLDivElement | null) => {
                        formFieldsRef.current[1] = el;
                      }}
                    >
                      <Typography sx={labelSx}>Email Address *</Typography>
                      <TextField
                        fullWidth
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        variant="outlined"
                        error={!!errors.email}
                        helperText={errors.email}
                        sx={textFieldSx}
                      />
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Box
                      ref={(el: HTMLDivElement | null) => {
                        formFieldsRef.current[2] = el;
                      }}
                    >
                      <Typography sx={labelSx}>Phone Number *</Typography>
                      <TextField
                        fullWidth
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        variant="outlined"
                        error={!!errors.phone}
                        helperText={errors.phone}
                        sx={textFieldSx}
                      />
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Box
                      ref={(el: HTMLDivElement | null) => {
                        formFieldsRef.current[3] = el;
                      }}
                    >
                      <Typography sx={labelSx}>Subject *</Typography>
                      <TextField
                        fullWidth
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        variant="outlined"
                        error={!!errors.subject}
                        helperText={errors.subject}
                        sx={textFieldSx}
                      />
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Box
                      ref={(el: HTMLDivElement | null) => {
                        formFieldsRef.current[4] = el;
                      }}
                    >
                      <Typography sx={labelSx}>Your Message *</Typography>
                      <TextField
                        fullWidth
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        multiline
                        rows={5}
                        variant="outlined"
                        error={!!errors.message}
                        helperText={errors.message}
                        sx={textFieldSx}
                      />
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Box
                      ref={(el: HTMLDivElement | null) => {
                        formFieldsRef.current[5] = el;
                      }}
                      sx={{ mt: 1 }}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        sx={{
                          background: COLORS.primary,
                          color: COLORS.white,
                          px: 4,
                          py: 1.4,
                          fontSize: "0.9rem",
                          fontWeight: 600,
                          borderRadius: "8px",
                          textTransform: "none",
                          boxShadow: "0 8px 25px rgba(13, 35, 64, 0.2)",
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
                            transform: "translateY(-3px)",
                            boxShadow: "0 14px 35px rgba(13, 35, 64, 0.3)",
                            "&::before": { left: "100%" },
                          },
                          "&:disabled": {
                            opacity: 0.7,
                          },
                          transition:
                            "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        }}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}