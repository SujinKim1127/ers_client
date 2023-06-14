import styled from "styled-components";
import { Header } from "../components/Header";
import axios from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export const PurchasePage = () => {
  const [order, setOrder] = useState([]);
  const { orderId } = useParams();
  const navigate = useNavigate();

  const handleClickBtn = () => {
    cancelOrder().then(() => {
      navigate("/mypage");
    });
  };

  const getOrderInfo = async () => {
    try {
      const response = await axios.get(`/order?id=${orderId}`);
      setOrder(response.data);
    } catch (error) {
      console.error(error);
      setOrder([]);
    }
  };

  const cancelOrder = async () => {
    try {
      await axios.delete(`/order?id=${orderId}`);
      alert("주문이 취소되었습니다.");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOrderInfo();
  }, []);

  return (
    <PurchasePageContainer>
      <Header />
      <InfoContainer>
        <h3>주문 확인</h3>
        <div>전시: {order.title}</div>
        <div>구매 일자: {order.purchase_date?.slice(0, 10)}</div>
        <div>수량: {order.amount}</div>
        <div>결제 금액: {order.price}</div>
        <div>받는 분 성함: {order.name}</div>
        <div>받는 분 주소: {order.address}</div>
        <div>받는 분 전화번호: {order.tel}</div>
        <button onClick={handleClickBtn}>주문 취소</button>
      </InfoContainer>
    </PurchasePageContainer>
  );
};

const PurchasePageContainer = styled.div``;

const InfoContainer = styled.div`
  margin: 30px;
  border: 1px solid gray;
  padding: 0 20px 20px;
  div {
    margin: 3px 0;
  }

  button {
    margin-top: 20px;
    background-color: transparent;
    border: 1px solid blue;
    &:hover {
      cursor: pointer;
      color: blue;
    }
  }
`;
