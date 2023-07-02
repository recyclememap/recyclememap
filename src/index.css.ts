import { globalStyle } from '@vanilla-extract/css';

globalStyle('html, body', {
  margin: 0
});

globalStyle('button, input[type="submit"], input[type="reset"]', {
  all: 'unset'
});

// need to test in moz
globalStyle('input::-moz-focus-inner', {
  border: 0,
  padding: 0
});

globalStyle('input', {
  all: 'unset'
});
