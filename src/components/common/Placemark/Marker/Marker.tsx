import type { flatIconsKeys } from '@root/components';
import { RingWrapper, Cutout, Ring } from './styled';

export const Marker = ({ icons }: { icons: flatIconsKeys[] }) => {
  return (
    <RingWrapper data-testid={Marker.name}>
      <Ring icons={icons} />
      <Cutout />
    </RingWrapper>
  );
};
