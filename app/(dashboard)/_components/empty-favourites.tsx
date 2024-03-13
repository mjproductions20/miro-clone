"use client";

import Image from "next/image";

import React from "react";

export const EmptyFavourites = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image
        src={"/empty-favorites.svg"}
        height={140}
        width={140}
        alt="Empty"
      />
      <h2 className="text-2xl font-semibold mt-6">No Favourite Boards</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Try favouriting a board.
      </p>
    </div>
  );
};
