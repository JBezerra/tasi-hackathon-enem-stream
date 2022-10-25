import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;

function RowContainer({ children, style }) {
  return <Container style={style}>{children}</Container>;
}

export default RowContainer;
