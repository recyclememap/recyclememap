import battery from './assets/battery.svg';
import plastic from './assets/bottle.svg';
import carton from './assets/box.svg';
import mixed from './assets/garbage.svg';
import glass from './assets/glass.svg';
import packing from './assets/milk-packet.svg';
import paper from './assets/paper.svg';
import clothes from './assets/t-shirt.svg';

export const flatIcons = {
  paper: {
    src: paper,
    title: 'paper.title',
    color: '#3F51B5'
  },
  carton: {
    src: carton,
    title: 'carton.title',
    color: '#4CAF50'
  },
  glass: {
    src: glass,
    title: 'glass.title',
    color: '#673AB7'
  },
  plastic: {
    src: plastic,
    title: 'plastic.title',
    color: '#FFC107'
  },
  packing: {
    src: packing,
    title: 'packing.title',
    color: '#FF5722'
  },
  clothes: {
    src: clothes,
    title: 'clothes.title',
    color: '#03A9F4'
  },
  batteries: {
    src: battery,
    title: 'batteries.title',
    color: '#CDDC39'
  },
  mixed: {
    src: mixed,
    title: 'mixed.title',
    color: '#E91E63'
  }
};

export type flatIconsKeys = keyof typeof flatIcons;
