import { Double } from './Double';
import { Multi } from './Multi';
import { Quadruple } from './Quadruple';
import { Single } from './Single';
import { Triple } from './Triple';

export type RingElemProps = {
  bgColors: string[];
};

type RingProps = RingElemProps & {
  length: number;
};

export const Ring = ({ bgColors, length }: RingProps): JSX.Element => {
  switch (length) {
    case 1:
      return <Single bgColors={bgColors} />;
    case 2:
      return <Double bgColors={bgColors} />;
    case 3:
      return <Triple bgColors={bgColors} />;
    case 4:
      return <Quadruple bgColors={bgColors} />;
    default:
      return <Multi />;
  }
};
