import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import styled from "styled-components";

export const Mypage = () => {
  const [likes, setLikes] = useState();
  const [orders, setOrders] = useState();
  useEffect(() => {
    data();
  }, []);
  const data = async () => {
    try {
      const response = await axios.get(`/mypage`);
      const resdata = response.data;
      console.log("data", resdata[0].likes);
      setLikes(resdata[0].likes);
      setOrders(resdata[0].orders);
      console.log();
    } catch (error) {
      console.error("error: ", error);
    }
  };
  return (
    <Container>
      <TopBox>
        <HeaderBox>구매한 목록</HeaderBox>
        <ContentBox>
          {orders?.map((el, idx) => {
            return (
              <InsideBox>
                <NumberBox>{idx}</NumberBox>
                <TitleBox>{el.title}</TitleBox>
                <DateBox>{el.purchase_date.slice(0, 11)}</DateBox>
                <AmountBox>{el.amount}</AmountBox>
              </InsideBox>
            );
          })}
        </ContentBox>
      </TopBox>
      <BottomBox>
        <HeaderBox>좋아요 누른 전시</HeaderBox>
        <ContentBox>
          {likes?.map((el, idx) => {
            return (
              <InsideBox>
                <NumberBox>{idx}</NumberBox>
                <TitleBox>{el.title}</TitleBox>
              </InsideBox>
            );
          })}
        </ContentBox>
      </BottomBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  margin: auto;
  justify-content: center;
  flex-direction: column;
`;

const TopBox = styled.div``;

const HeaderBox = styled.div`
  font-weight: 700;
  font-size: 20px;
`;
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
`;

const BottomBox = styled.div``;

const InsideBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 30px;
`;

const TitleBox = styled.div`
  margin: auto;
`;

const DateBox = styled.div`
  width: 100px;
  margin: auto;
`;

const AmountBox = styled.div`
  width: 20px;
  margin: auto;
`;

const NumberBox = styled.div`
  width: 10px;
  margin: auto;
`;
