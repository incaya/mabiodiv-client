import React from "react";
import styled from "styled-components";

const Header = props => {
  return (
    <StyledHeader>
      <StyledH1>Ma Biodiv</StyledH1>

      <StyledTools>
        <div>Tools</div>
      </StyledTools>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  height: 75px;
  display: flex;
  background-color: #ccddee;
  flex-direction: row;
  align-items: center;
`;
const StyledH1 = styled.h1`
  line-height: 75px;
  margin-right: 50px;
`;
const StyledTools = styled.div`
  line-height: 75px;
  justify-content: center;
`;
