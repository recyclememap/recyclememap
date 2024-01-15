import { Chip as MUIChip, Theme, chipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Icon } from '@components/common';

interface IFilterIcon {
  isSelected: boolean;
  theme?: Theme;
}

export const Chip = styled(MUIChip)(({ theme }) => ({
  boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2);',
  backgroundColor: 'white',

  ':hover': {
    [`&.${chipClasses.filled}`]: {
      backgroundColor: theme.palette.grey[50]
    },
    boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.3);'
  },

  [`&.${chipClasses.filled}`]: {
    backgroundColor: 'white'
  }
}));

export const FilterIcon = styled(Icon)(
  ({ theme, isSelected }: IFilterIcon) => ({
    ...(isSelected ? {} : { backgroundColor: theme?.palette.grey[300] })
  })
);
