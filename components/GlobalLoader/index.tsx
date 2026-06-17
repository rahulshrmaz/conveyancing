"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

interface GlobalLoaderProps {
  label?: string;
}

export default function GlobalLoader({
  label = "Loading Excellence",
}: GlobalLoaderProps) {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #ffffff 0%, #f8f9fc 50%, #ffffff 100%)",
        overflow: "hidden",
      }}
    >
      {/* BACKGROUND DECORATIVE CIRCLES */}
      <Box
        component={motion.div}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        sx={{
          position: "absolute",
          top: "20%",
          left: "15%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, #1a237e 0%, transparent 70%)",
        }}
      />
      <Box
        component={motion.div}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        sx={{
          position: "absolute",
          bottom: "20%",
          right: "15%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, #c8a951 0%, transparent 70%)",
        }}
      />

      {/* MAIN CONTENT */}
      <Box
        sx={{
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* LOGO */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99],
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "baseline",
                gap: 0.5,
                position: "relative",
              }}
            >
              <Typography
                component={motion.span}
                animate={{
                  textShadow: [
                    "0 0 20px rgba(26, 35, 126, 0.2)",
                    "0 0 30px rgba(26, 35, 126, 0.4)",
                    "0 0 20px rgba(26, 35, 126, 0.2)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                sx={{
                  fontSize: { xs: "4rem", md: "5rem" },
                  fontWeight: 700,
                  color: "#1a237e",
                  lineHeight: 1,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                1
              </Typography>
              <Box
                component={motion.div}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                sx={{
                  width: { xs: 10, md: 14 },
                  height: { xs: 10, md: 14 },
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #c8a951 0%, #ffd982 100%)",
                  boxShadow: "0 0 20px rgba(200, 169, 81, 0.6)",
                }}
              />
            </Box>
            <Typography
              sx={{
                fontSize: { xs: "0.75rem", md: "0.9rem" },
                fontWeight: 600,
                letterSpacing: "0.35em",
                color: "#1a237e",
                mt: 1,
              }}
            >
              CONVEYANCING
            </Typography>
          </Box>
        </motion.div>

        {/* PREMIUM LOADER */}
        <Box
          sx={{
            position: "relative",
            width: 80,
            height: 80,
            mx: "auto",
            mb: 4,
          }}
        >
          {/* Outer Ring */}
          <Box
            component={motion.div}
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            sx={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "3px solid transparent",
              borderTopColor: "#1a237e",
              borderRightColor: "#1a237e",
            }}
          />

          {/* Inner Ring */}
          <Box
            component={motion.div}
            animate={{ rotate: -360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
            sx={{
              position: "absolute",
              inset: "12px",
              borderRadius: "50%",
              border: "3px solid transparent",
              borderTopColor: "#c8a951",
              borderLeftColor: "#c8a951",
            }}
          />

          {/* Center Dot */}
          <Box
            component={motion.div}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 12,
              height: 12,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, #1a237e 0%, #534bae 100%)",
              boxShadow: "0 0 15px rgba(26, 35, 126, 0.5)",
            }}
          />
        </Box>

        {/* LOADING TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
            }}
          >
            <Typography
              component={motion.p}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              sx={{
                fontSize: { xs: "0.7rem", md: "0.8rem" },
                color: "#6b7280",
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                fontWeight: 500,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {label}
            </Typography>
            {/* Animated Dots */}
            <Box sx={{ display: "flex", gap: 0.3, ml: 0.5 }}>
              {[0, 1, 2].map((i) => (
                <Box
                  key={i}
                  component={motion.span}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                  sx={{
                    width: 3,
                    height: 3,
                    borderRadius: "50%",
                    background: "#1a237e",
                  }}
                />
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* PROGRESS BAR */}
        <Box
          sx={{
            mt: 4,
            width: { xs: 200, md: 240 },
            mx: "auto",
            height: 2,
            background: "rgba(26, 35, 126, 0.1)",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <Box
            component={motion.div}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            sx={{
              width: "50%",
              height: "100%",
              background:
                "linear-gradient(90deg, transparent 0%, #1a237e 50%, transparent 100%)",
              borderRadius: "10px",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}