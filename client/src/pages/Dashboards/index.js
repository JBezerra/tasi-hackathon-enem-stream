import React from "react";
import { Card, FlexLayout, Text } from "../../components";

function Dashboards() {
  return (
    <FlexLayout justify="around" style={{ padding: "40px 0 0 30px" }}>
      <Card style={{ padding: "20px" }}>
        <Text holder="header" text="Logs" />
      </Card>
      <div style={{ width: "70%" }}>Graphics</div>
    </FlexLayout>
  );
}

export default Dashboards;
