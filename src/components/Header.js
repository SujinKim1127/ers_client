import styled from "styled-components";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <HeaderContainer>
      <Link to="/">
        <h2>전시 예매 시스템</h2>
      </Link>
      <a href="http://localhost:8080/signin">
        <button>로그인</button>
      </a>
      <a href="http://localhost:8080/logout">
        <button>로그아웃</button>
      </a>
      <Link to="/mypage">
        <button>마이페이지</button>
      </Link>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 98%;
  display: flex;
  padding: 0 20px;

  a {
    text-decoration: none;
    color: black;
  }

  h2 {
    flex: 1;
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
  }
  border-bottom: 1px solid gray;
`;
