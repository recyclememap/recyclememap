import { styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { flatIcons } from './FlatIcons';
import type { flatIconsKeys } from './FlatIcons';

export enum IconSize {
  m = 'm',
  s = 's',
  xs = 'xs'
}

const iconSizes = {
  [IconSize.m]: { size: '40px', padding: '8px' },
  [IconSize.s]: { size: '32px', padding: '6px' },
  [IconSize.xs]: { size: '24px', padding: '4px' }
};

type IconProps = {
  name: flatIconsKeys;
  sizeName?: IconSize;
};

interface IIconEl {
  iconBgColor: string;
  sizeName: keyof typeof iconSizes;
}

const IconEl = styled('img')(({ iconBgColor, sizeName }: IIconEl) => ({
  boxSizing: 'border-box',
  backgroundColor: iconBgColor,
  borderRadius: '50%',
  overflow: 'visible',
  padding: iconSizes[sizeName].padding,
  width: iconSizes[sizeName].size,
  height: iconSizes[sizeName].size
}));

export const Icon = ({ name, sizeName, ...props }: IconProps) => {
  const { t } = useTranslation();
  const { color, src, title } = flatIcons[name];

  return (
    <IconEl
      src={src}
      iconBgColor={color}
      sizeName={sizeName ?? IconSize.s}
      title={t(`icons.${title}`)}
      {...props}
    />
  );
};
