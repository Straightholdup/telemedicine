import styled from "styled-components";
import {Button} from "../../atoms/button";

export const LoginContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;

export const TitleStyled = styled.h1`
  font-style: normal;
  font-weight: 400;
  font-size: 80px;
  line-height: 100px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #0574E1;
`;

export const FormStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 500px;
  min-height: 300px;
  align-items: center;
  padding: 50px 100px;
  border-radius: 20px;
  box-shadow: 1px 3px 5px rgb(0 0 0 / 25%);

  & div {
    margin-bottom: 20px;
  }
`;

export const H1Styled = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: #005D80;
`;

export const InputStyled = styled.input`
  width: 300px;
  height: 40px;
  padding: 10px;
  font-size: 18px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 10px;
`;

export const TextAreaStyled = styled.textarea`
  width: 300px;
  padding: 10px;
  font-size: 18px;
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 10px;
`;

export const SelectStyled = styled.select`
  width: 300px;
  height: 40px;
  padding: 10px;
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 10px;
`;

export const ButtonStyled = styled(Button)`
  width: 300px;
  height: 35px;
  margin-top: 30px;
  cursor: pointer;

  &:hover {
    background-color: #00ADEE;
    transition: all .2s linear;
  }
`;


export const ButtonSecondStyled = styled(Button)`
  width: 100%;
  margin: 0 auto;
  height: 35px;
  background: #21A038;
  cursor: pointer;

  &:hover {
    background-color: #1B985D;
    transition: all .2s linear;
  }
`;

export const SecondaryText = styled.h3`
  color: #21A038;
  text-align: center;
  font-weight: 500;
  font-size: 13px;
`;


export const SwitchTheme = styled.div`
  position: absolute;
  top: 40px;
  right: 10px;
`;

export const SymptomsItem = styled.button`
    background: #21A038;
  color: #FFFFFF;
  outline: 0;
  border: 0;
  padding: 6px;
  font-size: 15px;
  border-radius: 30px;
  cursor: pointer;
  margin: 5px;
`;




