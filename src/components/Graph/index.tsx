import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { GraphProps } from './props';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Graph: React.FC<GraphProps> = ({ data }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <Line data={data} />
    </div>
  );
};

export default Graph;