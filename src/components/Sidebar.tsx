import { useRouter } from 'next/dist/client/router';
import { FiArrowLeft } from 'react-icons/fi';
import mapMarkerImg from 'public/img/Marker.svg';
import styled from 'styled-components';

const Aside = styled.aside`
  position: fixed;
  height: 100%;
  padding: 32px 24px;
  background: linear-gradient(329.54deg, #15b6d6 0%, #15d6d6 100%);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  & img {
    width: 48px;
  }
  & footer {
    & a,
    button {
      width: 48px;
      height: 48px;

      border: 0;

      background: #12afcb;
      border-radius: 16px;

      cursor: pointer;

      transition: background-color 0.2s;

      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background: #17d6eb;
      }
    }
  }
`;
export function Sidebar() {
  const { back } = useRouter();
  return (
    <Aside>
      <img src={mapMarkerImg} alt="Happy" />

      <footer>
        <button type="button" onClick={back}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </Aside>
  );
}
