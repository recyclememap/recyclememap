import type { flatIconsKeys } from '@components/Icon/FlatIcons';
import { flatIcons } from '@components/Icon/FlatIcons';
import { RingWrapper, Cutout, Ring } from './styles';

const allIcons = Object.entries(flatIcons);

export const Marker = ({ icons }: { icons: flatIconsKeys[] }) => {
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
      <Ring bgColors={bgColors} />
      <Cutout />
    </RingWrapper>
  );
};
