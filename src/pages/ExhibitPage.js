import styled from "styled-components";
import { Header } from "../components/Header";
import axios from "../api/axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

export const ExhibitPage = () => {
  const [exhibit, setExhibit] = useState([]);
  const { exhibitId } = useParams();
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleClickPurchaseBtn = () => {
    navigate(`/order/${exhibitId}`);
  };

  const handleClickLikeBtn = () => {
    postLike().then(() => {
      getExhibitData();
    });
  };

  const handleClickDeleteBtn = async () => {
    try {
      const response = await axios
        .delete(`/exhibit?id=${exhibitId}`)
        .then(() => {
          alert("삭제가 완료되었습니다");
        });
    } catch (error) {
      console.log(error);
    }
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

  const postLike = async () => {
    try {
      const response = await axios.post("/like", {
        user_id: Number(cookies.get("USERID")),
        exhibit_id: exhibitId,
      });
      if (response.status === 201) {
        alert(JSON.stringify(response.data.message));
      } else if (response.status === 204) {
        alert("좋아요가 취소되었습니다.");
      }
    } catch (error) {
      alert(JSON.stringify(error.response.data));
    }
  };

  useEffect(() => {
    getExhibitData();
  }, [exhibitId]);

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
            <button onClick={handleClickLikeBtn}>♥︎ 좋아요하기</button>
            <button onClick={handleClickPurchaseBtn}>구매하기</button>
            {cookies.get("USERID") === "0" ? (
              <button onClick={handleClickDeleteBtn}>삭제하기</button>
            ) : (
              ""
            )}
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
  margin-right: 20px;
`;

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  div {
    margin: 5px 0;
  }
  button {
    margin-top: 20px;
    margin-right: 10px;
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
