import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import styled from "styled-components";
import { Header } from "../components/Header";

export const Mypage = () => {
  const [likes, setLikes] = useState();
  const [orders, setOrders] = useState();
  const [error, setError] = useState(false);
  useEffect(() => {
    data();
  }, []);
  const data = async () => {
    try {
      const response = await axios.get(`/mypage`);
      const resdata = response.data;
      setLikes(resdata[0].likes);
      setOrders(resdata[0].orders);
      setError(false);
    } catch (error) {
      setError(true);
      console.error("error: ", error);
    }
  };
  return (
    <Container>
      <Header />
      {error ? (
        "로그인이 필요한 서비스입니다"
      ) : (
        <>
          <TopBox>
            <HeaderBox>예매한 목록</HeaderBox>
            <ContentBox>
              {orders?.length === 0 ? (
                "예매한 목록이 없습니다"
              ) : (
                <>
                  <InsideBox>
                    <table>
                      <tr>
                        <td>
                          <NumberBox className="bold">예매 번호</NumberBox>
                        </td>
                        <td>
                          <TitleBox className="bold">전시 제목</TitleBox>
                        </td>
                        <td>
                          <DateBox className="bold">예매 날짜</DateBox>
                        </td>
                        <td>
                          <AmountBox className="bold">수량</AmountBox>
                        </td>
                      </tr>
                      {orders?.map((el, idx) => {
                        return (
                          <tr key={el.order_id}>
                            <td>
                              <NumberBox>{idx + 1}</NumberBox>
                            </td>
                            <td>
                              <TitleBox>
                                <a href={`/exhibit/${el.exhibit_id}`}>
                                  {el.title}
                                </a>
                              </TitleBox>
                            </td>
                            <td>
                              <DateBox>{el.purchase_date.slice(0, 11)}</DateBox>
                            </td>
                            <td>
                              <AmountBox>{el.amount}</AmountBox>
                            </td>
                          </tr>
                        );
                      })}
                    </table>
                  </InsideBox>
                </>
              )}
            </ContentBox>
          </TopBox>
          <BottomBox>
            <HeaderBox>좋아요 누른 전시</HeaderBox>
            <ContentBox>
              {likes?.length === 0 ? (
                "좋아요 누른 전시가 없습니다"
              ) : (
                <>
                  <InsideBox>
                    <table>
                      <tr>
                        <td>
                          <NumberBox className="bold">좋아요 번호</NumberBox>
                        </td>
                        <td>
                          <TitleBox className="bold">전시 제목</TitleBox>
                        </td>
                      </tr>
                      {likes?.map((el, idx) => {
                        return (
                          <tr key={el.wish_id}>
                            <td>
                              <NumberBox>{idx + 1}</NumberBox>
                            </td>
                            <td>
                              <TitleBox>
                                <a href={`/exhibit/${el.exhibit_id}`}>
                                  {el.title}
                                </a>
                              </TitleBox>
                            </td>
                          </tr>
                        );
                      })}
                    </table>
                  </InsideBox>
                </>
              )}
            </ContentBox>
          </BottomBox>
          <a className="modify" href="http://localhost:8080/modifyUserInfo">
            회원정보수정
          </a>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  margin: auto;
  justify-content: center;
  flex-direction: column;
  padding: 0 20px;

  .bold {
    font-weight: 700;
  }
  .modify {
    margin-top: 100px;
  }
`;

const TopBox = styled.div`
  margin-bottom: 150px;
`;

const HeaderBox = styled.div`
  font-weight: 700;
  font-size: 20px;
  height: 40px;
  display: flex;
  align-items: center;
  margin-top: 30px;
  border-bottom: 1px solid gray;
`;
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
`;

const BottomBox = styled.div`
  margin-bottom: 150px;
`;

const InsideBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 30px;
`;

const TitleBox = styled.div`
  margin: auto;
  width: 300px;
  a {
    text-decoration: none;
    color: black;
  }
  &:hover {
    font-weight: 600;
  }
`;

const DateBox = styled.div`
  width: 120px;
  margin: auto;
`;

const AmountBox = styled.div`
  width: 40px;
  margin: auto;
`;

const NumberBox = styled.div`
  width: 80px;
  margin: auto;
`;
