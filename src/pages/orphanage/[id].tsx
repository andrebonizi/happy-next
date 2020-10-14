import { FaWhatsapp } from 'react-icons/fa';
import { FiClock, FiInfo } from 'react-icons/fi';
import { Map, Marker, TileLayer } from '../../components/dynamicLeaflet';

import mapMarkerImg from 'public/img/Marker.svg';

import styled from 'styled-components';
import { Sidebar } from 'src/components/Sidebar';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Orphanage } from '@models/orphanage';
import { getRepository } from 'fireorm';
import { OrphanageView } from 'src/views/orphanages';
import { useState } from 'react';

const PageOrphanage = styled.div`
  display: flex;
  min-height: 100vh;

  & main {
    flex: 1;
  }
`;

const OrphanageDetails = styled.div`
  width: 700px;
  margin: 64px auto;

  background: #ffffff;
  border: 1px solid #d3e2e5;
  border-radius: 20px;

  overflow: hidden;

  & .orphanage-details-content {
    padding: 80px;

    & h1 {
      color: #4d6f80;
      font-size: 54px;
      line-height: 54px;
      margin-bottom: 8px;
    }

    & p {
      line-height: 28px;
      color: #5c8599;
      margin-top: 24px;
    }

    & hr {
      width: 100%;
      height: 1px;
      border: 0;
      background: #d3e2e6;
      margin: 64px 0;
    }
    & h2 {
      font-size: 36px;
      line-height: 46px;
      color: #4d6f80;
    }
    & button.contact-button {
      margin-top: 64px;

      width: 100%;
      height: 64px;
      border: 0;
      cursor: pointer;
      background: #3cdc8c;
      border-radius: 20px;
      color: #ffffff;
      font-weight: 800;

      display: flex;
      justify-content: center;
      align-items: center;

      transition: background-color 0.2s;
      & svg {
        margin-right: 16px;
      }
      &:hover {
        background: #36cf82;
      }
    }
    & .open-details {
      margin-top: 24px;

      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 20px;
      & div {
        padding: 32px 24px;
        border-radius: 20px;
        line-height: 28px;
        & svg {
          display: block;
          margin-bottom: 20px;
        }
      }
      & div.hour {
        background: linear-gradient(149.97deg, #e6f7fb 8.13%, #ffffff 92.67%);
        border: 1px solid #b3dae2;
        color: #5c8599;
      }
      & div.open-on-weekends {
        background: linear-gradient(154.16deg, #edfff6 7.85%, #ffffff 91.03%);
        border: 1px solid #a1e9c5;
        color: #37c77f;
      }
      & div.dont-open {
        background: linear-gradient(154.16deg, #fdf0f5 7.85%, #ffffff 91.03%);
        border: 1px solid #ffdcd4;
        color: #ff669d;
      }
    }
    & .map-container {
      margin-top: 64px;
      background: #e6f7fb;
      border: 1px solid #b3dae2;
      border-radius: 20px;
      & .leaflet-container {
        border-bottom: 1px solid #dde3f0;
        border-radius: 20px;
      }
      & footer {
        padding: 20px 0;
        text-align: center;
        & a {
          line-height: 24px;
          color: #0089a5;
          text-decoration: none;
        }
      }
    }
  }

  & > img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  & .images {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    column-gap: 16px;

    margin: 16px 40px 0;
    & button {
      border: 0;
      height: 88px;
      background: none;
      cursor: pointer;
      border-radius: 20px;
      overflow: hidden;
      outline: none;

      opacity: 0.6;

      & img {
        width: 100%;
        height: 88px;
        object-fit: cover;
      }
    }
    &button.active {
      opacity: 1;
    }
  }
`;

interface OrphanagePageProps {
  orphanage?: Orphanage;
}

export default function OrphanagePage({ orphanage }: OrphanagePageProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!orphanage) {
    return <div>404</div>;
  }

  return (
    <PageOrphanage>
      <Sidebar />
      <main>
        <OrphanageDetails>
          <img src={orphanage.images[activeImageIndex]} alt={orphanage.name} />

          <div className="images">
            {orphanage.images.map((image, index) => (
              <button
                key={orphanage.id}
                className={activeImageIndex === index ? 'active' : ''}
                type="button"
                onClick={() => {
                  setActiveImageIndex(index);
                }}
              >
                <img src={image} alt={orphanage.name} />
              </button>
            ))}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer />
                <Marker
                  interactive={false}
                  iconProps={{
                    iconUrl: mapMarkerImg,

                    iconSize: [58, 68],
                    iconAnchor: [29, 68],
                    popupAnchor: [0, -60],
                  }}
                  position={[orphanage.latitude, orphanage.longitude]}
                />
              </Map>

              <footer>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.openingHours}
              </div>
              {orphanage.openOnWeekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="dont-open">
                  <FiInfo size={32} color="#FF669D" />
                  Não atendemos <br />
                  fim de semana
                </div>
              )}
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </OrphanageDetails>
      </main>
    </PageOrphanage>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const repository = getRepository(Orphanage);

  const orphanages = await repository.find();
  return {
    paths: orphanages.map((orphanage) => ({
      params: {
        id: orphanage.id,
      },
    })),

    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<OrphanagePageProps> = async (context) => {
  const repository = getRepository(Orphanage);

  const orphanage = await repository.findById(context.params?.id as string);
  return {
    props: {
      orphanage: orphanage ? OrphanageView(orphanage) : undefined,
    },
    revalidate: false,
  };
};
