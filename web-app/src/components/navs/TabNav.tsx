import { DEFAULT_HEADER_HEIGHT } from "@/styles/constants";
import { Box } from "@mui/material";

interface TabNavProps {
  children: React.ReactNode;
  value: number;
  index: number;
}

const TabNav = ({ children, value, index }: TabNavProps) => {
  return (
    <Box
      position="relative"
      top={{
        xs: `calc(${DEFAULT_HEADER_HEIGHT})`,
        md: 0,
      }}
      height={`calc(100vh - ${DEFAULT_HEADER_HEIGHT} * 2)`}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box flexGrow={1} minHeight="inherit" height="100%">
          {children}
        </Box>
      )}
    </Box>
  );
};

export default TabNav;
