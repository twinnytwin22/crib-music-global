"use client";
import React from "react";
import { useModalStore } from "./modalStore";

function RightSideModal({ children }: { children: React.ReactNode }) {
  const { setModalOpen, modalOpen } = useModalStore();
  return <div>{children}</div>;
}

export default RightSideModal;
