"use client";

import { colorToCss } from "@/lib/utils";
import { Color } from "@/types/canvas";

interface ColorPickerProps {
  onChange: (color: Color) => void;
}

import React from "react";

export const ColorPicker = ({ onChange }: ColorPickerProps) => {
  return (
    <div className="flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200">
      <ColorButton onClick={onChange} color={{ r: 0, g: 0, b: 0 }} />
      <ColorButton onClick={onChange} color={{ r: 255, g: 255, b: 255 }} />
      <ColorButton onClick={onChange} color={{ r: 255, g: 0, b: 0 }} />
      <ColorButton onClick={onChange} color={{ r: 0, g: 255, b: 0 }} />
      <ColorButton onClick={onChange} color={{ r: 0, g: 0, b: 255 }} />
      <ColorButton onClick={onChange} color={{ r: 255, g: 218, b: 185 }} />
      <ColorButton onClick={onChange} color={{ r: 255, g: 165, b: 0 }} />
      <ColorButton onClick={onChange} color={{ r: 165, g: 42, b: 42 }} />
      <ColorButton onClick={onChange} color={{ r: 255, g: 192, b: 203 }} />
      <ColorButton onClick={onChange} color={{ r: 135, g: 206, b: 235 }} />
      <ColorButton onClick={onChange} color={{ r: 160, g: 32, b: 240 }} />
    </div>
  );
};

interface ColorButtonProps {
  onClick: (color: Color) => void;
  color: Color;
}

const ColorButton = ({ onClick, color }: ColorButtonProps) => {
  return (
    <button
      className="w-8 h-8 items-center flex justify-center hover:opacity-75 transition"
      onClick={() => onClick(color)}
    >
      <div
        className="h-8 w-8 rounded-md border border-neutral-300"
        style={{ background: colorToCss(color) }}
      />
    </button>
  );
};
