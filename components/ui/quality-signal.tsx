import { Device } from "@/lib/types/types";
import { Technology } from "@/lib/common";
import { SpreadingFactor } from "@/lib/constant";
import {
  faSignal,
  faSignalBarsSlash,
  faSignalBarsWeak,
} from "@fortawesome/pro-duotone-svg-icons";
import { faSignalGood } from "@fortawesome/pro-duotone-svg-icons/faSignalGood";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Image from "next/image";
enum QualitySignal {
  Bad = 0,
  Middle = 1,
  Good = 2,
}

export function QualitySignalComponent({ device }: { device: Device }) {
  const rssiQuality = (sf: number, rssi: number) => {
    if (device.technology !== Technology.LORAWAN) {
      return null;
    }
    switch (sf) {
      case SpreadingFactor.Sf7:
        if (rssi <= -117) return QualitySignal.Bad;
        else if (rssi > -117 && rssi <= -107) return QualitySignal.Middle;
        else return QualitySignal.Good;
      case SpreadingFactor.Sf8:
        if (rssi <= -120) return QualitySignal.Bad;
        else if (rssi > -120 && rssi <= -110) return QualitySignal.Middle;
        else return QualitySignal.Good;
      case SpreadingFactor.Sf9:
        if (rssi <= -123) return QualitySignal.Bad;
        else if (rssi > -123 && rssi <= -113) return QualitySignal.Middle;
        else return QualitySignal.Good;
      case SpreadingFactor.Sf10:
        if (rssi <= -127) return QualitySignal.Bad;
        else if (rssi > -127 && rssi <= -117) return QualitySignal.Middle;
        else return QualitySignal.Good;
      case SpreadingFactor.Sf11:
        if (rssi <= -129) return QualitySignal.Bad;
        else if (rssi > -129 && rssi <= -119) return QualitySignal.Middle;
        else return QualitySignal.Good;
      case SpreadingFactor.Sf12:
        if (rssi <= -130) return QualitySignal.Bad;
        else if (rssi > -130 && rssi <= -120) return QualitySignal.Middle;
        else return QualitySignal.Good;
    }
  };

  const snrQuality = (sf: number, snr: number) => {
    if (device.technology !== Technology.LORAWAN) {
      return null;
    }

    switch (sf) {
      case SpreadingFactor.Sf7:
        if (snr <= 0) return QualitySignal.Bad;
        else if (snr > 0 && snr <= 10) return QualitySignal.Middle;
        else return QualitySignal.Good;
      case SpreadingFactor.Sf8:
        if (snr <= -5) return QualitySignal.Bad;
        else if (snr > -5 && snr <= 5) return QualitySignal.Middle;
        else return QualitySignal.Good;
      case SpreadingFactor.Sf9:
        if (snr <= -8) return QualitySignal.Bad;
        else if (snr > -8 && snr <= 2) return QualitySignal.Middle;
        else return QualitySignal.Good;
      case SpreadingFactor.Sf10:
        if (snr <= -10) return QualitySignal.Bad;
        else if (snr > -10 && snr <= 0) return QualitySignal.Middle;
        else return QualitySignal.Good;
      case SpreadingFactor.Sf11:
        if (snr <= -12) return QualitySignal.Bad;
        else if (snr > -12 && snr <= -2) return QualitySignal.Middle;
        else return QualitySignal.Good;
      case SpreadingFactor.Sf12:
        if (snr <= -15) return QualitySignal.Bad;
        else if (snr > -15 && snr <= 5) return QualitySignal.Middle;
        else return QualitySignal.Good;
    }
  };

  const getQualitySignal = (device: Device) => {
    if (!device || !device.linkDetails) return null;
    const rssi = rssiQuality(device.linkDetails.sf, device.linkDetails.rssi);
    const snr = snrQuality(device.linkDetails.sf, device.linkDetails.snr);
    if (rssi === null || snr === null) {
      return null;
    }
    return Math.min(rssi as number, snr as number);
  };

  const iconQualitySignal = (qualitySignal: QualitySignal) => {
    switch (qualitySignal) {
      case QualitySignal.Bad:
        return faSignalBarsWeak;
      case QualitySignal.Middle:
        return faSignalGood;
      case QualitySignal.Good:
        return faSignal;
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className={" mr-2"}>
          {!device.isOnline ? (
            <FontAwesomeIcon
              icon={faSignalBarsSlash}
              fixedWidth={true}
              className={"text-red-400"}
            />
          ) : (
            getQualitySignal(device) !== null && (
              <FontAwesomeIcon
                icon={iconQualitySignal(getQualitySignal(device) as number)}
                fixedWidth={true}
                className={"text-green-600"}
              />
            )
          )}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="">
        <div className="grid grid-cols-3 gap-4">
          <div className={"flex items-center"}>
            <Image
              src={"/img/technologies/lorawan.png"}
              alt={"Lorawan icône"}
              width={109}
              height={69}
            />
          </div>
          <div className={"col-span-2 space-y-3"}>
            <div className="space-y-1">
              <h4 className="text-sm leading-none">RSSI</h4>
              <p className="text-sm text-muted-foreground">
                {device.linkDetails?.rssi} dBm
              </p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm  leading-none">SNR</h4>
              <p className="text-sm text-muted-foreground">
                {device.linkDetails?.snr} dB
              </p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm leading-none">Spreading Factor</h4>
              <p className="text-sm text-muted-foreground">
                SF{device.linkDetails?.sf}
              </p>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
