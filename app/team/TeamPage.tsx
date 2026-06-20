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
import {
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBriefcase,
  FaAward,
  FaBuilding,
} from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi2";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const COLORS = {
  primary: "#0D2340",
  primaryLight: "#1a2f5e",
  gold: "#C7A15A",
  goldLight: "#d4b365",
  textSecondary: "#3a4356",
  white: "#ffffff",
  lightBg: "#F8F8F8",
};

const teamMembers = [
  {
    name: "Keone Fernandes",
    role: "Director | Head of Conveyancing",
    bio: "With more than 17 years of experience in real estate operations, transaction management, and client services, Keone leads the strategic direction of 1 Conveyancing. Having worked with leading property organisations across the UAE, he brings extensive expertise in conveyancing operations, client relationship management, and transaction progression. His focus is ensuring every client receives a seamless and professional experience from start to finish.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    email: "keone@1conveyancing.com",
    linkedin: "https://linkedin.com/in/keonefernandes",
    experience: "17+ Years",
    location: "London | Dubai",
    specialization: "Strategic Leadership, Transaction Management",
    certifications: ["Real Estate Operations", "Client Relationship Management"],
    quote: "Every transaction deserves precision, care, and unwavering commitment.",
  },
  {
    name: "Beckagael Mae Batuto",
    role: "Client Success & Operations Manager",
    bio: "Beckagael plays a key role in client communication, transaction coordination, and operational support. Working closely with buyers, sellers, brokers, and legal professionals, she helps ensure every transaction progresses smoothly while maintaining exceptional client service standards.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    email: "beckagael@1conveyancing.com",
    linkedin: "https://linkedin.com/in/beckagaelbatuto",
    experience: "8+ Years",
    location: "London",
    specialization: "Client Success, Operations Management",
    certifications: ["Client Communication", "Transaction Coordination"],
    quote: "Clear communication is the foundation of every successful transaction.",
  },
  {
    name: "Mark Kelvin Loreto",
    role: "Sales Progression Manager",
    bio: "Mark oversees transaction progression and stakeholder coordination across active property sales. His attention to detail and proactive approach help clients navigate the conveyancing process efficiently, ensuring deadlines are met and transactions remain on track.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    email: "mark@1conveyancing.com",
    linkedin: "https://linkedin.com/in/markloreto",
    experience: "6+ Years",
    location: "Dubai",
    specialization: "Sales Progression, Stakeholder Coordination",
    certifications: ["Property Sales", "Deadline Management"],
    quote: "Proactive management turns complex chains into smooth completions.",
  },
];

export default function TeamPage() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const heroContentRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const valuesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroContentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      if (statsRef.current) {
        const statItems = statsRef.current.querySelectorAll("[data-stat-item]");
        gsap.fromTo(
          statItems,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (valuesRef.current) {
        const valueCards = valuesRef.current.querySelectorAll("[data-value-card]");
        gsap.fromTo(
          valueCards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: valuesRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", background: COLORS.white, overflowX: "hidden" }}>
      <Navbar />

      <Box
        ref={heroRef}
        sx={{
          position: "relative",
          pt: { xs: "120px", md: "140px", lg: "160px" },
          pb: { xs: 8, md: 12 },
          background: `linear-gradient(135deg, ${COLORS.primary} 0%, #0a1a33 50%, #0D2340 100%)`,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(199,161,90,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-80px",
            left: "-60px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(199,161,90,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
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

        <Container maxWidth="xl">
          <Box ref={heroContentRef} sx={{ position: "relative", zIndex: 1 }}>
            <Box sx={{ display: "inline-block", mb: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.2,
                  background: "rgba(199, 161, 90, 0.12)",
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
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: COLORS.gold,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Our People
                </Typography>
              </Box>
            </Box>

            <Typography
              component="h1"
              sx={{
                fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                fontWeight: 700,
                color: COLORS.white,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                fontFamily: "'Manrope', sans-serif",
                mb: 3,
                maxWidth: "700px",
              }}
            >
              Meet the Team Behind{" "}
              <Box component="span" sx={{ color: COLORS.gold }}>
                1 Conveyancing
              </Box>
            </Typography>

            <Box
              sx={{
                width: 60,
                height: 3,
                background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.goldLight})`,
                borderRadius: 4,
                mb: 4,
              }}
            />

            <Typography
              sx={{
                fontSize: { xs: "1rem", md: "1.15rem" },
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.8,
                maxWidth: "600px",
                fontFamily: "'Inter', sans-serif",
                mb: 6,
              }}
            >
              Experienced professionals dedicated to guiding your property transactions with expertise, integrity, and personal attention.
            </Typography>

            <Box
              ref={statsRef}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: { xs: 3, md: 6 },
              }}
            >
              {[
                { value: "17+", label: "Combined Years", icon: FaAward },
                { value: "3", label: "Core Specialists", icon: FaBriefcase },
                { value: "2", label: "Global Offices", icon: FaBuilding },
                { value: "1000+", label: "Transactions", icon: FaAward },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <Box
                    key={i}
                    data-stat-item
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "12px",
                        background: "rgba(199,161,90,0.1)",
                        border: "1px solid rgba(199,161,90,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: COLORS.gold,
                      }}
                    >
                      <Icon size={20} />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "1.5rem",
                          fontWeight: 700,
                          color: COLORS.white,
                          fontFamily: "'Manrope', sans-serif",
                          lineHeight: 1,
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.8rem",
                          color: "rgba(255,255,255,0.5)",
                          fontFamily: "'Inter', sans-serif",
                          mt: 0.5,
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 8, md: 12 }, background: COLORS.lightBg }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
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
              Leadership
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3.2rem" },
                fontWeight: 700,
                color: COLORS.primary,
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                fontFamily: "'Manrope', sans-serif",
                mb: 2,
              }}
            >
              Our Experts
            </Typography>
            <Box
              sx={{
                width: 60,
                height: 3,
                background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.goldLight})`,
                borderRadius: 4,
                mx: "auto",
              }}
            />
          </Box>

          <Grid container spacing={{ xs: 4, md: 5 }}>
            {teamMembers.map((member, index) => (
              <Grid size={{ xs: 12, lg: 4 }} key={index}>
                <Paper
                  ref={(el: HTMLDivElement | null) => {
                    cardsRef.current[index] = el;
                  }}
                  elevation={0}
                  sx={{
                    borderRadius: "24px",
                    overflow: "hidden",
                    background: COLORS.white,
                    border: "1px solid rgba(13,35,64,0.06)",
                    transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    height: "100%",
                    position: "relative",
                    "&:hover": {
                      transform: "translateY(-12px)",
                      boxShadow: "0 32px 64px rgba(13,35,64,0.12)",
                      borderColor: "rgba(199,161,90,0.2)",
                      "& .member-image": {
                        transform: "scale(1.08)",
                      },
                      "& .member-overlay": {
                        opacity: 1,
                      },
                      "& .member-quote": {
                        opacity: 1,
                        transform: "translateY(0)",
                      },
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: { xs: 320, md: 380 },
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      component="img"
                      src={member.image}
                      alt={member.name}
                      className="member-image"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.7s ease",
                      }}
                    />
                    <Box
                      className="member-overlay"
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(180deg, transparent 30%, rgba(13,35,64,0.85) 100%)",
                        opacity: 0.6,
                        transition: "opacity 0.4s ease",
                      }}
                    />
                    <Box
                      className="member-quote"
                      sx={{
                        position: "absolute",
                        bottom: 24,
                        left: 24,
                        right: 24,
                        opacity: 0,
                        transform: "translateY(20px)",
                        transition: "all 0.5s ease 0.1s",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.95rem",
                          fontStyle: "italic",
                          color: "rgba(255,255,255,0.9)",
                          lineHeight: 1.6,
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        &ldquo;{member.quote}&rdquo;
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ p: { xs: 3, md: 4 } }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 3,
                          height: 16,
                          borderRadius: 4,
                          background: `linear-gradient(180deg, ${COLORS.gold}, ${COLORS.goldLight})`,
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: COLORS.gold,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {member.experience} Experience
                      </Typography>
                    </Box>

                    <Typography
                      sx={{
                        fontSize: "1.4rem",
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
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        color: COLORS.gold,
                        mb: 3,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {member.role}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "0.9rem",
                        color: COLORS.textSecondary,
                        lineHeight: 1.8,
                        mb: 3,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {member.bio}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                        mb: 3,
                      }}
                    >
                      {member.certifications.map((cert, i) => (
                        <Box
                          key={i}
                          sx={{
                            px: 2,
                            py: 0.6,
                            borderRadius: "8px",
                            background: "rgba(199,161,90,0.08)",
                            border: "1px solid rgba(199,161,90,0.15)",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              color: COLORS.gold,
                              fontFamily: "'Inter', sans-serif",
                            }}
                          >
                            {cert}
                          </Typography>
                        </Box>
                      ))}
                    </Box>

                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 2,
                        mb: 3,
                        p: 2.5,
                        borderRadius: "16px",
                        background: COLORS.lightBg,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <FaMapMarkerAlt size={14} color={COLORS.gold} />
                        <Typography
                          sx={{
                            fontSize: "0.85rem",
                            color: COLORS.textSecondary,
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          {member.location}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <FaBriefcase size={14} color={COLORS.gold} />
                        <Typography
                          sx={{
                            fontSize: "0.85rem",
                            color: COLORS.textSecondary,
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          {member.specialization}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                      }}
                    >
                      <Box
                        component="a"
                        href={`mailto:${member.email}`}
                        sx={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 1,
                          py: 1.2,
                          borderRadius: "12px",
                          background: COLORS.primary,
                          color: COLORS.white,
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          fontFamily: "'Inter', sans-serif",
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                          "&:hover": {
                            background: COLORS.primaryLight,
                            transform: "translateY(-2px)",
                            boxShadow: "0 8px 20px rgba(13,35,64,0.2)",
                          },
                        }}
                      >
                        <FaEnvelope size={14} />
                        Email
                      </Box>
                      <Box
                        component="a"
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 1,
                          py: 1.2,
                          borderRadius: "12px",
                          border: `1.5px solid ${COLORS.primary}`,
                          color: COLORS.primary,
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          fontFamily: "'Inter', sans-serif",
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                          "&:hover": {
                            background: COLORS.primary,
                            color: COLORS.white,
                            transform: "translateY(-2px)",
                            boxShadow: "0 8px 20px rgba(13,35,64,0.2)",
                          },
                        }}
                      >
                        <FaLinkedin size={14} />
                        LinkedIn
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box
        ref={valuesRef}
        sx={{
          py: { xs: 8, md: 12 },
          background: COLORS.primary,
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
            height: "2px",
            background: `linear-gradient(90deg, transparent 0%, ${COLORS.gold}40 30%, ${COLORS.gold}80 50%, ${COLORS.gold}40 70%, transparent 100%)`,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "-80px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(199,161,90,0.05) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
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
              Why Choose Us
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3.2rem" },
                fontWeight: 700,
                color: COLORS.white,
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                fontFamily: "'Manrope', sans-serif",
                mb: 2,
              }}
            >
              The 1 Conveyancing Difference
            </Typography>
            <Box
              sx={{
                width: 60,
                height: 3,
                background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.goldLight})`,
                borderRadius: 4,
                mx: "auto",
              }}
            />
          </Box>

          <Grid container spacing={{ xs: 3, md: 4 }}>
            {[
              {
                title: "Dedicated Transaction Specialists",
                description: "Every client receives focused attention from experts who understand the nuances of property transactions.",
              },
              {
                title: "Transparent Communication",
                description: "Real-time updates and clear timelines keep all parties informed at every stage of the process.",
              },
              {
                title: "Faster Completion Times",
                description: "Proactive management and early issue resolution help transactions progress efficiently.",
              },
              {
                title: "Strong Industry Relationships",
                description: "Established connections with lenders, solicitors, and agents facilitate smoother transactions.",
              },
              {
                title: "Client-First Service",
                description: "Your priorities guide our approach, ensuring personalised support tailored to your needs.",
              },
              {
                title: "End-to-End Transaction Support",
                description: "From offer acceptance to completion, we manage every detail so you don't have to worry.",
              },
            ].map((item, index) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
                <Box
                  data-value-card
                  sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: "20px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    height: "100%",
                    transition: "all 0.4s ease",
                    "&:hover": {
                      background: "rgba(255,255,255,0.06)",
                      borderColor: "rgba(199,161,90,0.2)",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "8px",
                        background: "rgba(199,161,90,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: COLORS.gold,
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        fontFamily: "'Manrope', sans-serif",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </Box>
                    <Box
                      sx={{
                        flex: 1,
                        height: "1px",
                        background: "linear-gradient(90deg, rgba(199,161,90,0.2), transparent)",
                      }}
                    />
                  </Box>

                  <Typography
                    sx={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: COLORS.white,
                      mb: 1.5,
                      fontFamily: "'Manrope', sans-serif",
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      color: "rgba(255,255,255,0.6)",
                      lineHeight: 1.7,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box
        sx={{
          py: { xs: 8, md: 10 },
          background: COLORS.lightBg,
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              textAlign: "center",
              maxWidth: "700px",
              mx: "auto",
            }}
          >
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem" },
                fontWeight: 700,
                color: COLORS.primary,
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                fontFamily: "'Manrope', sans-serif",
                mb: 3,
              }}
            >
              Ready to Work With Our Team?
            </Typography>

            <Typography
              sx={{
                fontSize: "1rem",
                color: COLORS.textSecondary,
                lineHeight: 1.8,
                mb: 4,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Connect with our specialists and experience the difference of dedicated property transaction support.
            </Typography>

            <Box
              component={Link}
              href="/contact"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1.5,
                px: 5,
                py: 1.8,
                borderRadius: "14px",
                background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
                color: COLORS.white,
                fontSize: "0.95rem",
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                textDecoration: "none",
                transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                boxShadow: "0 8px 25px rgba(13,35,64,0.25)",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 16px 40px rgba(13,35,64,0.35)",
                },
              }}
            >
              Get in Touch
              <HiArrowRight size={18} />
            </Box>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}