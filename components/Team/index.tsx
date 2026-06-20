"use client";

import React, { useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLinkedin } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const COLORS = {
  primary: "#0D2340",
  gold: "#C7A15A",
  textSecondary: "#3a4356",
};

const team = [
  {
    name: "Keone Fernandes",
    role: "Director | Head of Conveyancing",
    bio: "With more than 17 years of experience in real estate operations, transaction management, and client services, Keone leads the strategic direction of 1 Conveyancing. Having worked with leading property organisations across the UAE, he brings extensive expertise in conveyancing operations, client relationship management, and transaction progression. His focus is ensuring every client receives a seamless and professional experience from start to finish.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    linkedin: "#",
  },
  {
    name: "Beckagael Mae Batuto",
    role: "Client Success & Operations Manager",
    bio: "Beckagael plays a key role in client communication, transaction coordination, and operational support. Working closely with buyers, sellers, brokers, and legal professionals, she helps ensure every transaction progresses smoothly while maintaining exceptional client service standards.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    linkedin: "#",
  },
  {
    name: "Mark Kelvin Loreto",
    role: "Sales Progression Manager",
    bio: "Mark oversees transaction progression and stakeholder coordination across active property sales. His attention to detail and proactive approach help clients navigate the conveyancing process efficiently, ensuring deadlines are met and transactions remain on track.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    linkedin: "#",
  },
];

export default function Team() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box ref={sectionRef} sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
          <Typography
            sx={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: COLORS.gold,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              mb: 2,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            The People Behind
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              fontWeight: 700,
              color: COLORS.primary,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              fontFamily: "'Manrope', sans-serif",
              mb: 2,
            }}
          >
            Meet the Team
          </Typography>
          <Box
            sx={{
              width: 60,
              height: 3,
              background: `linear-gradient(90deg, ${COLORS.gold}, #d4b365)`,
              borderRadius: 4,
              mx: "auto",
            }}
          />
        </Box>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {team.map((member, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Paper
                ref={(el: HTMLDivElement | null) => {
                  cardsRef.current[index] = el;
                }}
                elevation={0}
                sx={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  background: "#ffffff",
                  border: "1px solid rgba(13,35,64,0.06)",
                  transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  height: "100%",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 24px 48px rgba(13,35,64,0.1)",
                    borderColor: "rgba(199,161,90,0.2)",
                    "& .team-image": {
                      transform: "scale(1.05)",
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    height: 280,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <Box
                    component="img"
                    src={member.image}
                    alt={member.name}
                    className="team-image"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.6s ease",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "50%",
                      background:
                        "linear-gradient(180deg, transparent, rgba(13,35,64,0.6))",
                    }}
                  />
                </Box>

                <Box sx={{ p: { xs: 3, md: 3.5 } }}>
                  <Typography
                    sx={{
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: COLORS.primary,
                      mb: 0.5,
                      fontFamily: "'Manrope', sans-serif",
                    }}
                  >
                    {member.name}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: COLORS.gold,
                      mb: 2,
                      fontFamily: "'Inter', sans-serif",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {member.role}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "0.88rem",
                      color: COLORS.textSecondary,
                      lineHeight: 1.7,
                      mb: 2.5,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {member.bio}
                  </Typography>

                  <Box
                    component="a"
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 1,
                      color: COLORS.primary,
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      fontFamily: "'Inter', sans-serif",
                      transition: "color 0.3s ease",
                      "&:hover": { color: COLORS.gold },
                    }}
                  >
                    <FaLinkedin size={16} />
                    LinkedIn
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}