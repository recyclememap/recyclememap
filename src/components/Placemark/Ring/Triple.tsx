import styled from '@emotion/styled';
import { RingElemProps as RingProps } from './Ring';

const Ring = styled.div<RingProps>`
  border-radius: 50%;
  height: 100%;
  width: 100%;
  --color-size: calc(100% / 3);
  ${(props: RingProps) => `background: conic-gradient(
    ${props.bgColors[0]} calc(0 * var(--color-size)) calc(1 * var(--color-size)),
    ${props.bgColors[1]} calc(1 * var(--color-size)) calc(2 * var(--color-size)),
    ${props.bgColors[2]} calc(2 * var(--color-size)) calc(3 * var(--color-size))
  );`}
`;

export const Triple = ({ bgColors }: RingProps): JSX.Element => {
  return <Ring bgColors={bgColors} />;
};
