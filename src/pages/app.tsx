import Link from 'next/link';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import styled from 'styled-components';
import { Map, TileLayer, Popup, Marker } from '../components/dynamicLeaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { api } from 'src/services/api';
import { Orphanage } from '@models/orphanage';
import { getRepository } from 'fireorm';
import { GetStaticProps } from 'next';
import { OrphanagesView } from 'src/views/orphanages';

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

const StyledPopup = styled(Popup)`
  & .leaflet-popup-content-wrapper {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 20px;
  }

  & .leaflet-popup-content {
    color: #0089a5;
    font-size: 20px;
    font-weight: bold;
    margin: 8px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & a {
      width: 40px;
      height: 40px;
      background: #15c3d6;
      box-shadow: 17.2868px 27.6589px 41.4884px rgba(23, 142, 166, 0.16);
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  & .leaflet-popup-tip-container {
    display: none;
  }
`;

const StyledMap = styled(Map)`
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

interface AppProps {
  orphanages: Orphanage[];
}

export default function App(props: AppProps) {
  // const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  // useEffect(() => {
  //   api.get<Orphanage[]>('orphanages').then((response) => {
  //     setOrphanages(response.data);
  //   });
  // }, []);

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
        <TileLayer></TileLayer>
        {props.orphanages.map((orphanage) => {
          return (
            <Marker
              key={orphanage.id}
              iconProps={{
                iconUrl: 'img/Marker.svg',
                iconSize: [58, 68],
                iconAnchor: [29, 68],
                popupAnchor: [170, 2],
              }}
              position={[orphanage.latitude, orphanage.longitude]}
            >
              <StyledPopup closeButton={false} minWidth={240} maxWidth={240}>
                {orphanage.name}
                <Link href={`/orphanage/${orphanage.id}`}>
                  <a>
                    <FiArrowRight size={20} color="#FFF" />
                  </a>
                </Link>
              </StyledPopup>
            </Marker>
          );
        })}
      </StyledMap>

      <Link href="/orphanage/create">
        <Button>
          <FiPlus size={32} color="#FFF" />
        </Button>
      </Link>
    </Container>
  );
}

export const getStaticProps: GetStaticProps<AppProps> = async () => {
  const repository = getRepository(Orphanage);
  const orphanages = await repository.find();

  return {
    props: {
      orphanages: OrphanagesView(orphanages),
    },
    revalidate: 60,
  };
};
