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
import { useRouter } from "next/router";
import { useEffect } from "react";
import PublicIcon from "@mui/icons-material/Public";

interface HeaderMobileNavProps {
  isOpen: boolean;
  anchorEl: null | HTMLElement;
  handleHeaderMobileNavClose: () => void;
}

const HeaderMobileNav = ({
  isOpen,
  handleHeaderMobileNavClose,
}: HeaderMobileNavProps) => {
  const router = useRouter();
  const theme = useTheme();
  const isMediumUp = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    handleHeaderMobileNavClose();
  }, [isMediumUp]);

  return (
    <Drawer open={isOpen} onClose={handleHeaderMobileNavClose}>
      <Box
        width={{ xs: "50vw", md: 0 }}
        role="presentation"
        onClick={handleHeaderMobileNavClose}
      >
        <List>
          <ListItem key="Bilan Carbone" disablePadding>
            <ListItemButton onClick={() => router.push("./")}>
              <ListItemIcon>BC</ListItemIcon>
              <ListItemText primary="Bilan Carbone" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem key="Données monde" disablePadding>
            <ListItemButton
              onClick={() => router.push("./world-footprint-map")}
            >
              <ListItemIcon>
                <PublicIcon />
              </ListItemIcon>
              <ListItemText primary="Données Monde" />
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
      </Box>
    </Drawer>
  );
};

export default HeaderMobileNav;
