import styled from '@emotion/styled';
import { RingElemProps as RingProps } from './Ring';

export const Ring = styled.div<RingProps>`
  transform: rotate(-45deg);
  border-radius: 50%;
  border-right: ${(props: RingProps) => `25px solid ${props.bgColors[0]}`};
  border-top: ${(props: RingProps) => `25px solid ${props.bgColors[1]}`};
  border-left: ${(props: RingProps) => `25px solid ${props.bgColors[2]}`};
  border-bottom: ${(props: RingProps) => `25px solid ${props.bgColors[3]}`};
`;

export const Quadruple = ({ bgColors }: RingProps): JSX.Element => {
  return <Ring bgColors={bgColors} />;
};
