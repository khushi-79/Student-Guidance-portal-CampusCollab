// Header.js
import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  background-color: #ff4b2b;
  color: #ffffff;
  text-align: center;
  padding: 10px;
  font-size: 24px;
  font-weight: bold;
`;

const Header = () => {
  return (
    <HeaderContainer>
      CampusCollab
    </HeaderContainer>
  );
};

export default Header;
