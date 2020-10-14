import { FiPlus } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'src/components/dynamicLeaflet';
import styled from 'styled-components';
import { Sidebar } from 'src/components/Sidebar';
import { ChangeEvent, useMemo, useState } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { CreateOrphanage, orphanageValidation } from 'src/validations/orphanageValidations';
import { Input } from 'src/components/Input';
import { TextArea } from 'src/components/TextArea';
import { useImgur } from 'src/hooks/useImgur';
import { api } from 'src/services/api';
import { useRouter } from 'next/dist/client/router';
const Container = styled.div`
  display: flex;
  & main {
    flex: 1;
  }
`;

const Form = styled.form`
  width: 700px;
  margin: 64px auto;

  background: #ffffff;
  border: 1px solid #d3e2e5;
  border-radius: 20px;

  padding: 64px 80px;

  overflow: hidden;

  & .leaflet-container{
    margin-bottom: 40px;
    border: 1px solid #d3d2d5;
    border-radius: 20px;
  }

  & fieldset {
    border: 0;
  }

  & fieldset + fieldset {
    margin-top: 80px;
  }

  & fieldset legend {
    width: 100%;

    font-size: 32px;
    line-height: 34px;
    color: #5c8599;
    font-weight: 700;

    border-bottom: 1px solid #d3e2e5;
    margin-bottom: 40px;
    padding-bottom: 24px;
  }

  & .input-block {
    & + .input-block {
      margin-top: 24px;
    }

    & label {
      display: flex;
      color: #8fa7b3;
      margin-bottom: 8px;
      line-height: 24px;
    }

    & label span {
      font-size: 14px;
      color: #8fa7b3;
      margin-left: 24px;
      line-height: 24px;
    }

    & input,
    textarea {
      width: 100%;
      background: #f5f8fa;
      border: 1px solid #d3e2e5;
      border-radius: 20px;
      outline: none;
      color: #5c8599;
    }

    & input {
      height: 64px;
      padding: 0 16px;
    }

    & textarea {
      min-height: 120px;
      max-height: 240px;
      resize: vertical;
      padding: 16px;
      line-height: 28px;
    }

    & .images-container{
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-column-gap: 16px;
      grid-row-gap: 120px;
      & .new-image {
        height: 96px;
        background: #f5f8fa;
        border: 1px dashed #96d2f0;
        border-radius: 20px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      & img{
        position: absolute;
        width: 100%;
        height: 96px;
        object-fit: cover;
        border-radius: 20px;
      }
      & div{
        position: relative;
      }
      & button{
        position: absolute;
        top: 0;
        right: 0;
        color: #FF669D;
        background: white;
        border: 1px solid #d3e2e5;
        width: 40px;
        height: 40px;
        border-bottom-left-radius: 20px;
        border-top-right-radius: 20px;
      }

    }
    
    & .button-select {
      display: grid;
      grid-template-columns: 1fr 1fr;

      & button {
        height: 64px;
        background: #f5f8fa;
        border: 1px solid #d3e2e5;
        color: #5c8599;
        cursor: pointer;

        

        & :first-child {
          border-radius: 20px 0px 0px 20px;
        }

        & :last-child {
          border-radius: 0 20px 20px 0;
          border-left: 0;
        }
      }
      & button.active {
        background: #edfff6;
        border: 1px solid #a1e9c5;
        color: #37c77f;
      }
    }
  }

  & button.confirm-button {
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

      & :hover {
        background: #36cf82;
      }
    }
  }
`;

export default function CreateOrphanagePage() {
  const { push } = useRouter();
  const [selectedImages, SetSelectedImages] = useState<File[]>([]);
  const { uploadImages } = useImgur();
  const previewImages = useMemo(() => selectedImages.map((image) => URL.createObjectURL(image)), [
    selectedImages,
  ]);
  const formik = useFormik<CreateOrphanage>({
    initialValues: {
      name: '',
      latitude: 0,
      longitude: 0,
      about: '',
      instructions: '',
      openingHours: '',
      openOnWeekends: false,
      images: [],
    },
    validationSchema: orphanageValidation,
    onSubmit: async (values) => {
      if (selectedImages?.length === 0) return;
      values.images = await uploadImages(selectedImages);

      await api.post('orphanages', values);
      alert('Boa compeão!');
      push('/app');
    },
  });

  const handleSelectImages = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const selected = Array.from(event.target.files);
    SetSelectedImages((prev) => [...prev, ...selected]);
  };

  const handleRemoveImage = (index: number) => {
    const aux = [...selectedImages];
    aux.splice(index, 1);
    SetSelectedImages(aux);
  };

  return (
    <Container id="page-create-orphanage">
      <Sidebar />

      <main>
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit} className="create-orphanage-form">
            <fieldset>
              <legend>Dados</legend>

              <Map
                center={[-27.2092052, -49.6401092]}
                style={{ width: '100%', height: 280 }}
                zoom={15}
                onclick={(event) => {
                  formik.setFieldValue('latitude', event.latlng.lat);
                  formik.setFieldValue('longitude', event.latlng.lng);
                }}
              >
                <TileLayer />

                {formik.values.latitude !== 0 && formik.values.longitude !== 0 && (
                  <Marker
                    interactive={false}
                    iconProps={{
                      iconUrl: '/img/Marker.svg',

                      iconSize: [58, 68],
                      iconAnchor: [29, 68],
                      popupAnchor: [0, -60],
                    }}
                    position={[formik.values.latitude, formik.values.longitude]}
                  />
                )}
              </Map>

              <div className="input-block">
                <Input id="name" label="Nome" />
              </div>

              <div className="input-block">
                <TextArea id="about" label="Sobre" maxLength={300} />
              </div>

              <div className="input-block">
                <label htmlFor="images">Fotos</label>

                <div className="images-container">
                  {previewImages.map((image, index) => (
                    <div key={index}>
                      <img src={image} alt={formik.values.name} />
                      <button onClick={() => handleRemoveImage(index)}>X</button>
                    </div>
                  ))}
                  <label htmlFor="image[]" className="new-image">
                    <FiPlus size={24} color="#15b6d6" />
                  </label>
                  <input onChange={handleSelectImages} type="file" id="image[]" hidden multiple />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Visitação</legend>

              <div className="input-block">
                <TextArea id="instructions" label="Instruções" />
              </div>

              <div className="input-block">
                <Input id="openingHours" label="Horário de Funcionamento" />
              </div>

              <div className="input-block">
                <label htmlFor="open_on_weekends">Atende fim de semana</label>

                <div className="button-select">
                  <button
                    type="button"
                    className={formik.values.openOnWeekends ? 'active' : ''}
                    onClick={() => {
                      formik.setFieldValue('openOnWeekends', true);
                    }}
                  >
                    Sim
                  </button>
                  <button
                    type="button"
                    className={!formik.values.openOnWeekends ? 'active' : ''}
                    onClick={() => {
                      formik.setFieldValue('openOnWeekends', false);
                    }}
                  >
                    Não
                  </button>
                </div>
              </div>
            </fieldset>

            <button className="confirm-button" type="submit">
              Confirmar
            </button>
          </Form>
        </FormikProvider>
      </main>
    </Container>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
