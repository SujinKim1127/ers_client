import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";

export const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const cookies = new Cookies();

  useEffect(() => {
    const USERID = cookies.get("USERID");
    if (USERID === undefined) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, []);

  return (
    <HeaderContainer>
      <Link to="/" className="main">
        <h2>전시 예매 시스템</h2>
      </Link>
      {isLogin ? (
        <a href="http://localhost:8080/logout">
          <button>로그아웃</button>
        </a>
      ) : (
        <a href="http://localhost:8080/signin">
          <button>로그인</button>
        </a>
      )}
      <Link to="/mypage">
        <button>마이페이지</button>
      </Link>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  //padding: 0 20px;

  a {
    text-decoration: none;
    color: black;
  }

  a.main {
    flex: 1;
    margin-left: 20px;
  }

  button {
    width: 80px;
    height: 100%;
    background-color: transparent;
    border: none;
    font-weight: 600;
    &:hover {
      cursor: pointer;
      color: darkblue;
    }
    margin-right: 20px;
  }
  border-bottom: 1px solid gray;
`;
