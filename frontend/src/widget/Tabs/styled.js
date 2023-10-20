import styled from 'styled-components';

export const TabsContainer = styled.div`
  max-width: 800px;
  margin: 30px auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
`;

export const Tab = styled.button`
  ${({active}) => `
  display: block;
  height: 40px;
  font-size: 19px;
  background: #B4C1CA;
  color: #FFFFFF;
  border-radius: 20px;
  padding: 10px;
  margin-right: 10px;
  border: 0;
  outline: 0;
  cursor: pointer;
  transition: transform 0.5s;
  font-family: 'Montserrat', sans-serif;
  
    ${
          active
                  ? `
                   background: #00ADEE;
                   color:#E9F8FE;
                  `
                  : `color: "#21A038";`
  }
    `}
`;

export const TabsTitle = styled.p`
  margin-right: 20px;
  font-size: 20px;
`;