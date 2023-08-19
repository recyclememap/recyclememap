import battery from './assets/battery.svg';
import plastic from './assets/bottle.svg';
import carton from './assets/box.svg';
import mixed from './assets/garbage.svg';
import glass from './assets/glass.svg';
import packing from './assets/milk-packet.svg';
import paper from './assets/paper.svg';
import clothes from './assets/t-shirt.svg';

const iconsPalette = {
  mixed: '#F46271',
  packing: '#FFA866',
  plastic: '#FFCE78',
  batteries: '#A3D667',
  carton: '#7AC5C4',
  clothes: '#408DC5',
  paper: '#8589E0',
  glass: '#CD4EAB'
};

export const flatIcons = {
  mixed: {
    src: mixed,
    title: 'mixed.title',
    color: iconsPalette.mixed
  },
  packing: {
    src: packing,
    title: 'packing.title',
    color: iconsPalette.packing
  },
  plastic: {
    src: plastic,
    title: 'plastic.title',
    color: iconsPalette.plastic
  },
  batteries: {
    src: battery,
    title: 'batteries.title',
    color: iconsPalette.batteries
  },
  carton: {
    src: carton,
    title: 'carton.title',
    color: iconsPalette.carton
  },
  clothes: {
    src: clothes,
    title: 'clothes.title',
    color: iconsPalette.clothes
  },
  paper: {
    src: paper,
    title: 'paper.title',
    color: iconsPalette.paper
  },
  glass: {
    src: glass,
    title: 'glass.title',
    color: iconsPalette.glass
  }
};

export type flatIconsKeys = keyof typeof flatIcons;

export const IconNames: flatIconsKeys[] = Object.keys(
  flatIcons
) as flatIconsKeys[];
