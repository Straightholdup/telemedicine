import styled from "styled-components";

export const DoctorItemWrapper = styled.div`
  min-width: 800px;
  display: flex;
  justify-content: space-around;
  box-shadow: 1px 3px 5px rgb(0 0 0 / 25%);
  border-radius: 10px;
  padding: 20px;
  margin: 30px 0;
  font-family: 'Montserrat', sans-serif;
`;

export const DoctorAvatar = styled.img`
  display: block;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px solid #0574E1;
  margin-right: 40px;
`;


export const H4Styled = styled.h4`
  font-weight: 400;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
`;

export const ButtonStyled = styled.button`
  width: 180px;
  font-size: 18px;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  outline: 0;
  border: 0;
  padding: 10px 16px;
  background-color: #21A038;
  color: #FFFF;
  mix-blend-mode: normal;
  cursor: pointer;
  border-radius: 10px;

  &:hover {
    background: #21BA72;
    transition: all .2s linear;
  }
`;


