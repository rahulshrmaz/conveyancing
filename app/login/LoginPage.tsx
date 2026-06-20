"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert,
  Snackbar,
} from "@mui/material";
import gsap from "gsap";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaUser,
  FaPhone,
  FaLinkedin,
  FaGoogle,
} from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi2";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const COLORS = {
  primary: "#0D2340",
  primaryLight: "#1a2f5e",
  gold: "#C7A15A",
  goldLight: "#d4b365",
  textSecondary: "#3a4356",
  white: "#ffffff",
  error: "#ef4444",
  success: "#22c55e",
};

export default function LoginPage() {
  const router = useRouter();
  const [isFlipped, setIsFlipped] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");

  const cardRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftPanelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftPanelRef.current,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.2 }
      );

      gsap.fromTo(
        containerRef.current,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.4 }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setLoginError("");
    setSignupError("");
  };

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");

    // Dummy validation
    if (!loginData.email || !loginData.password) {
      setLoginError("Please fill in all fields");
      setIsLoading(false);
      toast.error("Please fill in all fields");
      return;
    }

    if (!loginData.email.includes("@")) {
      setLoginError("Please enter a valid email");
      setIsLoading(false);
      toast.error("Please enter a valid email");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Login successful! 🎉");
      // Redirect to dashboard after 1.5 seconds
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    }, 1500);
  };

  // Handle Signup
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSignupError("");

    // Dummy validation
    if (!signupData.name || !signupData.email || !signupData.phone || !signupData.password || !signupData.confirmPassword) {
      setSignupError("Please fill in all fields");
      setIsLoading(false);
      toast.error("Please fill in all fields");
      return;
    }

    if (!signupData.email.includes("@")) {
      setSignupError("Please enter a valid email");
      setIsLoading(false);
      toast.error("Please enter a valid email");
      return;
    }

    if (signupData.password.length < 6) {
      setSignupError("Password must be at least 6 characters");
      setIsLoading(false);
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      setSignupError("Passwords do not match");
      setIsLoading(false);
      toast.error("Passwords do not match");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created successfully! 🎉");
      // Flip to login after 1.5 seconds
      setTimeout(() => {
        setIsFlipped(false);
        setSignupData({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
      }, 1500);
    }, 1500);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background: COLORS.white,
        overflow: "hidden",
      }}
    >
      {/* Left Panel */}
      <Box
        ref={leftPanelRef}
        sx={{
          display: { xs: "none", lg: "flex" },
          width: "45%",
          position: "relative",
          background: `linear-gradient(135deg, ${COLORS.primary} 0%, #0a1a33 50%, #0D2340 100%)`,
          alignItems: "center",
          justifyContent: "center",
          p: 8,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "-100px",
            right: "-80px",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(199,161,90,0.08) 0%, transparent 70%)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-60px",
            left: "-40px",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(199,161,90,0.05) 0%, transparent 70%)",
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

        <Box sx={{ position: "relative", zIndex: 1, maxWidth: "440px" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 6,
              }}
            >
              <Box sx={{ height: 50, width: 50, position: "relative" }}>
                <Image
                  src="/logo.png"
                  alt="1 Conveyancing"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  color: COLORS.white,
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                1 Conveyancing
              </Typography>
            </Box>
          </Link>

          <Typography
            sx={{
              fontSize: "2.5rem",
              fontWeight: 700,
              color: COLORS.white,
              lineHeight: 1.2,
              fontFamily: "'Manrope', sans-serif",
              mb: 3,
            }}
          >
            Property Transactions{" "}
            <Box component="span" sx={{ color: COLORS.gold }}>
              Managed
            </Box>
          </Typography>

          <Typography
            sx={{
              fontSize: "1rem",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.8,
              fontFamily: "'Inter', sans-serif",
              mb: 8,
            }}
          >
            Your trusted partner from offer acceptance to completion. Secure, transparent, and efficient property transaction support.
          </Typography>

          <Box sx={{ display: "flex", gap: 3 }}>
            {[
              { value: "1,000+", label: "Transactions" },
              { value: "98%", label: "Satisfaction" },
              { value: "17+", label: "Years" },
            ].map((stat, i) => (
              <Box key={i}>
                <Typography
                  sx={{
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    color: COLORS.gold,
                    fontFamily: "'Manrope', sans-serif",
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Right Panel */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 3, md: 6 },
          background: "#F8F8F8",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 24,
            left: 24,
            display: { xs: "block", lg: "none" },
          }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box sx={{ height: 36, width: 36, position: "relative" }}>
                <Image
                  src="/logo.png"
                  alt="1 Conveyancing"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: COLORS.primary,
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                1 Conveyancing
              </Typography>
            </Box>
          </Link>
        </Box>

        <Container
          ref={containerRef}
          maxWidth="sm"
          sx={{
            perspective: "1200px",
            mt: { xs: 6, lg: 0 },
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: isFlipped ? "720px" : "560px",
              transition: "height 0.6s ease",
            }}
          >
            <Box
              ref={cardRef}
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                transformStyle: "preserve-3d",
                transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Login Card */}
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <AuthCard
                  title="Welcome Back"
                  subtitle="Sign in to access your account and manage your property transactions."
                  onSubmit={handleLogin}
                  isLoading={isLoading}
                  error={loginError}
                  footer={
                    <Box sx={{ textAlign: "center", mt: 3 }}>
                      <Typography
                        sx={{
                          fontSize: "0.9rem",
                          color: COLORS.textSecondary,
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        Don&apos;t have an account?{" "}
                        <Box
                          component="span"
                          onClick={handleFlip}
                          sx={{
                            color: COLORS.gold,
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "color 0.3s ease",
                            "&:hover": { color: COLORS.primary },
                          }}
                        >
                          Create one
                        </Box>
                      </Typography>
                    </Box>
                  }
                >
                  <TextField
                    fullWidth
                    placeholder="Email address"
                    type="email"
                    variant="outlined"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <FaEnvelope size={16} color={COLORS.gold} />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{
                      mb: 2.5,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "14px",
                        background: COLORS.white,
                        fontFamily: "'Inter', sans-serif",
                        "& fieldset": {
                          borderColor: "rgba(13,35,64,0.1)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(199,161,90,0.4)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: COLORS.gold,
                        },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <FaLock size={16} color={COLORS.gold} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              sx={{ color: COLORS.textSecondary }}
                            >
                              {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{
                      mb: 1.5,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "14px",
                        background: COLORS.white,
                        fontFamily: "'Inter', sans-serif",
                        "& fieldset": {
                          borderColor: "rgba(13,35,64,0.1)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(199,161,90,0.4)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: COLORS.gold,
                        },
                      },
                    }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      mb: 3,
                    }}
                  >
                    <Link href="/forgot-password" style={{ textDecoration: "none" }}>
                      <Typography
                        sx={{
                          fontSize: "0.85rem",
                          color: COLORS.gold,
                          fontWeight: 500,
                          fontFamily: "'Inter', sans-serif",
                          transition: "color 0.3s ease",
                          "&:hover": { color: COLORS.primary },
                        }}
                      >
                        Forgot password?
                      </Typography>
                    </Link>
                  </Box>

                  <Button
                    fullWidth
                    type="submit"
                    disabled={isLoading}
                    endIcon={!isLoading && <HiArrowRight size={18} />}
                    sx={{
                      py: 1.6,
                      borderRadius: "14px",
                      background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
                      color: COLORS.white,
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      textTransform: "none",
                      fontFamily: "'Inter', sans-serif",
                      boxShadow: "0 8px 25px rgba(13,35,64,0.2)",
                      transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 12px 35px rgba(13,35,64,0.3)",
                      },
                      "&:disabled": {
                        opacity: 0.7,
                      },
                    }}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </AuthCard>
              </Box>

              {/* Signup Card */}
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <AuthCard
                  title="Create Account"
                  subtitle="Join 1 Conveyancing and experience seamless property transaction support."
                  onSubmit={handleSignup}
                  isLoading={isLoading}
                  error={signupError}
                  footer={
                    <Box sx={{ textAlign: "center", mt: 3 }}>
                      <Typography
                        sx={{
                          fontSize: "0.9rem",
                          color: COLORS.textSecondary,
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        Already have an account?{" "}
                        <Box
                          component="span"
                          onClick={handleFlip}
                          sx={{
                            color: COLORS.gold,
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "color 0.3s ease",
                            "&:hover": { color: COLORS.primary },
                          }}
                        >
                          Sign in
                        </Box>
                      </Typography>
                    </Box>
                  }
                >
                  <TextField
                    fullWidth
                    placeholder="Full name"
                    type="text"
                    variant="outlined"
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <FaUser size={16} color={COLORS.gold} />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{
                      mb: 2.5,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "14px",
                        background: COLORS.white,
                        fontFamily: "'Inter', sans-serif",
                        "& fieldset": {
                          borderColor: "rgba(13,35,64,0.1)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(199,161,90,0.4)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: COLORS.gold,
                        },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    placeholder="Email address"
                    type="email"
                    variant="outlined"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <FaEnvelope size={16} color={COLORS.gold} />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{
                      mb: 2.5,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "14px",
                        background: COLORS.white,
                        fontFamily: "'Inter', sans-serif",
                        "& fieldset": {
                          borderColor: "rgba(13,35,64,0.1)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(199,161,90,0.4)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: COLORS.gold,
                        },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    placeholder="Phone number"
                    type="tel"
                    variant="outlined"
                    value={signupData.phone}
                    onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <FaPhone size={16} color={COLORS.gold} />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{
                      mb: 2.5,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "14px",
                        background: COLORS.white,
                        fontFamily: "'Inter', sans-serif",
                        "& fieldset": {
                          borderColor: "rgba(13,35,64,0.1)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(199,161,90,0.4)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: COLORS.gold,
                        },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <FaLock size={16} color={COLORS.gold} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              sx={{ color: COLORS.textSecondary }}
                            >
                              {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{
                      mb: 2.5,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "14px",
                        background: COLORS.white,
                        fontFamily: "'Inter', sans-serif",
                        "& fieldset": {
                          borderColor: "rgba(13,35,64,0.1)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(199,161,90,0.4)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: COLORS.gold,
                        },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    placeholder="Confirm password"
                    type={showConfirmPassword ? "text" : "password"}
                    variant="outlined"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <FaLock size={16} color={COLORS.gold} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              edge="end"
                              sx={{ color: COLORS.textSecondary }}
                            >
                              {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{
                      mb: 3,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "14px",
                        background: COLORS.white,
                        fontFamily: "'Inter', sans-serif",
                        "& fieldset": {
                          borderColor: "rgba(13,35,64,0.1)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(199,161,90,0.4)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: COLORS.gold,
                        },
                      },
                    }}
                  />

                  <Button
                    fullWidth
                    type="submit"
                    disabled={isLoading}
                    endIcon={!isLoading && <HiArrowRight size={18} />}
                    sx={{
                      py: 1.6,
                      borderRadius: "14px",
                      background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
                      color: COLORS.white,
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      textTransform: "none",
                      fontFamily: "'Inter', sans-serif",
                      boxShadow: "0 8px 25px rgba(13,35,64,0.2)",
                      transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 12px 35px rgba(13,35,64,0.3)",
                      },
                      "&:disabled": {
                        opacity: 0.7,
                      },
                    }}
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </AuthCard>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              textAlign: "center",
              mt: 4,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.8rem",
                color: COLORS.textSecondary,
                fontFamily: "'Inter', sans-serif",
                mb: 2,
              }}
            >
              Or continue with
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <IconButton
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "12px",
                  border: "1px solid rgba(13,35,64,0.1)",
                  background: COLORS.white,
                  color: "#0D2340",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: COLORS.gold,
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 20px rgba(13,35,64,0.1)",
                  },
                }}
              >
                <FaGoogle size={18} />
              </IconButton>
              <IconButton
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "12px",
                  border: "1px solid rgba(13,35,64,0.1)",
                  background: COLORS.white,
                  color: "#0D2340",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: COLORS.gold,
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 20px rgba(13,35,64,0.1)",
                  },
                }}
              >
                <FaLinkedin size={18} />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

function AuthCard({
  title,
  subtitle,
  children,
  onSubmit,
  isLoading,
  error,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error?: string;
  footer: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        background: "#ffffff",
        borderRadius: "24px",
        p: { xs: 4, md: 5 },
        boxShadow: "0 24px 64px rgba(13,35,64,0.1)",
        border: "1px solid rgba(13,35,64,0.06)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      <Box sx={{ mb: 1 }}>
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
          {title === "Welcome Back" ? "Sign In" : "Sign Up"}
        </Typography>
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: "1.8rem", md: "2.2rem" },
            fontWeight: 700,
            color: COLORS.primary,
            lineHeight: 1.2,
            fontFamily: "'Manrope', sans-serif",
            mb: 1,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: "0.9rem",
            color: COLORS.textSecondary,
            lineHeight: 1.7,
            fontFamily: "'Inter', sans-serif",
            mb: 3,
          }}
        >
          {subtitle}
        </Typography>
        <Box
          sx={{
            width: 50,
            height: 3,
            background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.goldLight})`,
            borderRadius: 4,
            mb: 4,
          }}
        />
      </Box>

      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
        noValidate
      >
        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: "12px" }}>
            {error}
          </Alert>
        )}
        <Box sx={{ flex: 1 }}>
          {children}
        </Box>
      </Box>

      {footer}
    </Box>
  );
}