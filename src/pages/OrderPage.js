import styled from "styled-components";
import { Header } from "../components/Header";
import axios from "../api/axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

export const OrderPage = () => {
  const [exhibit, setExhibit] = useState([]);
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");
  const { exhibitId } = useParams();
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleClickBtn = () => {
    postOrder();
  };

  const postOrder = async () => {
    const userId = Number(cookies.get("USERID"));
    try {
      const response = await axios.post("/order", {
        user_id: userId,
        exhibit_id: exhibitId,
        address,
        name,
        tel,
        amount,
      });
      navigate(`/purchase/${response.data.exhibit_id}`);
    } catch (error) {
      console.error(error);
      alert(JSON.stringify(error.response.data.message));
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

  useEffect(() => {
    getExhibitData();
  }, []);

  return (
    <OrderPageContainer>
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
          <div>가격: {exhibit.price}원</div>
          <div>
            받는 분 성함:{" "}
            <input
              type="string"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </div>
          <div>
            받는 분 주소:{" "}
            <input
              type="string"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              required
            />
          </div>
          <div>
            받는 분 전화번호:
            <input
              type="string"
              placeholder="010-1234-5678"
              value={tel}
              onChange={(e) => {
                setTel(e.target.value);
              }}
              required
            />
          </div>
          <div>총 결제 금액: {exhibit.price * amount}</div>
          <div>
            수량:
            <input
              className="amount"
              type="number"
              placeholder="0"
              min="0"
              value={amount}
              onChange={(e) => {
                setAmount(Number(e.target.value));
              }}
            />
            <button onClick={handleClickBtn}>결제하기</button>
          </div>
        </Infos>
      </InfoContainer>
    </OrderPageContainer>
  );
};

const OrderPageContainer = styled.div``;

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
    height: 30px;
  }
  input.amount {
    width: 50px;
  }
`;
