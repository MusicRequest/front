import {
  faFire,
  faInfo,
  faSnowflake,
} from "@fortawesome/pro-duotone-svg-icons";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AutomationType } from "@/lib/common";

export function AutomationTypeIcon({
  type,
  className,
}: {
  type: AutomationType | null;
  className?: string;
}) {
  const icon = () => {
    switch (type) {
      case AutomationType.heating:
        return faFire;
      case AutomationType.cooling:
        return faSnowflake;
      default:
        return faInfo;
    }
  };

  const iconColor = () => {
    switch (type) {
      case AutomationType.heating:
        return "text-red-500 dark:text-red-400";
      case AutomationType.cooling:
        return "text-blue-500 dark:text-blue-400";
      default:
        return "text-gray-500 dark:text-gray-400";
    }
  };

  const iconBgColor = () => {
    switch (type) {
      case AutomationType.heating:
        return "bg-red-50 dark:bg-red-200";
      case AutomationType.cooling:
        return "bg-blue-50 dark:bg-blue-200";
      default:
        return "bg-gray-100 dark:bg-gray-200";
    }
  };

  return (
    <div
      className={cn(
        // "p-3 rounded-xl max-w-max",
        // iconBgColor(),
        iconColor(),
        className,
      )}
    >
      <FontAwesomeIcon icon={icon()} fixedWidth />
    </div>
  );
}
