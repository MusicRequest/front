import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Circle from "@uiw/react-color-circle";
import { COLORS_CHART } from "@/lib/constant";
import React from "react";
import { cn } from "@/lib/utils";

export function ColorPickerPopover({
  onColorChange,
  color,
}: {
  onColorChange: (newColor: string) => void;
  color?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "size-6 min-w-6 cursor-pointer rounded-full",
            color === "#ffffff" && "border border-gray-500",
          )}
          style={{ background: color }}
        ></div>
      </PopoverTrigger>
      <PopoverContent className="bg-gray-100">
        <Circle
          pointProps={{
            style: {
              height: "30px",
              width: "30px",
              borderRadius: "50%",
            },
          }}
          className={"flex justify-center gap-2"}
          colors={COLORS_CHART}
          color={color}
          onChange={(color) => {
            onColorChange(color.hex);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
