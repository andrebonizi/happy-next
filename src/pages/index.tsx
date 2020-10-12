import styled from 'styled-components';
import { FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

const Container = styled.div`
  background: linear-gradient(329.54deg, #29b6d1 0%, #00c7c7 100%);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;

  width: 100%;
  max-width: 1100px;

  height: 100%;
  max-height: 680px;

  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;

  background: url('img/Home.svg') no-repeat 80% center;
`;

const Main = styled.main`
  max-width: 358px;
`;

const Title = styled.h1`
  font-size: 76px;
  font-weight: 900;
  line-height: 70px;
`;

const Subtitle = styled.p`
  margin-top: 40px;
  font-size: 24px;
  line-height: 34px;
`;

const Location = styled.div`
  position: absolute;
  right: 0;
  top: 0;

  font-size: 24px;
  line-height: 34px;

  display: flex;
  flex-direction: column;

  text-align: right;
`;

const Strong = styled.strong`
  font-weight: 800;
`;

const Button = styled.a`
  position: absolute;
  right: 0;
  bottom: 0;

  width: 80px;
  height: 80px;
  background: #ffd666;
  border-radius: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.2s;

  &:hover {
    background: #96feff;
  }
`;

export default function Home() {
  return (
    <Container>
      <Wrapper>
        <img src="img/Logo.svg" alt="Happy" />
        <Main>
          <Title>Leve felicidade para o mundo</Title>
          <Subtitle>Visite orfanatos e mude o dia de muitas crianças.</Subtitle>
        </Main>
        <Location>
          <Strong>São Paulo</Strong>
          <span>São Paulo</span>
        </Location>
        <Link href="/app">
          <Button>
            <FiArrowRight size={26} color="rgba(0,0,0,0.6)" />
          </Button>
        </Link>
      </Wrapper>
    </Container>
  );
}
