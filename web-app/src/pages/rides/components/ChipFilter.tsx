import { RideFilterData } from "@/type/RideFilterData.type";
import { getFormatedDate } from "@/utils/date.utils";
import { Chip } from "@mui/material";

const ChipFilter = ({
  chipKey,
  value,
  handleDeleteFilter,
}: {
  chipKey: string;
  value: string | number | Date | undefined;
  handleDeleteFilter: (key: keyof RideFilterData) => void;
}) => {
  const getChipLabel = (chipKey: string) => {
    switch (chipKey) {
      case "label":
        return `nom: ${value}`;
      case "transportationId":
        return `transport: ${value}`;
      case "minDistance":
        return `distance > ${value} km`;
      case "maxDistance":
        return `distance < ${value} km`;
      case "startDate":
        return `date < ${getFormatedDate(value as string)}`;
      case "endDate":
        return `date > ${getFormatedDate(value as string)}`;

      default:
        return "bizarre...";
    }
  };

  return (
    <Chip
      key={chipKey}
      label={`${getChipLabel(chipKey)}`}
      onDelete={() => handleDeleteFilter(chipKey as keyof RideFilterData)}
    />
  );
};

export default ChipFilter;
