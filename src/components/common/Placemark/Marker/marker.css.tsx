import { style, createVar } from '@vanilla-extract/css';

export const backgroundVar = createVar();

export const ringWrapper = style({
  position: 'relative',
  width: '50px',
  height: '50px'
});

export const ring = style({
  borderRadius: '50%',
  height: '100%',
  width: '100%',
  background: backgroundVar
});

export const cutout = style({
  width: '50%',
  height: '50%',
  backgroundColor: 'white',
  position: 'absolute',
  top: '25%',
  left: '25%',
  borderRadius: '50%',
  pointerEvents: 'none'
});
