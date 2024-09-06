import React from "react";
import { IPropertyId } from "../../Property.props";
import EditProperty from "./EditProperty";

const EditPropertyIndex: React.FC<IPropertyId> = ({ PropertyId }) => {
  return <EditProperty PropertyId={PropertyId} />;
};

export default EditPropertyIndex;
