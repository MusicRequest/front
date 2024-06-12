import { cn } from "@/lib/utils";
import { FilePenLine } from "lucide-react";

type IconDisplayType = {
  className?: string;
  size?: number;
  strokeWidth?: number;
};

// export const CircleXmarkIcon = ({
//   className = "",
//   size = "lg",
// }: IconDisplayType) => {
//   return (
//     <FontAwesomeIcon
//       icon={faCircleXmark}
//       size={size}
//       fixedWidth
//       className={cn("text-red-500", className)}
//     />
//   );
// };
//
// export const CircleCheckIcon = ({
//   className = "",
//   size = "lg",
// }: IconDisplayType) => {
//   return (
//     <FontAwesomeIcon
//       icon={faCircleCheck}
//       size={size}
//       fixedWidth
//       className={cn("text-green-500", className)}
//     />
//   );
// };
//
// export const TrashIcon = ({ className = "", size = "lg" }: IconDisplayType) => {
//   return (
//     <FontAwesomeIcon
//       icon={faTrash}
//       size={size}
//       fixedWidth
//       className={cn("text-red-400", className)}
//     />
//   );
// };

export const EditIcon = ({
  className = "",
  size = 22,
  strokeWidth = 1.5,
}: IconDisplayType) => {
  return (
    <FilePenLine className={className} size={size} strokeWidth={strokeWidth} />
  );
};
