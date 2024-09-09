import React from "react";
import Card from "../../../components/Card";
import Graph from "../../../components/Graph";
import { FaHome } from "react-icons/fa";
import { MdRealEstateAgent } from "react-icons/md";
import { RiHomeHeartFill } from "react-icons/ri";


const Dashboard: React.FC = () => {
  const cardData = [
    { title: "Residential", content: "", icon: <FaHome /> },
    { title: "Property ", content: "", icon: <MdRealEstateAgent /> },
    { title: "Home", content: "", icon: <RiHomeHeartFill /> },
  ];

  // const graphData = {
  //   labels: ["January", "February", "March", "April", "May"],
  //   datasets: [
  //     {
  //       label: "My First Dataset",
  //       data: [65, 59, 80, 81, 56],
  //       fill: false,
  //       borderColor: "rgb(75, 192, 192)",
  //       tension: 0.1,
  //     },
  //   ],
  // };

  return (
    <div className="p-4">
      <h1 className="text-2xl text-fontColor font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cardData.map((data, index) => (
          <Card key={index} title={data.title} content={data.content} icon={data.icon} />
        ))}
      </div>
      <div className="mt-8">
        {/* <Graph data={graphData} /> */}
      </div>
    </div>
  );
};

export default Dashboard;
