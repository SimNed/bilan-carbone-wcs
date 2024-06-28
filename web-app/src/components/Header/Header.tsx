import { AppBar, Box, Button, IconButton, Stack, Toolbar } from "@mui/material";
import {
  AccountCircle,
  Menu as MenuIcon,
  MoreVert as MoreIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { useAuth } from "@/AuthProvider";
import { useModal } from "../Layout/Layout";
import SignUpForm from "../Auth/SignUpForm";
import SignInForm from "../Auth/SignInForm";

import MobileMenu from "./MobileMenu";
import HeaderNav from "./HeaderNav";

import ProfileMenu from "./ProfileMenu";
import { AppBarLink } from "@/styles/mui-classes";

const Header = () => {
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [mobileAnchorEl, setMobileAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [headerNavAnchorEl, setHeaderNavAnchorEl] =
    useState<null | HTMLElement>(null);

  const { user, logout } = useAuth();
  const { handleModalComponent } = useModal();

  const isProfileMenuOpen = Boolean(profileAnchorEl);
  const isMobileMenuOpen = Boolean(mobileAnchorEl);
  const isHeaderNavMenuOpen = Boolean(headerNavAnchorEl);

  const handleMenuOpen =
    (setter: React.Dispatch<React.SetStateAction<null | HTMLElement>>) =>
    (event: React.MouseEvent<HTMLElement>) =>
      setter(event.currentTarget);

  const handleMenuClose =
    (setter: React.Dispatch<React.SetStateAction<null | HTMLElement>>) => () =>
      setter(null);

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box
          sx={{
            display: {
              xs: "none",
              md: "flex",
              justifyContent: "center",
            },
            padding: 0,
            height: "100%",
            gap: 6,
          }}
        >
          <AppBarLink href="./">BC</AppBarLink>
          <AppBarLink href="./world-footprint-map">Données monde</AppBarLink>
          <AppBarLink href="./">Données france</AppBarLink>
        </Box>

        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls="header-nav-mobile-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen(setHeaderNavAnchorEl)}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: { xs: "none", md: "flex", gap: 2 } }}>
          {user ? (
            <>
              <Box
                sx={{
                  display: {
                    xs: "none",
                    md: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  padding: 0,
                  height: "100%",
                  gap: 6,
                }}
              >
                <AppBarLink href="./statistics">Statistiques</AppBarLink>
                <AppBarLink href="./rides">Trajets</AppBarLink>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls="profile-menu"
                  aria-haspopup="true"
                  onClick={handleMenuOpen(setProfileAnchorEl)}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Box>
            </>
          ) : (
            <>
              <Button
                color="primary"
                variant="outlined"
                onClick={() => handleModalComponent(<SignInForm />)}
              >
                Sign In
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={() => handleModalComponent(<SignUpForm />)}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>

        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls="mobile-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen(setMobileAnchorEl)}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Toolbar>

      <ProfileMenu
        isOpen={isProfileMenuOpen}
        anchorEl={profileAnchorEl}
        handleProfileMenuClose={handleMenuClose(setProfileAnchorEl)}
      />
      <HeaderNav
        isOpen={isHeaderNavMenuOpen}
        anchorEl={headerNavAnchorEl}
        handleHeaderNavMenuClose={handleMenuClose(setHeaderNavAnchorEl)}
      />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        anchorEl={mobileAnchorEl}
        handleProfileMenuOpen={handleMenuOpen(setProfileAnchorEl)}
        handleMobileMenuClose={handleMenuClose(setMobileAnchorEl)}
      />
    </AppBar>
  );
};

export default Header;
