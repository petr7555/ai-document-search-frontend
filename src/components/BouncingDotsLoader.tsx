import styled from '@emotion/styled';

export const BouncingLoader = styled.div`
  display: flex;
  justify-content: center;

  > div {
    width: 7px;
    height: 7px;
    margin: 10px 4px 5px 4px;
    border-radius: 50%;
    background-color: #a3a1a1;
    opacity: 1;
    animation: bouncing-loader 0.5s infinite alternate;
  }

  @keyframes bouncing-loader {
    to {
      opacity: 0.1;
      transform: translateY(-10px);
    }
  }

  > div:nth-child(2) {
    animation-delay: 0.2s;
  }

  > div:nth-child(3) {
    animation-delay: 0.4s;
  }
`;
