import React, { useState } from "react";

import { HeaderStyled, HeaderTitleSectionStyled } from "./Header.styled";
import LinkButton from "../Buttons/LinkButton/LinkButton";
import LinkImageButton from "../Buttons/LinkImageButton/LinkImageButton";
import Modal from "../Modal/Modal";
import SignInPage from "@/pages/sign-in";
import SignUpPage from "@/pages/sign-up";

export default function Header() {
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
    <HeaderStyled>
      <HeaderTitleSectionStyled>
        <LinkImageButton
          href="./"
          src="https://www.volaille-francaise.fr/wp-content/uploads/2021/05/nouveau-projet-21.jpg"
          alt="bilan carbone logo"
        />
        <h1>Bilan carbone</h1>
      </HeaderTitleSectionStyled>
      <div className="header-user-section">
        <LinkButton color="PRIMARY" onClick={handleOpenModal}>
          Se connecter
        </LinkButton>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          {modalContent === "signIn" ? (
            <SignInPage
              onToggleModalContent={toggleModalContent}
              closeModal={closeModal}
            />
          ) : (
            <SignUpPage onToggleModalContent={toggleModalContent} />
          )}
        </Modal>
      )}
    </HeaderStyled>
  );
}
