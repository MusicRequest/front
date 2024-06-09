import {
  faCircleCheck,
  faCircleXmark,
  faEdit,
  faTrash,
} from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { cn } from "@/lib/utils";

type IconDisplayType = {
  className?: string;
  size?: SizeProp;
  color?: string;
};

export const CircleXmarkIcon = ({
  className = "",
  size = "lg",
}: IconDisplayType) => {
  return (
    <FontAwesomeIcon
      icon={faCircleXmark}
      size={size}
      fixedWidth
      className={cn("text-red-500", className)}
    />
  );
};

export const CircleCheckIcon = ({
  className = "",
  size = "lg",
}: IconDisplayType) => {
  return (
    <FontAwesomeIcon
      icon={faCircleCheck}
      size={size}
      fixedWidth
      className={cn("text-green-500", className)}
    />
  );
};

export const TrashIcon = ({ className = "", size = "lg" }: IconDisplayType) => {
  return (
    <FontAwesomeIcon
      icon={faTrash}
      size={size}
      fixedWidth
      className={cn("text-red-400", className)}
    />
  );
};

export const EditIcon = ({ className = "", size = "lg" }: IconDisplayType) => {
  return (
    <FontAwesomeIcon
      icon={faEdit}
      size={size}
      fixedWidth
      className={className}
    />
  );
};
