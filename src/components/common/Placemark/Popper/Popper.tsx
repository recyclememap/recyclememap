import { Typography } from '@mui/material';
import type { flatIconsKeys } from '@root/components';
import { Flex, Icon } from '@root/components';

type PopperProps = {
  icons: flatIconsKeys[];
  address: string;
};

const POPPER_ICONS_LENGTH = 4;

export const Popper = ({ address, icons }: PopperProps) => {
  return (
    <>
      <Typography variant="h5" color="text.secondary">
        {address}
      </Typography>
      <Flex
        sx={{
          paddingTop: '16px',
          minWidth: '150px',
          gap: '10px',
          ...(icons.length > POPPER_ICONS_LENGTH && {
            maxWidth: '270px',
            flexWrap: 'wrap'
          })
        }}
      >
        {icons.map((name) => {
          return <Icon name={name} key={name} />;
        })}
      </Flex>
    </>
  );
};
