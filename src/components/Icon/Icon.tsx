import { styled, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { flatIcons } from './FlatIcons';
import type { flatIconsKeys } from './FlatIcons';
export type IconProps = {
  name: flatIconsKeys;
};

const sizes = {
  m: { width: '45px', padding: '15px' },
  s: { width: '20px', padding: '10px' }
};

const Root = styled('img')(
  (props: { iconBgColor: string; sizeName: keyof typeof sizes }) => ({
    backgroundColor: props.iconBgColor,
    borderRadius: '50%',
    overflow: 'visible',
    padding: sizes[props.sizeName as keyof typeof sizes].padding,
    width: sizes[props.sizeName as keyof typeof sizes].width
  })
);

export const Icon = ({ name }: IconProps) => {
  const { t } = useTranslation();
  const { color, src, title } = flatIcons[name];
  return (
    <Tooltip arrow title={t(`icons.${title}`)}>
      <Root src={src} iconBgColor={color} sizeName="s" />
    </Tooltip>
  );
};
