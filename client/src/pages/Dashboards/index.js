/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Card, FlexLayout, Text } from "../../components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
const racialLabels = ['Não declarado', 'Branca', 'Preta', 'Parda', 'Amarela', 'Indígena', 'Não dispõe da informação'];
ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboards() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [racialLabelsData, setRacialLabelsData] = useState([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    socket.on("enem-data", (data) => {
      const parsedData = JSON.parse(data);
      parsedData.timestamp = new Date().getTime();
      setSubscriptions((arr) => [...arr, parsedData]);
      setRacialLabelsData((arr) => {
        const idx = racialLabels.findIndex(r => r === parsedData.corRaca.trim());
        if (idx < 0) console.log('FLAGG', parsedData.corRaca.trim());
        else arr[idx] += 1;
        return arr;
      });
    });
  }, [socket]);

  const racialData = {
    labels: racialLabels,
    datasets: [
      {
        label: '# of Votes',
        data: racialLabelsData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <FlexLayout justify="around" style={{ padding: "40px 0 0 30px" }}>
      <Card style={{ padding: "20px" }}>
        <Text holder="header" text="Logs" />
        {subscriptions
          .slice(Math.max(subscriptions.length - 15, 0))
          .reverse()
          .map((s) => (
            <Text
              key={`subscription-log-${s.timestamp}-${s.corRaca}-${Math.random()}-${s.questionario[0].answer}`}
              holder="subtitle"
              text={`+ Recebido at ${s.timestamp}`}
            />
          ))}
      </Card>
      <div style={{ width: "70%" }}>
        <Text holder="title" text="Gráficos" />
        <Card style={{ padding: "25px", width: '400px', height: '400px' }}>
          <Text holder="header" text="Cor/Raça" />
            <Doughnut data={racialData}/>
        </Card>
      </div>
    </FlexLayout>
  );
}

export default Dashboards;
