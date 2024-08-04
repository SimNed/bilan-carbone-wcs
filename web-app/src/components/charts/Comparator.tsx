import { BASE_BORDER, ERROR_COLOR, SUCCESS_COLOR } from "@/styles/constants";
import { getPercentage } from "@/utils/maths.utils";
import { Box, Grid, Stack, Typography } from "@mui/material";

import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthEastIcon from "@mui/icons-material/SouthEast";

import { ComparatorElement } from "@/type/ComparatorElement.type";

interface ComparatorProps {
  baseElement: ComparatorElement;
  comparatedElements: ComparatorElement[];
}

const Comparator = ({ baseElement, comparatedElements }: ComparatorProps) => {
  return (
    <Grid
      container
      direction="row"
      sx={{
        "& > .MuiGrid-root:last-child": {
          borderRight: "none",
        },
        "& > .MuiGrid-root > .MuiGrid-root:last-child": {
          borderBottom: "none",
        },
      }}
    >
      {comparatedElements.map((element) => {
        let elementValueLabel = "";
        let percentage = 0;

        return (
          <Grid
            key={element.label}
            container
            item
            xs
            direction="column"
            sx={{ borderRight: BASE_BORDER }}
          >
            <Grid item py={2} sx={{ borderBottom: BASE_BORDER }}>
              <Stack flexDirection="row" justifyContent="center">
                <Typography variant="h4">{element.label}</Typography>
              </Stack>
            </Grid>
            {element.comparatedValues.map((comparatedValue, idx) => {
              const baseValue =
                baseElement.comparatedValues.find(
                  (baseComparatedValue) =>
                    baseComparatedValue.label === comparatedValue.label
                )?.value || 0;
              if (comparatedValue.value !== 0) {
                if (baseValue !== 0) {
                  percentage = getPercentage(baseValue, comparatedValue.value);
                  elementValueLabel = `${
                    percentage > 0 ? "+" : ""
                  }${percentage}%`;
                }
              } else {
                elementValueLabel = "no data";
              }
              return (
                <Grid
                  key={`${element.label}${comparatedValue.label}`}
                  item
                  xs
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  py={2}
                  sx={{ borderBottom: BASE_BORDER }}
                >
                  {comparatedValue.optionalNode &&
                    comparatedValue.value !== 0 && (
                      <Grid item xs>
                        <Box>{comparatedValue.optionalNode}</Box>
                      </Grid>
                    )}

                  <Grid item xs>
                    <Stack
                      flexGrow={1}
                      direction="column"
                      alignItems={
                        comparatedValue.optionalNode ? "flex-start" : "center"
                      }
                    >
                      <Typography variant="h5">
                        {elementValueLabel}{" "}
                        {percentage !== 0 && percentage > 0 && (
                          <NorthEastIcon
                            sx={{ color: ERROR_COLOR, fontSize: "1rem" }}
                          />
                        )}
                        {percentage !== 0 && percentage < 0 && (
                          <SouthEastIcon
                            sx={{ color: SUCCESS_COLOR, fontSize: "1rem" }}
                          />
                        )}
                      </Typography>

                      <Typography paragraph>{comparatedValue.label}</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Comparator;
