import styled from "styled-components";

export const ListOfDoctorByDiseaseContainer = styled.div`
  max-width: 800px;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  font-family: 'Montserrat', sans-serif;
`;

export const StatusStyled = styled.div`
  width: 70px;
  padding: 7px;
  border-radius: 30px;
  text-align: center;
  background-color: #21A038;
  color: #FFFFFF;
`;

export const InfoTopStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
`;

export const DiseaseNameStyled = styled.div`
  margin-right: 20px;
  font-size: 25px;
`;

export const CountOfDoctors = styled.div`
  font-size: 25px;
`;

export const ListOfDoctor = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 10px auto;
`;

export const ListOfDoctorTop = styled.div`
  width: 100%;
  display: flex;
  margin: 10px auto;
  justify-content: space-between;
`;

export const FiltersContainer = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
`;

export const ButtonStyled = styled.button`
  width: 40%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 17px;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  border: 0;
  background: transparent;
  outline: 0;
`;