import { Bar } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';
import { useEffect, useState, useRef } from 'react';

const VerticalBar = ({ userData }) => {
  const [graphLabels, setGraphLabels] = useState([]);
  const [graphCounts, setGraphCounts] = useState([]);
  useEffect(() => {
    let label = [];
    let count = [];
    Object.keys(userData).forEach((habit) => {
      label.push(habit);
      count.push(userData[habit].nCount);
    });
    setGraphLabels(label);
    setGraphCounts(count);
  }, []);

  const data = {
    labels: graphLabels,
    datasets: [
      {
        label: '# of times activity has been recorded',
        data: graphCounts,
        backgroundColor: [
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(54, 162, 235, 1)',
          // 'rgba(255, 206, 86, 1)',
          // 'rgba(75, 192, 192, 1)',
        ],
        borderRadius: 3,
        borderWidth: 1,
      },
    ],
  };

  let today = new Date();
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
  today = today.toLocaleDateString('en-US', options);

  const graphOptions = {
    scales: {
      x: {
        ticks: {
          font: {
            family: 'Quicksand',
            size: 20,
          },
        },
      },
      y: {
        ticks: {
          font: {
            family: 'Quicksand',
            size: 15,
          },
        },
      },
    },
  };

  return (
    <div>
      <div className="header">
        <h1 className="title">Daily record for {today}</h1>
      </div>
      <div className="bar-graph-container">
        {graphLabels.length === Object.keys(userData).length && (
          <Bar data={data} options={graphOptions} />
        )}
      </div>
    </div>
  );
};

export default VerticalBar;
