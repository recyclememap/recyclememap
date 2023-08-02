import styled from '@emotion/styled';

const Ring = styled.div`
  --num-colors: 8;
  --color-size: calc(100% / var(--num-colors));
  width: 50px;
  height: 50px;
  position: relative;
  border-radius: 50%;
  background: conic-gradient(
    #a5ce81 calc(0 * var(--color-size)) calc(1 * var(--color-size)),
    #82bf83 calc(1 * var(--color-size)) calc(2 * var(--color-size)),
    #70ada3 calc(2 * var(--color-size)) calc(3 * var(--color-size)),
    #74adf5 calc(3 * var(--color-size)) calc(4 * var(--color-size)),
    #8f7ac5 calc(4 * var(--color-size)) calc(5 * var(--color-size)),
    #ed738d calc(5 * var(--color-size)) calc(6 * var(--color-size)),
    #ffcd70 calc(6 * var(--color-size)) calc(7 * var(--color-size)),
    #ffee7b calc(7 * var(--color-size)) calc(8 * var(--color-size))
  );

  :before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    background: white;
    width: 110%;
    height: 110%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }
`;

export const Multi = () => {
  return <Ring />;
};
