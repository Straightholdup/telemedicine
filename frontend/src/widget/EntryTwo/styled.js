import styled from "styled-components";

export const ContactForm = styled.div`
  margin: 20px auto;
  padding: 30px;
`;

export const ContactFormTitle = styled.div`
  text-align: center;
  font-size: 35px;
  margin: 40px auto;
  color: #0082B3;
`;

export const ContactFormInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ContactFormItem = styled.div`
  display: flex;
  margin: 10px auto;
  flex-direction: column;
  width: 400px;

  & label {
    font-size: 20px;
    color: #00384D;
    cursor: pointer;
  }
  & input {
    width: 400px;
    margin-top: 5px;
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 14px;
    padding: 10px;
    font-size: 18px;
  }
`;

export const Steps = styled.div`
    font-size: 18px;
`;

export const ButtonDisabledStyled = styled.button`
  width: 250px;
  padding: 5px;
  font-size: 18px;
  cursor: pointer;
  background: gray;
  font-family: 'Montserrat', sans-serif;
  color: #FFFFFF;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  margin-top: 30px;
`;

export const ButtonStyled = styled.button`
  width: 250px;
  padding: 5px;
  font-size: 18px;
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;
  background: #0082B3;
  color: #FFFFFF;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  margin-top: 30px;
  

  &:hover {
    background-color: #00ADEE;
    transition: all .2s linear;
  }
`;