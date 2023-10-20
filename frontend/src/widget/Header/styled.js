import styled from "styled-components";
import {Button} from "../../app/styles/atoms/button";

export const HeaderContainer = styled.div`
  padding: 10px 40px;
  border-bottom: 1px solid black;
`;

export const HeaderMainPage = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  border-bottom: 2px solid #0574E1;
  color: #0574E1;
  margin-right: 20px;
`;

export const ThemeSwitch = styled.div`
    margin-right: 40px;
`;

export const HeaderLink = styled.a`
  text-decoration: none;
  color: #0574E1;
  cursor: pointer;
`;

export const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 85px;
`;

export const HeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TitleStyled = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 100px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #0574E1;
`;

export const ButtonStyled = styled(Button)`
  margin-left: 40px;
  cursor: pointer;
  
  &:hover {
    background-color: #00ADEE;
    transition: all .2s linear;
  }
`;
