/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Text, Card, Clock, FlexLayout } from "../../components";
import { MapBrazil } from "react-brazil-map";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

function Main() {
  const [distritc, setDistrict] = useState();
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    socket.on("enem-data", (data) => {
      const parsedData = JSON.parse(data);
      setSubscriptions((arr) => [...arr, parsedData]);
    });
  }, [socket]);

  return (
    <FlexLayout justify="center" style={{ padding: "30px" }}>
      <div>
        <Text style={{ padding: "10px" }} holder="header" text="Navegaçao" />
        <MapBrazil onChange={setDistrict} />
      </div>
      <div style={{ padding: "40px 0 0 30px", maxWidth: "350px" }}>
        <Card>
          <Text
            style={{ padding: "20px" }}
            holder="header"
            text="Monitorando agora"
          />
          <div style={{ background: "#EFEFEF", padding: "15px" }}>
            <Clock />
          </div>
          <div style={{ padding: "20px" }}>
            <FlexLayout>
              <Text
                text={subscriptions.length}
                holder="bold"
                style={{ fontSize: "24px" }}
              />
              <Text
                holder="label"
                text="&nbsp; número total de inscritos"
                style={{ alignSelf: "flex-end" }}
              />
            </FlexLayout>
          </div>
        </Card>
        {distritc && (
          <Card>
            <Text
              style={{ padding: "20px" }}
              holder="header"
              text={`Números por estado (${distritc})`}
            />
            <div style={{ padding: "20px" }}>
              <FlexLayout>
                <Text
                  text={
                    subscriptions.filter((s) => s.ufEscola === distritc).length
                  }
                  holder="bold"
                  style={{ fontSize: "24px" }}
                />
                <Text
                  holder="label"
                  text="&nbsp; número total de inscritos"
                  style={{ alignSelf: "flex-end" }}
                />
              </FlexLayout>
            </div>
          </Card>
        )}
      </div>
    </FlexLayout>
  );
}

export default Main;
