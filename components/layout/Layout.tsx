/*
  This component is used in `/pages/_app.js` as a wrapper so it will remain mounted even when the 'page' changes
*/
import React, { useState, useEffect, Fragment } from "react";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import Footer from "./Footer";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { signIn, signOut, useSession } from "next-auth/client";
import { breakpointsRaw } from "../../frontend-config";

import MobileMenu from "./MobileMenu";

import {
  Wrapper,
  InnerWrapper,
  TopBarInnerWrapper,
  LogoWrapper,
  Logo,
  LogoText,
  Navbar,
  NavbarLink,
  NavbarToggleSwitch,
  ToggleSwitchSlider,
} from "./styles";

const Main = styled.main`
  padding-top: 88px; // fixed header height
  min-height: calc(100vh - 66px); // Push footer to bottom when needed
`;

interface LayoutProps {
  children: any;
  toggleTheme(): void;
  isDarkTheme: boolean;
}

const settings = ["Profile", "Logout"];

const Layout = ({ children, toggleTheme, isDarkTheme }: LayoutProps) => {
  const [session, loading] = useSession();

  const [mobile, setMobile] = useState(false);
  const [headerShadow, setHeaderShadow] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    // mount
    checkPageSize();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", checkPageSize);

    // unmount
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", checkPageSize);
    };
  });

  const onScroll = () => {
    const distanceFromTop = window.scrollY;

    if (headerShadow && distanceFromTop === 0) {
      setHeaderShadow(false);
    } else if (!headerShadow && distanceFromTop > 0) {
      setHeaderShadow(true);
    }
  };

  const checkPageSize = () => {
    if (window.innerWidth >= breakpointsRaw("md") && mobile) {
      setMobile(false);
      setHeaderShadow(window.scrollY > 0);
      setMobileMenuActive(false);
    } else if (window.innerWidth < breakpointsRaw("md") && !mobile) {
      setMobile(true);
      setHeaderShadow(window.scrollY > 0);
      setMobileMenuActive(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuActive(!mobileMenuActive);
  };

  const signOutCompletely = async () => {
    await signOut();
    const searchParams = new URLSearchParams();
    searchParams.set("returnTo", `${window.location.origin}`);
    searchParams.set(
      "client_id",
      process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string
    );
    window.location.href = `https://${
      process.env.NEXT_PUBLIC_AUTH0_DOMAIN
    }/v2/logout?${searchParams.toString()}`;
  };

  return (
    <div>
      <Head>
        <title>TOEIC Thật Dễ Dàng</title>
      </Head>

      <Wrapper withShadow={headerShadow}>
        {/* <TopBarInnerWrapper>
            <div>
              {session?.user?.email ? (
                <Fragment>
                  <Link href="/profile">
                    <a
                      style={{
                        margin: "0px 15px 0px 5px",
                        display: "inline-block",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Profile
                    </a>
                  </Link>

                  <button }>Logout</button>
                </Fragment>
              ) : (
                
              )}
            </div>
            {session?.user?.email && (
              <div style={{ color: "black", userSelect: "none" }}>
                Signed in as: <i>{session.user.email}</i>
              </div>
            )}
          </TopBarInnerWrapper> */}
        <InnerWrapper>
          <Link href="/">
            <LogoWrapper>
              <Logo src="/logo.png" />
              <LogoText>TOEIC Thật Dễ Dàng</LogoText>
            </LogoWrapper>
          </Link>
          {mobile ? (
            <MobileMenu
              active={mobileMenuActive}
              toggleMobileMenu={toggleMobileMenu}
              toggleTheme={toggleTheme}
              isDarkTheme={isDarkTheme}
            />
          ) : (
            <Navbar>
              <Link href="/quizzes">
                <NavbarLink>Quiz</NavbarLink>
              </Link>

              <Link href="/contribute">
                <NavbarLink>Contribute</NavbarLink>
              </Link>

              <Link href="/about">
                <NavbarLink>About Us</NavbarLink>
              </Link>

              <NavbarToggleSwitch onClick={toggleTheme}>
                <ToggleSwitchSlider isDarkTheme={isDarkTheme} />
              </NavbarToggleSwitch>

              <Box sx={{ flexGrow: 0, margin: "0 0 0 30px" }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={session?.user?.name || ""}
                      src={session?.user?.image || ""}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {session?.user?.email ? (
                    <>
                      <MenuItem key={"Profile"} onClick={handleCloseUserMenu}>
                        <Link href="/profile">Profile</Link>
                      </MenuItem>
                      <MenuItem
                        key={"Logout"}
                        onClick={() => signOutCompletely()}
                      >
                        Logout
                      </MenuItem>
                    </>
                  ) : (
                    <MenuItem key={"Logout"} onClick={() => signIn("auth0")}>
                      Login
                    </MenuItem>
                  )}
                </Menu>
              </Box>
            </Navbar>
          )}
        </InnerWrapper>
      </Wrapper>

      <Main>{children}</Main>
      <Footer />
    </div>
  );
};

export default Layout;
