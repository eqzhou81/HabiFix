import { Bar } from 'react-chartjs-2';
import { useEffect, useState, useRef } from 'react';

const WeeklyBarGraph = ({ short, type }) => {
  let dataArr;
  if (short == 'phone') {
    dataArr = [15, 17, 14, 12, 10, 19, 20];
  } else if (short == 'sit') {
    dataArr = [5, 4, 6, 3, 1, 5, 4];
  } else if (short == 'ate') {
    dataArr = [2, 3, 1, 3, 1, 0, 1];
  } else if (short == 'water') {
    dataArr = [4, 5, 2, 1, 3, 4, 3];
  }

  const data = {
    labels: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    datasets: [
      {
        label: '# of times activity has been recorded',
        data: dataArr,
        backgroundColor: ['rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)'],
        borderRadius: 3,
        borderWidth: 1,
      },
    ],
  };

  const graphOptions = {
    scales: {
      x: {
        ticks: {
          font: {
            family: 'Quicksand',
            size: 15,
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
      <div className="bar-graph-container">
        <h3>
          Number of times you've {type} in front of your computer this week
        </h3>
        <Bar data={data} options={graphOptions} />
      </div>
    </div>
  );
};

export default WeeklyBarGraph;
