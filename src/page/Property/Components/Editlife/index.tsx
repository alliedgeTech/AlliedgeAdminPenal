//index.tsx

import React from "react";
import { ILifeId } from "../../life.props";
import EditLife from "./EditLife";

const EditLifeIndex: React.FC<ILifeId> = ({ lifeId }) => {
  return <EditLife lifeId={lifeId} />;
};

export default EditLifeIndex;
