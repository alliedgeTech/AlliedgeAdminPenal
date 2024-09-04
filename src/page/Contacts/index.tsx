import React from "react";
import Contact from "./Components/Contact";
import useContact from "./useContact";

const ContactIndex: React.FC = () => {
  const ContactProps = useContact();

  return <Contact />;
};
export default ContactIndex;
