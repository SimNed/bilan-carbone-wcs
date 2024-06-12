import { ReactNode, useState } from "react";
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";

import Modal from "../Modal/Modal";
import SignInPage from "@/pages/sign-in";
import SignUpPage from "@/pages/sign-up";
import { relative } from "path";

export default function Layout({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("signIn");

  const toggleModalContent = () => {
    setModalContent(modalContent === "signIn" ? "signUp" : "signIn");
  };
  const handleOpenModal = () => {
    openModal();
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <div
      style={{
        position: "relative",
        background: "green",
        width: "100vw",
        left: 0,
        padding: 0,
        margin: 0,
      }}
    >
      {children}
    </div>
  );
}
