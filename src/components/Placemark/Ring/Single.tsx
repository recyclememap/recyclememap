import styled from '@emotion/styled';
import { RingElemProps as RingProps } from './Ring';

export const Ring = styled.div<RingProps>`
  background-color: ${(props) => props.bgColors[0]};
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

export const Single = ({ bgColors }: RingProps): JSX.Element => {
  return <Ring bgColors={bgColors} />;
};
