import React from "react";
import { CardProps } from "./props";

const Card: React.FC<CardProps> = ({ title, content, icon }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between h-full">
      <div>
        <h2 className="text-xl font-bold text-fontColor mb-2">{title}</h2>
        <p className="text-base text-xl text-gray-600 mb-0">{content}</p>
      </div>
      <div className="flex items-center">
        <div className="text-[#273F77] text-6xl mr-2">{icon}</div>
      </div>
    </div>
  );
};

export default Card;
