import styled from 'styled-components';

export const ProfilHeaderStyled = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  padding: 0.5rem;
`;

export const ProfilContentStyled = styled.header`
  justify-content: space-around;
  align-items: center;
  background-color: white;
  padding: 2.5rem;
  box-sizing: content-box;
  input {
    width: 100%;
  }
`;

export const TitleCounter = styled.h1`
  font-size: 18px;
  margin-bottom: 10px;
  text-decoration: underline;
`;

export const RidesContainerStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  border-radius: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
`;

export const RideCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f1e7c5;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const DeleteButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-right: 10px;
  padding-top: 10px;
`;

export const CardTitle = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const RideDate = styled.h2`
  font-size: 14px;
  color: #888;
  margin-bottom: 10px;
`;

export const RideTransportation = styled.h2`
  font-size: 16px;
  margin-bottom: 10px;
`;

export const RideDistance = styled.h2`
  font-size: 16px;
  margin-bottom: 10px;
`;

export const RideCO2Emission = styled.h2`
  font-size: 16px;
  margin-bottom: 10px;
  color: #ff6347;
`;
