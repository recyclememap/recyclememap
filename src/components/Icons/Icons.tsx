import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useTranslation } from 'react-i18next';
import { flatIcons } from './FlatIcons';
import { Root, iconBgColor } from './Icons.css';

type IconsProps = {
  name: keyof typeof flatIcons;
};

export const Icons = ({ name }: IconsProps) => {
  const { t } = useTranslation();
  const { color, src, title } = flatIcons[name];
  return (
    <img
      src={src}
      title={t(`icons.${title}`)}
      className={Root}
      style={assignInlineVars({ [iconBgColor]: color })}
    />
  );
};
