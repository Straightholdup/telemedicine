import styled from "styled-components";

export const EntryContainer = styled.div`
  max-width: 800px;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
`;

export const ButtonStyled = styled.div`
  outline: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: 20px;
`;

export const EntryTopStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #21A038;
  padding-bottom: 10px;

  & h4 {
    font-size: 17px;
  }
`;

export const CalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 50px 0;
`;

export const TimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;
`;


export const ErrorMessage = styled.div`
  color: #892b2b;
  text-align: center;
  font-size: 16px;
`

export const TimeItems = styled.div`
  display: flex;

`;

export const SelectedTime = styled.div`
  margin-top: 30px;
  font-size: 18px;
  font-weight: 600;
`;

export const TimeItem = styled.button`

  outline: 0;
  border: 0;
  background: #21A038;
  padding: 10px;
  border-radius: 30px;
  cursor: pointer;
  margin-bottom: 10px;
  margin-right: 10px;
  text-align: center;
  color: #F6F6F6;
  font-size: 17px;


  &:hover {
    background: #21BA72;
    transition: all .2s linear;
  }
`;

export const H4Styled = styled.h4`
  font-size: 20px;
  font-weight: 500;
  text-align: center;
`;




