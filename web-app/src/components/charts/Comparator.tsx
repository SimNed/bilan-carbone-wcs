import { BASE_BORDER, ERROR_COLOR, SUCCESS_COLOR } from "@/styles/constants";
import {
  getNumberFormatedToTwoDecimals,
  getPercentage,
} from "@/utils/maths.utils";
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
    <Grid container direction="row">
      <Grid
        item
        xs
        container
        flexDirection="row"
        borderTop={BASE_BORDER}
        sx={{
          "& > .MuiGrid-root:last-child": {
            borderRight: "none",
          },
        }}
      >
        {comparatedElements.map((element) => {
          return (
            <Grid
              item
              xs
              container
              justifyContent="center"
              alignItems="center"
              borderRight={BASE_BORDER}
              py={2}
            >
              <Typography variant="h4">{element.label}</Typography>
            </Grid>
          );
        })}
      </Grid>

      {baseElement.comparatedValues.map((baseComparatedValue) => {
        return (
          <>
            <Grid
              item
              xs={12}
              container
              justifyContent="center"
              alignItems="center"
              py={2}
              borderTop={BASE_BORDER}
            >
              <Typography variant="h6" borderBottom={BASE_BORDER}>
                {baseComparatedValue.label.toString().toUpperCase()}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              container
              sx={{
                "& > .MuiGrid-root:last-child": {
                  borderRight: "none",
                },
              }}
            >
              {comparatedElements.map((comparatedElement) => {
                const comparatedValue = comparatedElement.comparatedValues.find(
                  (value) => value.label === baseComparatedValue.label
                );

                const percentage =
                  baseComparatedValue.value && comparatedValue?.value
                    ? getPercentage(
                        baseComparatedValue.value,
                        comparatedValue?.value
                      )
                    : 0;

                const percentageLabel = `${
                  percentage > 0 ? "+" : ""
                }${percentage}%`;

                return comparatedValue ? (
                  <Grid
                    item
                    xs
                    container
                    direction="row"
                    justifyContent={{ xs: "center", md: "flex-start" }}
                    alignItems="center"
                    borderRight={BASE_BORDER}
                  >
                    {comparatedValue.optionalNode && (
                      <Grid item xs>
                        {comparatedValue.optionalNode}
                      </Grid>
                    )}
                    {/* LOOK DOWN HERE !!! */}
                    <Grid
                      item
                      xs
                      container
                      direction="column"
                      alignItems={
                        comparatedValue.optionalNode ? "flex-start" : "center"
                      }
                      justifyContent="space-around"
                      p={comparatedValue.optionalNode ? 0 : 2}
                    >
                      <Typography variant="h5">
                        {getNumberFormatedToTwoDecimals(comparatedValue.value)}
                      </Typography>

                      <Stack
                        flexGrow={1}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Typography paragraph>{percentageLabel}</Typography>
                        {percentage !== 0 &&
                          (percentage > 0 ? (
                            <NorthEastIcon
                              sx={{
                                color: ERROR_COLOR,
                                fontSize: ".8rem",
                                fontWeight: 700,
                              }}
                            />
                          ) : (
                            <SouthEastIcon
                              sx={{
                                color: SUCCESS_COLOR,
                                fontSize: ".8rem",
                                fontWeight: 700,
                              }}
                            />
                          ))}
                      </Stack>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid item xs>
                    <Typography paragraph>NO DATA</Typography>
                  </Grid>
                );
              })}
            </Grid>
          </>
        );
      })}
    </Grid>
  );
};

export default Comparator;
