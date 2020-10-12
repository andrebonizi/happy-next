import styled from "styled-components"
import logoimg from '../../public/img/Logo.svg';

const Container = styled.div`
  background: linear-gradient(329.54deg, #29B6D1 0%, #00C7C7 100%);
  width: 100vw;
  height: 100vh;
`;


export default function Home() {
  return (
    <Container>
      <h1>Hello!</h1>
      <img src={logoimg} />
    </Container>
  )
}
