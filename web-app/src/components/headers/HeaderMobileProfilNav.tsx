import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/providers/AuthProvider";

import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface HeaderMobileProfilNavProps {
  isOpen: boolean;
  anchorEl: null | HTMLElement;
  handleHeaderMobileProfilNavOpen: (
    event: React.MouseEvent<HTMLElement>
  ) => void;
  handleHeaderMobileProfilNavClose: () => void;
}

const HeaderMobileProfilNav = ({
  isOpen,
  handleHeaderMobileProfilNavClose,
}: HeaderMobileProfilNavProps) => {
  const router = useRouter();
  const { logout } = useAuth();

  const theme = useTheme();
  const isMediumUp = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    handleHeaderMobileProfilNavClose();
  }, [isMediumUp]);

  return (
    <Drawer
      open={isOpen}
      anchor="right"
      onClose={handleHeaderMobileProfilNavClose}
    >
      <Box
        width={{ xs: "50vw", md: 0 }}
        role="presentation"
        onClick={handleHeaderMobileProfilNavClose}
      >
        <List>
          <ListItem key="stats" disablePadding>
            <ListItemButton onClick={() => router.push("./statistics")}>
              <ListItemIcon>
                <TrendingDownIcon />
              </ListItemIcon>
              <ListItemText primary="Statistiques" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem key="rides" disablePadding>
            <ListItemButton onClick={() => router.push("./rides")}>
              <ListItemIcon>
                <CardTravelIcon />
              </ListItemIcon>
              <ListItemText primary="Mes trajets" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem key="add-ride" disablePadding>
            <ListItemButton onClick={() => router.push("./add-ride")}>
              <ListItemIcon>
                <AddCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Ajouter un trajet" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem key="log-out" disablePadding>
            <ListItemButton onClick={() => logout()}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
      </Box>
    </Drawer>
  );
};

export default HeaderMobileProfilNav;
