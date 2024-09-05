import React from "react";
import ViewLife from "./ViewLife";
import { ILifes } from "../../Life.props";



const ViewLifeIndex: React.FC<ILifes> = ({ life }) => {
  return (
    <div>
      <ViewLife life={life} />
    </div>
  );
};

export default ViewLifeIndex;
