import { style, createVar } from '@vanilla-extract/css';

export const backgroundVar = createVar();

export const ringWrapper = style({
  position: 'relative',
  width: '40px',
  height: '40px'
});

export const ring = style({
  border: '4px solid white',
  borderRadius: '50%',
  height: '100%',
  width: '100%',
  background: backgroundVar,
  boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2);',

  ':before': {
    content: '',
    position: 'absolute',
    borderRadius: '50%',
    border: '6px solid white',
    left: 'calc(50% - 6px)',
    top: 'calc(50% - 6px)',
    backgroundColor: 'white'
  },

  ':after': {
    content: '',
    position: 'absolute',
    top: 'calc(100% - 2px)',
    left: 'calc(50% - 6px)',
    borderTop: '7px solid white',
    borderLeft: '6px solid transparent',
    borderRight: '6px solid transparent'
  }
});
