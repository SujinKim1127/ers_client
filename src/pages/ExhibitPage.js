import styled from "styled-components";
import { Header } from "../components/Header";
import axios from "../api/axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const ExhibitPage = () => {
  const [exhibit, setExhibit] = useState([]);
  const { exhibitId } = useParams();
  const navigate = useNavigate();

  const handleClickBtn = () => {
    navigate(`/order/${exhibitId}`);
  };

  const getExhibitData = async () => {
    try {
      const response = await axios.get(`/exhibit?id=${exhibitId}`);
      setExhibit(response.data);
    } catch (error) {
      console.error(error);
      setExhibit([]);
    }
  };

  useEffect(() => {
    getExhibitData();
  }, []);

  return (
    <ExhibitPageContainer>
      <Header />
      <InfoContainer>
        <Img src={exhibit.img} alt="전시 대표 이미지" />
        <Infos>
          <h3>{exhibit.title}</h3>
          <div>주최: {exhibit?.owner}</div>
          <div>
            날짜:
            {exhibit?.start_date?.slice(0, 10)} ~{" "}
            {exhibit?.end_date?.slice(0, 10)}
          </div>
          <div>좋아요: {exhibit.likes}</div>
          <div>가격: {exhibit.price}원</div>
          <div>
            <button onClick={handleClickBtn}>구매하기</button>
          </div>
        </Infos>
      </InfoContainer>
    </ExhibitPageContainer>
  );
};

const ExhibitPageContainer = styled.div``;

const InfoContainer = styled.div`
  display: flex;
  border: 1px solid lightblue;
  margin: 30px;
`;

const Img = styled.img`
  width: 250px;
  aspect-ratio: 4 / 5;
  object-fit: cover;
`;

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  div {
    margin: 5px 0;
  }
  button {
    margin-top: 20px;
    padding: 10px;
    background-color: lightblue;
    border: none;
    font-size: 16px;
    font-weight: 600;
    &:hover {
      cursor: pointer;
      color: darkblue;
    }
  }

  input {
    width: 50px;
    height: 30px;
  }
`;
