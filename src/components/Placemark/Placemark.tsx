import { Box } from '@mui/material';
import { useState, MouseEvent } from 'react';
import type { flatIconsKeys } from '@components/Icon/FlatIcons';
import { Popper } from '@components/Popper/Popper';
import { Marker } from './Marker/Marker';

type PlacemarkProps = {
  icons: flatIconsKeys[];
  street: string;
};

export const Placemark = ({ icons, street }: PlacemarkProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
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
