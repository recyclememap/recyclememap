import type { flatIconsKeys } from '@components/Icon';
import { RingWrapper, Cutout, Ring } from './styles';

export const Marker = ({ icons }: { icons: flatIconsKeys[] }) => {
  return (
    <RingWrapper data-testid={Marker.name}>
      <Ring icons={icons} />
      <Cutout />
    </RingWrapper>
  );
};
