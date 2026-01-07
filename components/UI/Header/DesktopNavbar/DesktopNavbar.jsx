"use client";
import React, { useState, useEffect, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "next/link";
import Image from "next/image";
import { headerLinks } from "@/utils/headerLinks";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Paper from "@mui/material/Paper";
import styled from "@emotion/styled";
import { usePathname } from "next/navigation";

function DesktopNavbar() {
  const [showMenu, setShowMenu] = useState(-1);
  const menuRef = useRef(null);
  // router
  const pathname = usePathname();
  const isActive = (path) => {
    return pathname === path;
  };
  // drop down logic
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const showDropdown = (event, index) => {
    setTimeout(() => {
      setShowMenu(index);
    }, 200); // Delay in milliseconds
  };
  const hideDropdown = (event, index) => {
    event.preventDefault();
    setTimeout(() => {
      setShowMenu(-1);
    }, 200); // Del
  };

  const toggleDropdown = (event, index) => {
    event.preventDefault();
    setShowMenu(index === showMenu ? -1 : index);
  };

  // render menu items
  const menuItems = headerLinks.map((item, index) => {
    return (
      <Box
        className="link"
        component="li"
        key={index}
        sx={{ color: "white", display: "block", position: "relative" }}
        onMouseLeave={
          item.subLinks ? (event) => hideDropdown(event, index) : null
        }
        onMouseEnter={
          item.subLinks ? (event) => showDropdown(event, index) : null
        }
        onClick={item.subLinks ? (event) => toggleDropdown(event, index) : null}
      >
        <Link href={item.url} className={isActive(item.url) ? "active" : ""}>
          <Typography component="span" variant="body1" align="center">
            {item.label}
          </Typography>
          {item.subLinks && (
            <KeyboardArrowDownRoundedIcon
              className={`${showMenu === index && "arrow-up"} arrow `}
            />
          )}
        </Link>

        {item.subLinks && (
          <Paper
            component="ul"
            variant="outlined"
            className={`${
              showMenu === index ? "block" : "hidden"
            } sublinks-container`}
            sx={{
              position: "absolute",
              left: "-16px",
              paddingLeft: 0,
              display: `${showMenu === index ? "block" : "none"} `,
            }}
          >
            {item.subLinks.map((subLink, subIndex) => (
              <li key={subIndex}>
                <Link href={subLink.url}>
                  <Typography
                    className="subLink"
                    component="span"
                    variant="body1"
                  >
                    {subLink.label}
                  </Typography>
                </Link>
              </li>
            ))}
          </Paper>
        )}
      </Box>
    );
  });
  return (
    <>
      <AppBarContainer
        position="static"
        sx={{
          display: { xs: "none", lg: "block" },
          background: pathname.includes("blogs")
            ? "var(--light-surface-container-lowest)"
            : "var(--light-surface-container-lowest)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters className="grid-links-wrapper">
            {/* logo  */}
            <Link href="/">
              <Image
                src="/logo.webp"
                width={56 }
                height={56}
                alt="Logo"
                style={{ cursor: "pointer" }}
              />
            </Link>
            {/* menu */}
            <div className="links-wrapper">
              <Box
                component="ul"
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  margin: 0,
                }}
              >
                {menuItems}
              </Box>
              <Link href="/">
                <Button size="large" variant="contained">
                  GET A QUOTE
                </Button>
              </Link>
            </div>
          </Toolbar>
        </Container>
      </AppBarContainer>
    </>
  );
}
export default DesktopNavbar;

const AppBarContainer = styled(AppBar)`
  z-index: 100;
  top: 0;
  position: fixed;
  box-shadow: none;
  border-bottom: 1px solid var(--light-outline-variant);
  .grid-links-wrapper {
    display: flex;
    /* grid-template-columns: 60px 1fr; */
    justify-content: space-between;
  }
  .links-wrapper {
    display: flex;
    align-items: center;
    gap: 16px;
    justify-content: space-between;
  }
  .link {
    a {
      &:hover {
        color: var(--light-primary);
        svg {
          color: var(--light-primary);
        }
      }
      span {
        &:hover {
          color: var(--light-primary);
          svg {
            color: var(--light-primary);
          }
        }
      }
    }
    > a {
      display: flex;
      align-items: center;
      color: var(--light-on-surface);
      padding: 16px 24px;
      @media (max-width: 1366px) {
        padding: 16px 16px;
      }
      @media (max-width: 1366px) {
        padding: 16px 8px;
      }
      &.active {
        &::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 2px;
          background: var(--light-primary);
          bottom: 0;
          left: 0;
        }
      }
    }
  }
  .sublinks-container {
    border-radius: 12px;
    padding: 8px 0;
    width: 300px;
    .subLink {
      display: block;
      padding: 8px 16px;
      font-weight: 350;
    }
  }
`;
