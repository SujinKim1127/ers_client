import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export const Exhibit = ({ exhibit }) => {
  const navigate = useNavigate();

  const handleClickExhibit = () => {
    navigate(`/exhibit/${exhibit.exhibit_id}`);
  };

  return (
    <ExhibitContainer onClick={handleClickExhibit}>
      <Img src={exhibit?.img} alt="전시 대표 이미지" />
      <div className="title">{exhibit?.title}</div>
      <div>{exhibit?.owner}</div>
      <div>
        {exhibit?.start_date.slice(0, 10)} ~ {exhibit?.end_date.slice(0, 10)}
      </div>
    </ExhibitContainer>
  );
};

const ExhibitContainer = styled.div`
  border: 1px solid lightblue;
  width: 250px;
  margin: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  &:hover {
    cursor: pointer;
  }

  div.title {
    font-weight: 600;
    &:hover {
      color: darkblue;
    }
  }
`;

const Img = styled.img`
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
`;
