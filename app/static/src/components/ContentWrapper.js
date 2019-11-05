import React from "react";
import styled from "styled-components";

const Padding = styled.div`
  margin: 35px 35px;
`;

export default ({ children }) => <Padding>{children}</Padding>;
