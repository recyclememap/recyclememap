import styled from '@emotion/styled';
// FIXME: I can not import here as @root/components because I've got errors in tests (run loaders.spec.tsx)
import { flatIcons } from '@components/common';
import type { flatIconsKeys } from '@root/components';

type RingProps = {
  icons: flatIconsKeys[];
};

const allIcons = Object.entries(flatIcons);

const getBackground = (icons: flatIconsKeys[]) => {
  const percents = 100 / icons.length;

  const gradient = allIcons.reduce((acc: string[], [key, value]) => {
    if (icons.includes(key as flatIconsKeys)) {
      const idx = acc.length;
      acc.push(`${value.color} ${idx * percents}% ${(idx + 1) * percents}%`);
    }
    return acc;
  }, []);

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
