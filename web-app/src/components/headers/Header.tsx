import { AppBar, Box, Button, IconButton, Stack, Toolbar } from "@mui/material";
import { AccountCircle, Menu as MenuIcon } from "@mui/icons-material";
import { useState } from "react";
import { useAuth } from "@/AuthProvider";
import { useModal } from "../layout/Layout";
import SignUpForm from "../auth/SignUpForm";
import SignInForm from "../auth/SignInForm";

import HeaderProfilNav from "./HeaderProfilNav";
import { AppBarLink } from "@/styles/mui-classes";
import { DEFAULT_HEADER_HEIGHT } from "@/styles/constants";
import HeaderMobileNav from "./HeaderMobileNav";
import HeaderMobileProfilNav from "./HeaderMobileProfilNav";

const Header = () => {
  const [profileNavAnchorEl, setProfileNavAnchorEl] =
    useState<null | HTMLElement>(null);
  const [mobileNavAnchorEl, setMobileNavAnchorEl] =
    useState<null | HTMLElement>(null);
  const [mobileProfilNavAnchorEl, setMobileProfilNavAnchorEl] =
    useState<null | HTMLElement>(null);

  const { user, logout } = useAuth();
  const { handleModalComponent } = useModal();

  const isHeaderProfilNavOpen = Boolean(profileNavAnchorEl);
  const isHeaderMobileNavOpen = Boolean(mobileNavAnchorEl);
  const isHeaderMobileProfilNavOpen = Boolean(mobileProfilNavAnchorEl);

  const handleMenuOpen =
    (setter: React.Dispatch<React.SetStateAction<null | HTMLElement>>) =>
    (event: React.MouseEvent<HTMLElement>) =>
      setter(event.currentTarget);

  const handleMenuClose =
    (setter: React.Dispatch<React.SetStateAction<null | HTMLElement>>) => () =>
      setter(null);

  return (
    <AppBar position="sticky">
      <Toolbar disableGutters>
        <Stack
          height={DEFAULT_HEADER_HEIGHT}
          display={{ xs: "none", md: "flex" }}
          flexDirection="row"
          flexGrow={1}
          justifyContent="center"
          alignItems="center"
        >
          <AppBarLink href="./">BC</AppBarLink>
          <AppBarLink href="./world-footprint-map">Données monde</AppBarLink>
        </Stack>

        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls="header-nav-mobile-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen(setMobileNavAnchorEl)}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Box sx={{ flexGrow: 4 }} />

        {user ? (
          <>
            <Stack
              height={DEFAULT_HEADER_HEIGHT}
              display={{ xs: "none", md: "flex" }}
              flexDirection="row"
              flexGrow={1}
              justifyContent="center"
              alignItems="center"
            >
              <AppBarLink href="./statistics">Statistiques</AppBarLink>
              <AppBarLink href="./rides">Mes trajets</AppBarLink>
              <AppBarLink href="./add-ride">Ajouter un trajet</AppBarLink>

              <AppBarLink href="./rides" onClick={() => logout()}>
                Log out
              </AppBarLink>
            </Stack>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls="mobile-menu"
                aria-haspopup="true"
                onClick={handleMenuOpen(setMobileProfilNavAnchorEl)}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </>
        ) : (
          <Stack flexDirection="row" gap={2} px={2}>
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
          </Stack>
        )}
      </Toolbar>

      <HeaderMobileNav
        isOpen={isHeaderMobileNavOpen}
        anchorEl={mobileNavAnchorEl}
        handleHeaderMobileNavClose={handleMenuClose(setMobileNavAnchorEl)}
      />
      <HeaderMobileProfilNav
        isOpen={isHeaderMobileProfilNavOpen}
        anchorEl={mobileProfilNavAnchorEl}
        handleHeaderMobileProfilNavOpen={handleMenuOpen(
          setMobileProfilNavAnchorEl
        )}
        handleHeaderMobileProfilNavClose={handleMenuClose(
          setMobileProfilNavAnchorEl
        )}
      />
    </AppBar>
  );
};

export default Header;
