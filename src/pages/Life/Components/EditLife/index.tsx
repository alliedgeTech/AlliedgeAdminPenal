import React from "react";
import { ILifeId } from "../../Life.props";
import EditLife from "./EditLife";



const EditLifeIndex: React.FC<ILifeId> = ({ LifeId }) => {

    return (
        <EditLife LifeId={LifeId}/>
    );
}

export default EditLifeIndex;
