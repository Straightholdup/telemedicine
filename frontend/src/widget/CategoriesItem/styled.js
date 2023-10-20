import styled from "styled-components";

export const CategoriesItemsWrapper = styled.div`
  display: flex;
  margin: 30px auto;
  max-width: 800px;
  min-height: 500px;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
`;

export const CategoriesItemButton = styled.button`
  width: 20%;
  height: 200px;
  margin-right: 30px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 1px solid #005D80;
  padding: 30px;
  cursor: pointer;
  font-size: 17px;
  outline: 0;
  color: #FFFFFF;
  background-size: 300% 100%;
  border-radius: 10px;
  transition: all .4s ease-in-out;
  background-image: linear-gradient(to right, #0082B3, #00ADEE, #80DCFF);

  &:hover {
    background-position: 100% 0;
    transition: all .4s ease-in-out;
  }
`;