import type { flatIconsKeys } from '@components/Icon/FlatIcons';
import { flatIcons } from '@components/Icon/FlatIcons';
import { Ring } from '../Ring';
import { RingWrapper, Cutout } from './styles';

const allIcons = Object.entries(flatIcons);

export const Marker = ({ icons }: { icons: flatIconsKeys[] }) => {
  const iconsLength = icons.length;
  const bgColors = allIcons
    .filter((item) => {
      const [key] = item;
      return icons.includes(key as flatIconsKeys);
    })
    .map((item) => {
      const [_, value] = item;
      return value.color;
    });

  return (
    <RingWrapper>
      <Ring length={iconsLength} bgColors={bgColors} />
      <Cutout />
    </RingWrapper>
  );
};
