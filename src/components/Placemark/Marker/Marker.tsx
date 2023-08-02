import type { flatIconsKeys } from '@components/Icon/FlatIcons';
import { flatIcons } from '@components/Icon/FlatIcons';
import { Ring, MultiColouredRing } from '../Ring';
import { RingWrapper, Cutout } from './styles';

const allIcons = Object.entries(flatIcons);

export const Marker = ({ icons }: { icons: flatIconsKeys[] }) => {
  const iconsLength = icons.length;
  if (iconsLength <= 4) {
    return (
      <RingWrapper>
        {allIcons
          .filter((item) => {
            const [key] = item;
            return icons.includes(key as flatIconsKeys);
          })
          .map((item, index, arr) => {
            const [_, value] = item;
            return (
              <Ring
                key={index}
                index={index}
                bgColor={value.color}
                length={iconsLength}
              />
            );
          })}
        <Cutout />
      </RingWrapper>
    );
  } else {
    return <MultiColouredRing />;
  }
};
