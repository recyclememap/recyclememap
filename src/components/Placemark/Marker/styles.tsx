import styled from '@emotion/styled';
import { flatIcons } from '@components/Icon/FlatIcons';
import type { flatIconsKeys } from '@components/Icon/FlatIcons';

type RingProps = {
  icons: flatIconsKeys[];
};

const allIcons = Object.entries(flatIcons);

const getBackground = (icons: string[]) => {
  const gradient = allIcons
    .filter((item) => {
      const [key] = item;
      return icons.includes(key as flatIconsKeys);
    })
    .map((item, idx, bgColors) => {
      const [_, value] = item;
      const colorSize = bgColors.length;
      return `${value.color} ${idx * (100 / colorSize)}% ${
        (idx + 1) * (100 / colorSize)
      }%`;
    });

  return `background: conic-gradient(${gradient.join(',')});`;
};

export const RingWrapper = styled('div')({
  position: 'relative',
  width: '50px',
  height: '50px'
});

export const Ring = styled.div<RingProps>`
  border-radius: 50%;
  height: 100%;
  width: 100%;
  ${(props: RingProps) => `${getBackground(props.icons)}`}
`;

export const Cutout = styled('div')({
  width: '50%',
  height: '50%',
  backgroundColor: 'white',
  position: 'absolute',
  top: '25%',
  left: '25%',
  borderRadius: '50%',
  pointerEvents: 'none'
});
