import React from "react";
import Life from "./Components/Life";
import useLife from "./useLife";

const LifeIndex: React.FC = () => {
  const LifeProps = useLife();

  return <Life />;
};
export default LifeIndex;
