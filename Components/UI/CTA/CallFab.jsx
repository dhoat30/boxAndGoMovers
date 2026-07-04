"use client";
import Fab from "@mui/material/Fab";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

export default function CallFab() {
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER;
  if (!phoneNumber) return null;

  return (
    <Fab
      href={`tel:${phoneNumber}`}
      aria-label={`Call ${phoneNumber}`}
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 1100,
        width: 60,
        height: 60,
        background:
          "var(--primary-gradient, linear-gradient(90deg, #4861f0 0%, #b367ff 100%))",
        display: { xs: "flex", md: "none" },
        "&:hover": {
          background:
            "var(--primary-gradient, linear-gradient(90deg, #4861f0 0%, #b367ff 100%))",
        },
      }}
    >
      <LocalPhoneIcon sx={{ fontSize: "2rem", color: "var(--light-on-primary)" }} />
    </Fab>
  );
}
