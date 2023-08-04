import type { flatIconsKeys } from '@components/Icon/FlatIcons';
import { RingWrapper, Cutout, Ring } from './styles';

export const Marker = ({ icons }: { icons: flatIconsKeys[] }) => {
  return (
    <RingWrapper>
      <Ring icons={icons} />
      <Cutout />
    </RingWrapper>
  );
};
