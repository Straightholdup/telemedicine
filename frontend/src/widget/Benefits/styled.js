import styled from "styled-components";

export const BenefitsContainer = styled.div`
  max-width: 1000px;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
`;

export const BenefitsTitle = styled.h1`
  font-size: 34px;
  font-weight: bold;
  color: #21A038;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 40px;
`;

export const BenefitsContainerItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

`;

export const BenefitsContainerItem = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const Image = styled.img`
  width: 100px;
  height: 100px;
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 50%;
  box-shadow: 1px 3px 5px rgb(0 0 0 / 25%);
`;

export const Text = styled.div`
  min-height: 120px;
  padding: 10px 0;
  line-height: 25px;
  letter-spacing: 1px;
  margin-top: 20px;
  text-align: center;
  font-weight: 600;
`;





