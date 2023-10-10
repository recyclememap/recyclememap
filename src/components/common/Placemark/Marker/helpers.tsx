import { flatIcons } from '@components/common';
import type { flatIconsKeys } from '@root/components';

const allIcons = Object.entries(flatIcons);

export const getBackground = (icons: flatIconsKeys[]) => {
  const percents = 100 / icons.length;

  const gradient = allIcons.reduce((acc: string[], [key, value]) => {
    if (icons.includes(key as flatIconsKeys)) {
      const idx = acc.length;
      acc.push(`${value.color} ${idx * percents}% ${(idx + 1) * percents}%`);
    }
    return acc;
  }, []);

  return `conic-gradient(${gradient.join(',')})`;
};
