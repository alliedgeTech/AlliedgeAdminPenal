import React from "react";
import ViewContact from "./ViewContact";
import { IContacts } from "../../Contact.props";



const ViewContactIndex: React.FC<IContacts> = ({ contact }) => {
  return (
    <div>
      <ViewContact contact={contact} />
    </div>
  );
};

export default ViewContactIndex;
