import { LoadingButton } from '@mui/lab';
import { Button, Slide, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { Flex, LoadingContainer } from '@components/containers';
import { useStore } from '@root/store';
import { MapLoaders } from '@root/store/domains';
import { noop } from '@utils/helpers';
import { DialogContainer } from './styled';

interface AddMarkerDialogMobileProps {
  onClose: (isMobile?: boolean) => void;
}

export const AddMarkerDialogMobile = observer(
  ({ onClose }: AddMarkerDialogMobileProps) => {
    const { t } = useTranslation();
    const { mapDomain, loader } = useStore();

    const addNewMarker = async () => {
      await mapDomain
        .addNewMarker()
        .then(() => onClose(true))
        .catch(noop);
    };

    return (
      <Slide direction="up" in={true}>
        <DialogContainer>
          <LoadingContainer isLoading={loader.isLoading(MapLoaders.GetAddress)}>
            <Typography variant="h2">{t('addMarkerDialog.title')}</Typography>
            <Flex>
              {t('addMarkerDialog.addressLabel')}
              {mapDomain.currentAddress}
            </Flex>
            <Typography variant="caption">
              {t('addMarkerDialog.description')}
            </Typography>
            <Flex>
              <LoadingButton
                loading={loader.isLoading(MapLoaders.AddNewMarker)}
                onClick={addNewMarker}
              >
                {t('addMarkerDialog.addButton')}
              </LoadingButton>
              <Button
                disabled={loader.isLoading(MapLoaders.AddNewMarker)}
                onClick={() => onClose(true)}
              >
                {t('addMarkerDialog.cancelButton')}
              </Button>
            </Flex>
          </LoadingContainer>
        </DialogContainer>
      </Slide>
    );
  }
);
