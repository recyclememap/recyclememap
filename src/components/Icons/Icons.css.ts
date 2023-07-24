import { createVar, style } from '@vanilla-extract/css';

export const iconBgColor = createVar();

export const Root = style({
  backgroundColor: iconBgColor,
  borderRadius: '50%',
  overflow: 'visible',
  padding: '15px',
  width: '45px'
});
