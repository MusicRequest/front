import {
  faAirConditioner,
  faCarBolt,
  faComputer,
  faDroplet,
  faInfo,
  faLightbulb,
  faSnowflake,
  faSunBright,
} from "@fortawesome/pro-duotone-svg-icons";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EnergyType } from "@/lib/common";

export default function FieldConsumptionIcon({
  energyType,
  className,
}: {
  energyType: EnergyType;
  className?: string;
}) {
  const icon = () => {
    switch (energyType) {
      case EnergyType.CLIMATE:
        return faSnowflake;
      case EnergyType.COMPUTER:
        return faComputer;
      case EnergyType.ELECTRIC_VEHICLE:
        return faCarBolt;
      case EnergyType.HEATING:
        return faSunBright;
      case EnergyType.HEATING_CLIMATE:
        return faAirConditioner;
      case EnergyType.HOT_WATER:
        return faDroplet;
      case EnergyType.LIGHT:
        return faLightbulb;
      default:
        return faInfo;
    }
  };

  const iconColor = () => {
    switch (energyType) {
      case EnergyType.CLIMATE:
        return "text-blue-500 dark:text-blue-400";
      case EnergyType.COMPUTER:
        return "text-yellow-500 dark:text-yellow-400";
      case EnergyType.ELECTRIC_VEHICLE:
        return "text-green-500 dark:text-green-400";
      case EnergyType.HEATING:
        return "text-red-500 dark:text-red-400";
      case EnergyType.HEATING_CLIMATE:
        return "text-red-500 dark:text-red-400";
      case EnergyType.HOT_WATER:
        return "text-blue-500 dark:text-blue-400";
      case EnergyType.LIGHT:
        return "text-yellow-500 dark:text-yellow-400";
      default:
        return "text-gray-500 dark:text-gray-400";
    }
  };

  const iconBgColor = () => {
    switch (energyType) {
      case EnergyType.CLIMATE:
        return "bg-blue-100 dark:bg-blue-200";
      case EnergyType.COMPUTER:
        return "bg-yellow-100 dark:bg-yellow-200";
      case EnergyType.ELECTRIC_VEHICLE:
        return "bg-green-100 dark:bg-green-200";
      case EnergyType.HEATING:
        return "bg-red-100 dark:bg-red-200";
      case EnergyType.HEATING_CLIMATE:
        return "bg-red-100 dark:bg-red-200";
      case EnergyType.HOT_WATER:
        return "bg-blue-100 dark:bg-blue-200";
      case EnergyType.LIGHT:
        return "bg-yellow-100 dark:bg-yellow-200";
      default:
        return "bg-gray-100 dark:bg-gray-200";
    }
  };

  return (
    <div
    // className={cn("p-3 rounded-xl max-w-max", iconBgColor())}
    >
      <FontAwesomeIcon
        icon={icon()}
        className={cn(iconColor(), className)}
        fixedWidth
      />
    </div>
  );
}
