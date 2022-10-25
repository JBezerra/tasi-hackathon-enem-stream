/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Card, FlexLayout, Text } from "../../components";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

function Dashboards() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    socket.on("enem-data", (data) => {
      const parsedData = JSON.parse(data);
      parsedData.timestamp = new Date().getTime();
      setSubscriptions((arr) => [...arr, parsedData]);
    });
  }, [socket]);

  return (
    <FlexLayout justify="around" style={{ padding: "40px 0 0 30px" }}>
      <Card style={{ padding: "20px" }}>
        <Text holder="header" text="Logs" />
        {subscriptions
          .slice(Math.max(subscriptions.length - 5, 0))
          .reverse()
          .map((s) => (
            <Text
              key={`subscription-log-${s.timestamp}-${s.corRaca}`}
              holder="subtitle"
              text={`+ Recebido at ${s.timestamp}`}
            />
          ))}
      </Card>
      <div style={{ width: "70%" }}>Graphics</div>
    </FlexLayout>
  );
}

export default Dashboards;
