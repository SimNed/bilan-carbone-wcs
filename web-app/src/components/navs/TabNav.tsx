import { Box } from "@mui/material";

const TabNav = (props: {
  children: React.ReactNode;
  value: number;
  index: number;
}) => {
  const { children, value, index } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      height="100%"
    >
      {value === index && <Box height="100%">{children}</Box>}
    </Box>
  );
};

export default TabNav;
