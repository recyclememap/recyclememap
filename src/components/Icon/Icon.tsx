import { styled, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { flatIcons } from './FlatIcons';
import type { flatIconsKeys } from './FlatIcons';

const sizes = {
  m: { width: '45px', padding: '15px' },
  s: { width: '40px', padding: '8px' }
};

type IconProps = {
  name: flatIconsKeys;
};

interface IIconEl {
  iconBgColor: string;
  sizeName: keyof typeof sizes;
}

const IconEl = styled('img')(({ iconBgColor, sizeName }: IIconEl) => ({
  backgroundColor: iconBgColor,
  borderRadius: '50%',
  overflow: 'visible',
  padding: sizes[sizeName].padding,
  width: sizes[sizeName].width
}));

export const Icon = ({ name }: IconProps) => {
  const { t } = useTranslation();
  const { color, src, title } = flatIcons[name];

  return (
    <Tooltip arrow title={t(`icons.${title}`)}>
      <IconEl src={src} iconBgColor={color} sizeName="s" />
    </Tooltip>
  );
};
