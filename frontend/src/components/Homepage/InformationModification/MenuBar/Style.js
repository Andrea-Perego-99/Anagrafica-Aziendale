import styled from "styled-components";

export const Wrapper = styled.div`
  ul {
    animation: appear 2s;
    @keyframes appear {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
`;
