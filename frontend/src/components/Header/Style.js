import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 115px;
  background: linear-gradient(180deg, rgba(80, 80, 80, 1) 25%, #fff 100%);
  .Content {
    width: 100%;
    height: 100px;
    background: white;
  }
  .Logo {
    display: ms-flexbox;
    align-items: center;
    margin-left: 15px;
    .text {
      position: relative;
      height: 80px;
      .text-style {
        font-size: 42px;
        letterspacing: 2px;
        fontweight: 800;
        margin: 16px 0;
        position: inherit;
        z-index: 23;
      }

      .image {
        position: absolute;
        top: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        img {
          animation: spin 5s;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
          opacity: 0.75;
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        }
      }
    }
  }
`;
