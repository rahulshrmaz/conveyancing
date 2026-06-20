"use client";

import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import gsap from "gsap";

const COLORS = {
  primary: "#0D2340",
  gold: "#C7A15A",
  goldLight: "#d4b365",
};

export default function GlobalLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoRef.current,
        { scale: 0, opacity: 0, rotation: -180 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
        }
      );

      gsap.fromTo(
        barRef.current,
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: 2,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.5,
          ease: "power2.out",
        }
      );
    }, loaderRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={loaderRef}
      sx={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: COLORS.primary,
        zIndex: 9999,
      }}
    >
      <Box
        ref={logoRef}
        sx={{
          width: { xs: 100, sm: 120, md: 140 },
          height: { xs: 100, sm: 120, md: 140 },
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.05)",
          border: "2px solid rgba(199, 161, 90, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 4,
          position: "relative",
        }}
      >
        <Box
          component="img"
          src="/logo.png"
          alt="Loading"
          sx={{
            width: "70%",
            height: "70%",
            objectFit: "contain",
          }}
        />
      </Box>

      <Box
        sx={{
          width: { xs: 200, sm: 280, md: 320 },
          height: 3,
          borderRadius: 4,
          background: "rgba(255, 255, 255, 0.1)",
          overflow: "hidden",
          mb: 2.5,
        }}
      >
        <Box
          ref={barRef}
          sx={{
            width: "100%",
            height: "100%",
            background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.goldLight})`,
            borderRadius: 4,
          }}
        />
      </Box>

      <Typography
        ref={textRef}
        sx={{
          fontSize: { xs: "0.75rem", sm: "0.85rem" },
          fontWeight: 500,
          color: "rgba(255, 255, 255, 0.5)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        Loading...
      </Typography>
    </Box>
  );
}