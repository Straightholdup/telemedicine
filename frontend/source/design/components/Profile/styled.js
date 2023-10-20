import styled from "styled-components";

export const ProfileContainer = styled.div`
  min-height: 80vh;
  padding: 40px;
`;

export const ProfileTitle = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
`;

export const ProfileBlocks = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ProfileBlockFirst = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 20px;
  box-shadow: 1px 3px 5px rgb(0 0 0 / 25%);
  border-radius: 10px;
`;

export const ProfileBlockSecond = styled.div`
  width: 75%;
  box-shadow: 1px 3px 5px rgb(0 0 0 / 25%);
  border-radius: 10px;
`;

export const ProfileMail = styled.div`
  font-size: 15px;
  color: #006edc;
  margin: 20px 0;
  border-bottom: 1px solid #006edc;
  padding-bottom: 10px;
`;

export const ProfileName = styled.div`
  text-align: center;
  font-size: 20px;
  margin: 20px 0;
  border-bottom: 1px solid #006edc;
  padding-bottom: 10px;
`;

export const TabsProfile = styled.div`
  padding: 30px;
  display: flex;
`;

export const EntryItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 30px;
  padding:40px 20px;
  border-radius: 20px;
  font-size: 20px;
  box-shadow: 1px 3px 5px rgb(0 0 0 / 25%);
`;

export const EntryItem = styled.div`
    display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

export const Link = styled.a`
    color: #0574E1;
  
`;

export const SystemsTitle = styled.span`
    color: #21A038;
`;


export const StatusBar = styled.h4`
  font-weight: 400;
    display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StatusWrapper = styled.div`
  font-weight: 700;
    display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Data = styled.span`
  font-weight: 400;
  
`;