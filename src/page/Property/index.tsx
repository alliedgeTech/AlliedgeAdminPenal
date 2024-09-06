import React from "react";
import Property from "./Components/Property";
import useProperty from "./useProperty";

const PropertyIndex: React.FC = () => {
  const PropertyProps = useProperty();

  return <Property />;
};
export default PropertyIndex;
