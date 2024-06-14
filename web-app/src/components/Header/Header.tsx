import { AppBar, Button, Stack, Toolbar } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import { AppBarLink } from "@/styles/mui-classes";
import { useAuth } from "@/AuthProvider";
import { useModal } from "../Layout/Layout";

const Header = () => {
  const { user, logout } = useAuth();
  const { handleModalParams } = useModal();
  return (
    <AppBar position="static">
      <Toolbar
        disableGutters
        sx={{
          height: "inherit",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" spacing={0} sx={{ height: "inherit" }}>
          <AppBarLink href="/">
            <PublicIcon sx={{ mr: 1 }} /> Bilan Carbone
          </AppBarLink>
          <AppBarLink href="/world-footprint-map">Données monde</AppBarLink>
          <AppBarLink href="/">Données france</AppBarLink>
        </Stack>

        <Stack direction="row" spacing={3} sx={{ mr: 3 }}>
          {user ? (
            <Button color="primary" variant="outlined" onClick={logout}>
              Log Out
            </Button>
          ) : (
            <>
              <Button
                color="primary"
                variant="outlined"
                onClick={() => handleModalParams({ content: "signIn" })}
              >
                Sign In
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={() => handleModalParams({ content: "signUp" })}
              >
                Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
