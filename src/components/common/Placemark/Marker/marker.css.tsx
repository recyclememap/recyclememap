import { style, createVar } from '@vanilla-extract/css';

export const backgroundVar = createVar();

export const ring = style({
  position: 'relative',
  width: '40px',
  height: '40px',
  border: '4px solid white',
  borderRadius: '50%',
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
    top: 'calc(100% + 3px)',
    left: 'calc(50% - 5px)',
    borderTop: '8px solid white',
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent'
  }
});
