import { Box } from '@mui/material';
import React from 'react';
import type { flatIconsKeys } from '@components/Icon/FlatIcons';
import { Popper } from '@components/Popper/Popper';
import { Marker } from './Marker/Marker';

type PlacemarkProps = {
  icons: flatIconsKeys[];
  street: string;
};

export const Placemark = ({ icons, street }: PlacemarkProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <Box onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
      <Marker icons={icons as flatIconsKeys[]} />
      <Popper open={open} anchorEl={anchorEl} icons={icons} street={street} />
    </Box>
  );
};
