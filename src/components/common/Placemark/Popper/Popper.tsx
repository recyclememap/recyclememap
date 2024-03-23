import { Typography } from '@mui/material';
import type { flatIconsKeys } from '@root/components';
import { Flex, Icon } from '@root/components';
import { sizes } from '@root/theme';

type PopperProps = {
  icons: flatIconsKeys[];
  address: string;
};

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
      <Typography
        variant="h5"
        sx={{
          margin: 0,
          fontWeight: 500,
          fontSize: sizes[16].rem
        }}
      >
        {address}
      </Typography>
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
