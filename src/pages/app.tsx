import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';
import styled from 'styled-components';
import { MapProps } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  position: relative;
  display: flex;
`;

const Aside = styled.aside`
  width: 440px;
  background: linear-gradient(329.54deg, #29b6d1 0%, #00c7c7 100%);

  padding: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & h2 {
    font-size: 40px;
    font-weight: 800;

    line-height: 42px;
    margin-top: 64px;
  }

  & p {
    line-height: 28px;
    margin-top: 24px;
  }

  & footer {
    display: flex;
    flex-direction: column;

    line-height: 24px;
    & strong {
      font-weight: 800;
    }
  }
`;

const DynamicMap = dynamic<any>(() => import('react-leaflet').then((leaflet) => leaflet.Map), {
  ssr: false,
});

const DynamicTileLayer = dynamic<any>(
  () => import('react-leaflet').then((leaflet) => leaflet.TileLayer),
  {
    ssr: false,
  }
);

const StyledMap = styled(DynamicMap)<MapProps>`
  width: 100%;
  height: 100%;

  z-index: 5;
`;

const Button = styled.a`
  position: absolute;
  right: 40px;
  bottom: 40px;

  z-index: 10;

  width: 64px;
  height: 64px;
  background: #15c3d6;
  border-radius: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.2s;

  &:hover {
    background: #17d6eb;
  }
`;

export default function App() {
  return (
    <Container>
      <Aside>
        <header>
          <img src="img/Marker.svg" />
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando sua visita :)</p>
        </header>
        <footer>
          <strong>São Paulo</strong>
          <span>São Paulo</span>
        </footer>
      </Aside>
      <StyledMap center={[-23.6821604, -46.8754915]} zoom={15}>
        <DynamicTileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"></DynamicTileLayer>
      </StyledMap>

      <Link href="">
        <Button>
          <FiPlus size={32} color="#FFF" />
        </Button>
      </Link>
    </Container>
  );
}
