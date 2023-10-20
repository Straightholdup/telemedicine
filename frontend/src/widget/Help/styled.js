import styled from "styled-components";

export const HelpContainer = styled.div`
  max-width: 800px;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const HelpTitle = styled.h1`
  font-size: 34px;
  font-weight: bold;
  color: #21A038;
  font-family: 'Montserrat', sans-serif;
`;

export const HelpContainerItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  

`;

export const HelpContainerItem = styled.div`
  box-shadow: 1px 3px 5px rgb(0 0 0 / 25%);
  border-radius: 30px;
  width: 45%;
  min-height: 100px;
  display: flex;
  align-items: center;
  margin: 10px;
  padding: 10px;

`;

export const Number = styled.div`
  background-color: #21A038;
  color: #F6F6F6;
  border-radius: 50%;
  font-size: 20px;
  width: 50px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;

export const Text = styled.div`
    width: 100%;
`;





