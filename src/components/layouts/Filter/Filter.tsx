import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Fab, Slide, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WasteTypes } from '@common/constants';
import { sizes } from '@root/theme';
import { FilterChip } from './FiltterChip/FilterChip';
import { StyledFilter } from './styled';

export const Filter = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filters = (
    <StyledFilter>
      {Object.values(WasteTypes).map((name) => (
        <FilterChip key={name} iconName={name} />
      ))}
    </StyledFilter>
  );

  return (
    <>
      {isMobile ? (
        <>
          <Slide direction="right" in={isMobileFilterOpen}>
            {filters}
          </Slide>
          <Fab
            color="primary"
            size="medium"
            aria-label="filter"
            sx={{
              position: 'absolute',
              top: sizes[64].rem,
              right: sizes[16].rem,
              zIndex: 1
            }}
            title={t('filter.fabTitle')}
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          >
            <FilterAltOutlinedIcon />
          </Fab>
        </>
      ) : (
        filters
      )}
    </>
  );
};
