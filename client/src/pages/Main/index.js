import React, { useState } from "react";
import { Text, Card, Clock, FlexLayout } from "../../components";
import { MapBrazil } from "react-brazil-map";

function Main() {
  const [distritc, setDistrict] = useState();

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
              <Text text={0} holder="bold" style={{ fontSize: "24px" }} />
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
                <Text text={0} holder="bold" style={{ fontSize: "24px" }} />
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
