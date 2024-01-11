import { styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { flatIcons } from './FlatIcons';
import type { flatIconsKeys } from './FlatIcons';

const sizes = {
  m: { size: '40px', padding: '8px' },
  s: { size: '32px', padding: '6px' }
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
  width: sizes[sizeName].size,
  height: sizes[sizeName].size
}));

export const Icon = ({ name }: IconProps) => {
  const { t } = useTranslation();
  const { color, src, title } = flatIcons[name];

  return (
    <IconEl
      src={src}
      iconBgColor={color}
      sizeName="s"
      title={t(`icons.${title}`)}
    />
  );
};
