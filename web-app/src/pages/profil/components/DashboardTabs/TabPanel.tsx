import { HEADER_HEIGHT } from "@/styles/constants";
import { Box } from "@mui/material";

const TabPanel = (props: {
  children: React.ReactNode;
  value: number;
  index: number;
}) => {
  const { children, value, index } = props;

  return (
    <Box
      minHeight={`calc(100% - ${HEADER_HEIGHT} - ${HEADER_HEIGHT})`}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box height="100%">{children}</Box>}
    </Box>
  );
};

export default TabPanel;
