// import { Suggestions } from '@components/layouts';
import { Button, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { MarkerState } from '@common/constants';
import { Icon } from '@components/common';
import { Flex } from '@components/containers';
import { useStore } from '@root/store';
import { sizes } from '@root/theme';

export const ActiveMarker = observer(() => {
  const { markersDomain, markersView } = useStore();
  const { activeMarker } = markersDomain;

  const { t } = useTranslation();

  const onEditClick = () => {
    markersDomain.setSuggestionMarker(activeMarker);
    markersView.setState(MarkerState.Edit);
  };

  return (
    activeMarker && (
      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: sizes[16].rem,
          width: '100%'
        }}
      >
        <Typography variant="h2" sx={{ p: 0 }}>
          {t('common.addressLabel')}
          {activeMarker.address}
        </Typography>
        <Flex sx={{ flexDirection: 'column', gap: sizes[4].rem }}>
          {t('activeMarker.wasteTypesLabel')}
          <Flex sx={{ gap: sizes[8].rem }}>
            {activeMarker.wasteTypes.map((name) => (
              <Icon name={name} key={name} />
            ))}
          </Flex>
        </Flex>
        <Typography>
          {t('activeMarker.dateLabel')}
          {new Date(activeMarker.date).toLocaleDateString()}
        </Typography>
        <Button sx={{ alignSelf: 'flex-end' }} onClick={onEditClick}>
          {t('common.editButton')}
        </Button>
      </Flex>
    )
  );
});
