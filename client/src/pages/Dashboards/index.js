/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Card, FlexLayout, Text, RowContainer } from "../../components";
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { getEnemData } from "../../services/main";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
const acessoInternetLabels = ["Sim", "Não"];
const racialLabels = [
  "Não declarado",
  "Branca",
  "Preta",
  "Parda",
  "Amarela",
  "Indígena",
  "Não dispõe da informação",
];
const faixaEtariaLabels = [
  "0 - 17 anos",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26 - 30",
  "31 - 35",
  "36 - 40",
  "41 - 45",
  "46 - 50",
  "51 - 55",
  "56 - 60",
  "61 - 65",
  "66 - 70",
  "71 ou mais",
];
ChartJS.register(
  ArcElement,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
  LinearScale,
  BarElement
);

function Dashboards() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [racialLabelsData, setRacialLabelsData] = useState([
    0, 0, 0, 0, 0, 0, 0,
  ]);
  const [acessoInternetLabelsData, setAcessoInternetLabelsData] = useState([
    0, 0,
  ]);
  const [faixaEtariaLabelsData, setFaixaEtariaLabelsData] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  useEffect(async () => {
    const res = await getEnemData();
    for (let key in res.racialLabelsData) {
      setRacialLabelsData((arr) => {
        const idx = racialLabels.findIndex((r) => r === key);
        arr[
          idx >= 0 && idx < racialLabels.length ? idx : racialLabels.length - 1
        ] = res.racialLabelsData[key];
        return arr;
      });
    }
    for (let key in res.acessoInternetLabelsData) {
      console.log(key, res.acessoInternetLabelsData[key]);
      setAcessoInternetLabelsData((arr) => {
        const idx = acessoInternetLabels.findIndex((r) => r === key);
        arr[
          idx >= 0 && idx < acessoInternetLabels.length
            ? idx
            : acessoInternetLabels.length - 1
        ] = res.acessoInternetLabelsData[key];
        console.log(idx);
        return arr;
      });
    }
    for (let key in res.faixaEtariaLabelsData) {
      console.log(key, res.faixaEtariaLabelsData[key]);
      setFaixaEtariaLabelsData((arr) => {
        const idx = faixaEtariaLabels.findIndex((r) => r === key);
        arr[
          idx >= 0 && idx < faixaEtariaLabels.length
            ? idx
            : faixaEtariaLabels.length - 1
        ] = res.faixaEtariaLabelsData[key];
        console.log(idx);
        return arr;
      });
    }
  }, []);

  useEffect(() => {
    socket.on("enem-data", (data) => {
      const parsedData = JSON.parse(data);
      parsedData.timestamp = new Date().getTime();
      setSubscriptions((arr) => {
        arr.push(parsedData);
        return arr.slice(Math.max(arr.length - 15, 0));
      });
      setRacialLabelsData((arr) => {
        const idx = racialLabels.findIndex(
          (r) => r === parsedData.corRaca.trim()
        );
        arr[
          idx >= 0 && idx < racialLabels.length ? idx : racialLabels.length - 1
        ] += 1;
        return arr;
      });
      setAcessoInternetLabelsData((arr) => {
        const idx = acessoInternetLabels.findIndex(
          (r) =>
            r ===
            parsedData.questionario.filter((q) => q.id === "Q025")[0].answer
        );
        if (idx >= 0 && idx < acessoInternetLabels.length) arr[idx] += 1;
        return arr;
      });
      setFaixaEtariaLabelsData((arr) => {
        const idx = faixaEtariaLabels.findIndex(
          (r) => r === parsedData.faixaEtaria
        );
        if (idx >= 0 && idx < faixaEtariaLabels.length) arr[idx] += 1;
        return arr;
      });
    });
  }, [socket]);

  const racialData = {
    labels: racialLabels,
    datasets: [
      {
        label: "",
        data: racialLabelsData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(0, 0, 0, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(0, 0, 0, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const acessoInternetData = {
    labels: acessoInternetLabels,
    datasets: [
      {
        label: "",
        data: acessoInternetLabelsData,
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const faixaEtariaData = {
    labels: faixaEtariaLabels,
    datasets: [
      {
        label: "Quantidade",
        data: faixaEtariaLabelsData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <FlexLayout justify="around" style={{ padding: "40px 0 0 30px" }}>
      <Card style={{ padding: "20px" }}>
        <Text holder="header" text="Logs" />
        {subscriptions.reverse().map((s) => (
          <Text
            key={`subscription-log-${s.timestamp}-${
              s.corRaca
            }-${Math.random()}-${s.questionario[0].answer}`}
            holder="subtitle"
            text={`+ Recebido at ${s.timestamp}`}
          />
        ))}
      </Card>
      <div style={{ width: "70%" }}>
        <Text holder="title" text="Gráficos" />
        <RowContainer>
          <Card style={{ padding: "25px", width: "400px", height: "400px" }}>
            <Text holder="header" text="Cor/Raça" />
            <Doughnut data={racialData} />
          </Card>
          <Card style={{ padding: "25px", width: "400px", height: "400px" }}>
            <Text holder="header" text="Residência com acesso à Internet" />
            <Doughnut data={acessoInternetData} />
          </Card>
        </RowContainer>
        <Card style={{ padding: "25px", width: "800px", height: "400px" }}>
          <Bar
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Faixa etária dos inscritos",
                },
              },
            }}
            data={faixaEtariaData}
          />
        </Card>
      </div>
    </FlexLayout>
  );
}

export default Dashboards;
