"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Stack,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import { FaLinkedinIn, FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import { useThemeMode } from "@/context/ThemeContext";

const teamMembers = [
  {
    name: "Keone Fernandes",
    role: "Director | Head of Conveyancing",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    bio: "With over 17 years of experience in real estate operations and transaction management, Keone leads the strategic direction of 1 Conveyancing ensuring every client receives a seamless and professional experience.",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Beckagael Mae Batuto",
    role: "Client Success & Operations Manager",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    bio: "Beckagael plays a key role in client communication, transaction coordination and operational support. She ensures every client receives exceptional service throughout their property journey.",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Mark Kelvin Loreto",
    role: "Sales Progression Manager",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    bio: "Mark oversees transaction progression and stakeholder coordination across active property sales, ensuring deadlines are met and transactions remain on track.",
    linkedin: "https://linkedin.com",
  },
];

export default function OurTeam() {
  const { mode } = useThemeMode();
  const isDark = mode === "dark";

  const colors = {
    pageBg: isDark ? "#0a0f1c" : "#f8f9fc",
    cardBg: isDark ? "#0f172a" : "#ffffff",
    text: isDark ? "#ffffff" : "#0D2340",
    subText: isDark ? "#a0aec0" : "#5a6478",
    border: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
    iconBg: isDark ? "rgba(199,161,90,0.15)" : "rgba(13,35,64,0.08)",
    iconColor: isDark ? "#C7A15A" : "#0D2340",
  };

  return (
    <Box component="section" sx={{ background: colors.pageBg }}>
      {/* ========== HERO BANNER ========== */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          minHeight: { xs: "280px", md: "340px" },
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=90')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* DARK NAVY OVERLAY */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(
              90deg,
              rgba(13, 35, 64, 0.98) 0%,
              rgba(13, 35, 64, 0.92) 30%,
              rgba(13, 35, 64, 0.7) 50%,
              rgba(13, 35, 64, 0.3) 75%,
              rgba(13, 35, 64, 0.1) 100%
            )`,
            zIndex: 1,
          }}
        />

        {/* GOLD TOP LINE */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(199, 161, 90, 0.5) 50%, transparent 100%)",
            zIndex: 2,
          }}
        />

        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 3 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                mb: 2,
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Our Team
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "0.95rem", md: "1.1rem" },
                color: "rgba(255, 255, 255, 0.85)",
                lineHeight: 1.6,
                mb: 3,
                maxWidth: "500px",
              }}
            >
              Experienced professionals dedicated <br />
              to progressing your property transaction.
            </Typography>

            {/* ✅ FIXED: alignItems moved to sx */}
            <Stack
              direction="row"
              spacing={1.5}
              sx={{ mt: 3, alignItems: "center" }}
            >
              <Link href="/" style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    color: "rgba(255, 255, 255, 0.7)",
                    cursor: "pointer",
                    transition: "color 0.3s ease",
                    "&:hover": { color: "#C7A15A" },
                  }}
                >
                  Home
                </Typography>
              </Link>
              <FaChevronRight size={10} color="rgba(255,255,255,0.5)" />
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  color: "#C7A15A",
                  fontWeight: 600,
                }}
              >
                Team
              </Typography>
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* ========== TEAM CARDS ========== */}
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {teamMembers.map((member, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Card
                  sx={{
                    background: colors.cardBg,
                    borderRadius: "12px",
                    border: `1px solid ${colors.border}`,
                    overflow: "hidden",
                    boxShadow: isDark
                      ? "0 4px 24px rgba(0,0,0,0.3)"
                      : "0 4px 24px rgba(0,0,0,0.06)",
                    transition: "all 0.4s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: isDark
                        ? "0 20px 40px rgba(0,0,0,0.5)"
                        : "0 20px 40px rgba(13,35,64,0.12)",
                      "& .member-image": {
                        transform: "scale(1.05)",
                      },
                    },
                  }}
                >
                  {/* IMAGE */}
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: { xs: "320px", md: "360px" },
                      overflow: "hidden",
                      background: "#f0f0f0",
                    }}
                  >
                    <Box
                      className="member-image"
                      sx={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `url(${member.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center top",
                        backgroundRepeat: "no-repeat",
                        transition: "transform 0.6s ease",
                      }}
                    />
                  </Box>

                  {/* CONTENT */}
                  <Box sx={{ p: { xs: 2.5, md: 3 } }}>
                    <Typography
                      sx={{
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        color: colors.text,
                        mb: 0.5,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {member.name}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "0.85rem",
                        color: "#C7A15A",
                        fontWeight: 600,
                        mb: 2,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {member.role}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "0.875rem",
                        color: colors.subText,
                        lineHeight: 1.7,
                        mb: 3,
                      }}
                    >
                      {member.bio}
                    </Typography>

                    <IconButton
                      component="a"
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        width: 38,
                        height: 38,
                        background: colors.iconBg,
                        borderRadius: "8px",
                        color: colors.iconColor,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          background: "#0077B5",
                          color: "#ffffff",
                          transform: "translateY(-2px)",
                          boxShadow: "0 6px 16px rgba(0, 119, 181, 0.3)",
                        },
                      }}
                    >
                      <FaLinkedinIn size={16} />
                    </IconButton>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ========== BOTTOM CTA BAR ========== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Box
          sx={{
            background: "#0D2340",
            py: { xs: 3, md: 4 },
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "1px",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(199, 161, 90, 0.5) 50%, transparent 100%)",
            }}
          />

          <Container maxWidth="xl">
            <Typography
              sx={{
                fontSize: { xs: "1rem", md: "1.15rem" },
                color: "#ffffff",
                textAlign: "center",
                fontWeight: 400,
                letterSpacing: "0.01em",
                fontStyle: "italic",
              }}
            >
              Working together to deliver a better experience for every client.
            </Typography>
          </Container>
        </Box>
      </motion.div>
    </Box>
  );
}