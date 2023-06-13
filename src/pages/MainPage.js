import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Exhibit } from "../components/Exhibit";
import { Header } from "../components/Header";

export const MainPage = () => {
  const [exhibits, setExhibits] = useState([]);

  const getExhibitList = async () => {
    try {
      const response = await axios.get("/exhibitlist");
      setExhibits(response.data);
    } catch (error) {
      console.error(error);
      setExhibits([]);
    }
  };

  useEffect(() => {
    getExhibitList();
  }, []);

  return (
    <MainPageContainer>
      <Header />
      <ExhibitsContainer>
        {exhibits?.map((el) => {
          return <Exhibit key={el.exhibit_id} exhibit={el} />;
        })}
      </ExhibitsContainer>
    </MainPageContainer>
  );
};

const MainPageContainer = styled.div``;

const ExhibitsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
