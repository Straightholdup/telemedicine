import styled from "styled-components";

export const Payment = styled.div`
  margin: 30px auto;
`;

export const PaymentTitle = styled.div`
  text-align: center;
  font-size: 35px;
  margin: 40px auto;
  color: #0082B3;
`;

export const PaymentTypes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PaymentItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 1px solid #005D80;
  padding: 30px;
  cursor: pointer;
  outline: 0;
  color: #FFFFFF;
  background-size: 300% 100%;
  border-radius: 10px;
  transition: all .4s ease-in-out;
  background-image: linear-gradient(to right, #25aae1, #40e495, #30dd8a, #2bb673);
  
  &:hover{
    background-position: 100% 0;
    transition: all .4s ease-in-out;
  }
`;

export const PaymentItemTitle = styled.h4`
  font-size: 18px;
  font-weight: 500;
`;

export const SelectedPayment = styled.h4`
  font-size: 20px;
  font-weight: 500;
`;