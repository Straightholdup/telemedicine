import styled from "styled-components";

export const DoctorTypeItemWrapper = styled.button`
    display: flex;
  justify-content: space-between;
  align-items: center;
  width: 45%;
  margin: 20px 20px 20px 0;
  outline: 0;
  padding: 10px;
  background: #21A038;
  border-radius: 10px;
  border: 5px solid #27bcda;
  color: #FFFFFF;
  cursor: pointer;
  
  &:hover{
    background: #1B985D;
    transition: all .2s linear;
  }
  
  & img {
    width: 150px;
  }
`;