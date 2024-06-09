import { Class, Domain, Field } from "@/lib/types/types";
import {
  faBatteryQuarter,
  faBatteryThreeQuarters,
  faBlinds,
  faBolt,
  faBrightness,
  faCircleInfo,
  faDoorClosed,
  faDroplet,
  faFaceMask,
  faHandWave,
  faLightbulb,
  faPersonRunning,
  faSignal,
  faSmog,
  faSquareInfo,
  faTemperatureHalf,
  faToggleOff,
  faWindowFrame,
  IconDefinition,
} from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

interface FieldIconProps {
  field: Field;
  size?: SizeProp;
  square?: boolean;
}

export function FieldIcon({ field, size, square }: FieldIconProps) {
  if (square) {
    return (
      <div
        className={
          "flex justify-center items-center rounded-md h-10 w-10 bg-" +
          colorPicto(field)
        }
      >
        <FontAwesomeIcon
          icon={icon(field.domain, field.class)}
          size={size}
          className="text-white"
          // fixedWidth={true}
        />
      </div>
    );
  }

  return (
    <FontAwesomeIcon
      icon={icon(field.domain, field.class)}
      size={size}
      className={"text-" + colorPicto(field)}
      fixedWidth={true}
    />
  );
}

function icon(domain: Domain, classe: Class): IconDefinition {
  switch (domain) {
    case "binary_sensor":
      switch (classe) {
        case "battery_low":
          return faBatteryQuarter;
        case "carbon_monoxide":
          return faFaceMask;
        case "door":
          return faDoorClosed;
        case "occupancy":
          return faPersonRunning;
        case "tamper":
          return faHandWave;
        case "window":
          return faWindowFrame;
      }
      break;
    case "cover":
      switch (classe) {
        case "position":
          return faBlinds;
        case "state":
          return faToggleOff;
      }
      break;
    case "light":
      switch (classe) {
        case "brightness":
          return faBrightness;
        case "state":
          return faLightbulb;
      }
      break;
    case "sensor":
      switch (classe) {
        case "aqi":
          return faSquareInfo;
        case "battery":
          return faBatteryThreeQuarters;
        case "current":
        case "energy":
        case "power":
        case "voltage":
          return faBolt;
        case "humidity":
          return faDroplet;
        case "illuminance":
          return faBrightness;
        case "link_quality":
          return faSignal;
        case "ammonia":
        case "carbon_dioxide":
        case "carbon_monoxide":
        case "nitrogen_monoxide":
        case "nitrogen_dioxide":
        case "ozone":
        case "pm10":
        case "pm25":
        case "sulphur_dioxide":
          return faSmog;

        case "temperature":
          return faTemperatureHalf;
      }
      break;
    case "switch":
      switch (classe) {
        case "state":
          // return "power-off";
          return faToggleOff;
      }
      break;
    case "weather":
      switch (classe) {
        case "humidity":
          return faDroplet;
        case "temperature":
          return faTemperatureHalf;
      }
  }
  return faCircleInfo;
}

function colorPicto(field: Field): string {
  switch (field.domain) {
    case "binary_sensor":
      return "green-500";
    case "light":
      return "yellow-500";
    case "switch":
      return "yellow-500";
    case "sensor":
      switch (field.class) {
        case "battery":
          return "green-800";
        case "humidity":
          return "blue-500";
        case "temperature":
          return "red-600";
        case "current":
        case "energy":
        case "voltage":
          return "yellow-500";
        default:
          return "blue-500";
      }
    case "weather":
      switch (field.class) {
        case "temperature":
          return "red-600";
        default:
          return "blue-500";
      }
  }
  return "blue-500";
}
