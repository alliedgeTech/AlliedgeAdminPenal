import React from "react";
import { IContactId } from "../../Contact.props";
import EditContact from "./EditContact";



const EditContactIndex: React.FC<IContactId> = ({ ContactId }) => {

    return (
        <EditContact ContactId={ContactId}/>
    );
}

export default EditContactIndex;
