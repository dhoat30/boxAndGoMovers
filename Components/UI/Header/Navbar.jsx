"use client";
import React, { useState, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import useMediaQuery from "@mui/material/useMediaQuery";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { headerLinks } from "@/utils/headerLinks";
import MenuIcon from "../Icons/MenuIcon";
import ArrowIcon from "../Icons/ArrowIcon";
import HeaderArrowIcon from "../Icons/HeaderArrowIcon";

const Drawer = dynamic(() => import("@mui/material/Drawer"));

export default function Navbar() {
  const pathname = usePathname();
  const isDesktop = useMediaQuery("(min-width:1200px)");
  // hide on scroll down, show on scroll up (mobile only)
  const hideOnScroll = useScrollTrigger();
  const elevated = useScrollTrigger({ disableHysteresis: true, threshold: 0 });

  const [open, setOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState(-1);
  const [mobileMenu, setMobileMenu] = useState(-1);
  const menuRef = useRef(null);

  const handleDrawerClose = () => setOpen(false);

  const handleMobileClick = (event, item, index) => {
    if (item.subLinks && item.subLinks.length > 0) {
      event.preventDefault();
      setMobileMenu((prevIndex) => (prevIndex === index ? -1 : index));
    } else {
      handleDrawerClose();
    }
  };

  const desktopMenuItems = headerLinks.map((item, index) => {
    const isOpen = desktopMenu === index;

    return (
      <Box
        className="link"
        component="li"
        key={index}
        ref={menuRef}
        sx={{ color: "white", display: "block", position: "relative" }}
        onMouseEnter={() => setDesktopMenu(index)}
        onMouseLeave={() => setDesktopMenu(-1)}
      >
        <Box
          className="nav-trigger"
          sx={{ display: "flex", alignItems: "center" }}
        >
          {!item.subLinks ? (
            <Link href={item.url}>
              <Typography component="span" variant="body1" align="center">
                {item.label}
              </Typography>
            </Link>
          ) : (
            <Typography
              component="span"
              variant="body1"
              align="center"
              className="nav-parent"
            >
              {item.label}
            </Typography>
          )}

          {item.subLinks && (
            <HeaderArrowIcon className={`arrow ${isOpen ? "rotate" : ""}`} />
          )}
        </Box>

        {item.subLinks && (
          <Paper
            component="ul"
            variant="outlined"
            className="sublinks-container"
            sx={{
              gridTemplateColumns: item.gridTemplateColumn || "1fr",
              width: item.width || "auto",
              pointerEvents: isOpen ? "auto" : "none",
              transform: isOpen ? "scaleY(1)" : "scaleY(0)",
              opacity: isOpen ? 1 : 0,
            }}
          >
            {item.subLinks.map((subLink, subIndex) => (
              <li key={subIndex}>
                <Link
                  href={subLink.url}
                  passHref
                  onClick={() => setTimeout(() => setDesktopMenu(-1), 200)}
                >
                  {subLink.graphic && (
                    <Image
                      className="icon-wrapper border-radius-8"
                      src={subLink.graphic}
                      alt={subLink.label}
                      width="48"
                      height="48"
                      quality={100}
                    />
                  )}
                  <div className="label-wrapper">
                    <Typography
                      className="subLink"
                      component="span"
                      variant="subtitle1"
                    >
                      {subLink.label}
                    </Typography>
                    <Typography
                      className="subLink"
                      component="span"
                      variant="body2"
                    >
                      {subLink.subtitle}
                    </Typography>
                  </div>
                </Link>
              </li>
            ))}
          </Paper>
        )}
      </Box>
    );
  });

  const mobileMenuItems = headerLinks.map((item, index) => {
    return (
      <li
        className="flex-auto text-center relative parent-list-item"
        key={index}
      >
        <a
          href={item.url}
          className={`parent-link body1 ${pathname === item.url ? "active" : ""}`}
          onClick={(event) => handleMobileClick(event, item, index)}
        >
          {item.label}
          {item.subLinks && <ArrowIcon className="arrow" />}
        </a>

        {item.subLinks && (
          <ul
            className={`${
              mobileMenu === index ? "block" : "hidden"
            } bg-primary-light text-surface-light top-8 dropdown`}
          >
            {item.subLinks.map((subLink, subIndex) => (
              <li
                key={subIndex}
                className="text-left child-list-item"
                onClick={() => handleDrawerClose()}
              >
                <Divider
                  key={subIndex + 100}
                  style={{ borderColor: "rgba(255,255,255,0.1)" }}
                />
                <Link href={subLink.url} className="child-link">
                  {subLink.graphic && (
                    <Image
                      className="icon-wrapper border-radius-8"
                      src={subLink.graphic}
                      alt={subLink.label}
                      width="40"
                      height="40"
                      quality={100}
                    />
                  )}
                  <div className="label-wrapper">
                    <Typography
                      className="subLink"
                      component="span"
                      variant="subtitle1"
                    >
                      {subLink.label}
                    </Typography>
                    <Typography
                      className="subLink"
                      component="span"
                      variant="body2"
                    >
                      {subLink.subtitle}
                    </Typography>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <Divider key={index + 122} />
      </li>
    );
  });

  return (
    <>
      <Slide appear={false} direction="down" in={isDesktop || !hideOnScroll}>
        <AppBar
          className="desktop-navbar appbar"
          position="fixed"
          elevation={elevated ? 4 : 0}
          sx={{ background: "var(--light-surface-container-low)" }}
        >
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              className="grid-links-wrapper"
              sx={{ minHeight: "58px !important" }}
            >
              <IconButton
                size="small"
                aria-label="Open navigation menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => setOpen(true)}
                color="primary"
                disableRipple={true}
                className="hamburger-icon"
                sx={{ display: { xs: "inline-flex", lg: "none" } }}
              >
                <MenuIcon fontSize="large" />
              </IconButton>

              <Link href="/" className="logo-wrapper">
                <Image
                  src="/logo.png"
                  width={256 / 5}
                  height={256 / 5}
                  alt="Logo"
                  style={{ cursor: "pointer" }}
                  quality={100}
                  priority
                />
              </Link>

              <div className="links-wrapper">
                <Box
                  component="ul"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    margin: 0,
                  }}
                >
                  {desktopMenuItems}
                </Box>
                <Link href="/#get-quote-form">
                  <Button size="large" variant="contained">
                    GET FREE QUOTE
                  </Button>
                </Link>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
      </Slide>

      <Drawer
        className="mobile-drawer"
        sx={{
          width: "95%",
          maxWidth: "500px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "95%",
            maxWidth: "500px",
            boxSizing: "border-box",
            backgroundColor: "var(--light-surface-container-low)",
          },
        }}
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <IconButton onClick={handleDrawerClose} aria-label="Close navigation menu">
            <ChevronLeftIcon className="chevron-left-icon" />
          </IconButton>
        </Box>
        <ul className="list-container">{mobileMenuItems}</ul>
        <Link href="/#get-quote-form" style={{ margin: "16px" }}>
          <Button
            size="large"
            variant="outlined"
            className="button"
            onClick={handleDrawerClose}
            sx={{ width: "100%" }}
          >
            GET FREE QUOTE
          </Button>
        </Link>
      </Drawer>
    </>
  );
}
