"use client";

import { RenameModal } from "@/components/modals/rename-modal";
import React, { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <>
      <RenameModal />
    </>
  );
};
