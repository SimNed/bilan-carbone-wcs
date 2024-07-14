import { DEFAULT_HEADER_HEIGHT } from "@/styles/constants";
import { Box } from "@mui/material";

const TabNav = (props: {
  children: React.ReactNode;
  value: number;
  index: number;
}) => {
  const { children, value, index } = props;

  return (
    <Box
      position="relative"
      top={{
        xs: `calc(${DEFAULT_HEADER_HEIGHT} * 2)`,
        md: DEFAULT_HEADER_HEIGHT,
      }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={{ backgroundColor: "red" }}
    >
      {value === index && <Box height="100%">{children}</Box>}
    </Box>
  );
};

export default TabNav;
