import React from "react";
import Title from "../../components/Title/Title";
import Contacts from "../../components/Contacts/Contacts";
import ScrollToTop from "../../components/common/ScrollToTop/ScrollToTop";

export const ContactsPage = () => {
  return (
    <main>
      <Title text="Контакти" />
      <Contacts />
      <ScrollToTop />
    </main>
  );
};
