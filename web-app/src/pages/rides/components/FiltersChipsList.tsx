import { RideFilterData } from "@/type/RideFilterData.type";
import { getFormatedDate } from "@/utils/date.utils";
import { Chip } from "@mui/material";

interface FiltersChipsListProps {
  filters: RideFilterData;
  handleDeleteFilter: (key: keyof RideFilterData) => void;
}

const FiltersChipsList = ({
  filters,
  handleDeleteFilter,
}: FiltersChipsListProps) => {
  function getChip(key: string, label: string) {
    return (
      <Chip
        key={key}
        label={label}
        onDelete={() => handleDeleteFilter(key as keyof RideFilterData)}
      />
    );
  }

  return Object.keys(filters)
    .filter((key) => key !== "transportationMode")
    .map((key) => {
      switch (key) {
        case "transportationId":
          return getChip(key, `transport: ${filters.transportationMode}`);
        case "label":
          return getChip(key, `nom: ${filters.label}`);
        case "minDistance":
          return getChip(key, `distance > ${filters.minDistance} km`);
        case "maxDistance":
          return getChip(key, `distance < ${filters.maxDistance} km`);
        case "startDate":
          return getChip(
            key,
            `date > ${getFormatedDate(filters.startDate as unknown as string)}`
          );
        case "endDate":
          return getChip(
            key,
            `date < ${getFormatedDate(filters.endDate as unknown as string)}`
          );
        default:
          return;
      }
    });
};

export default FiltersChipsList;
