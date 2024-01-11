import { Typography } from '@mui/material';
import type { flatIconsKeys } from '@root/components';
import { Flex, Icon } from '@root/components';
import { sizes } from '@root/theme';

type PopperProps = {
  icons: flatIconsKeys[];
  address: string;
};

const POPPER_ICONS_LENGTH = 4;

export const Popper = ({ address, icons }: PopperProps) => {
  return (
    <Flex
      sx={{
        maxWidth: '260px',
        alignItems: 'center',
        flexDirection: 'column',
        gap: sizes[8].rem
      }}
    >
      <Typography variant="h5">{address}</Typography>
      <Flex
        sx={{
          justifyContent: 'center',
          gap: sizes[8].rem
        }}
      >
        {icons.map((name) => {
          return <Icon name={name} key={name} />;
        })}
      </Flex>
    </Flex>
  );
};
