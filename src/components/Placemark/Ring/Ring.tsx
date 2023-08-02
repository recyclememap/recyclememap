import {
  Four0,
  Four1,
  Four2,
  Four3,
  Three0,
  Three1,
  Three2,
  Two0,
  Two1,
  One
} from './styles';

const fourComponents = [Four0, Four1, Four2, Four3];
const threeComponents = [Three0, Three1, Three2];
const twoComponents = [Two0, Two1];

export const Ring = ({
  index,
  bgColor,
  length
}: {
  index: number;
  bgColor: string;
  length: number;
}): JSX.Element => {
  let RingEl;
  switch (length) {
    case 1:
      RingEl = One;
      break;
    case 2:
      RingEl = twoComponents[index];
      break;
    case 3:
      RingEl = threeComponents[index];
      break;
    case 4:
    default:
      RingEl = fourComponents[index];
      break;
  }
  return <RingEl bgColor={bgColor} />;
};
