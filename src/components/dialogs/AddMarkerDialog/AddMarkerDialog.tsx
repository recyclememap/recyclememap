import EditIcon from '@mui/icons-material/Edit';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Dialog,
  DialogTitle
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { Flex, LoadingModal } from '@components/containers';
import { useStore } from '@root/store';
import { MapLoaders } from '@root/store/domains';
import { sizes } from '@root/theme';
import { noop } from '@utils/helpers';

interface AddMarkerDialogProps {
  onClose: (isMobile?: boolean) => void;
}

export const AddMarkerDialog = observer(({ onClose }: AddMarkerDialogProps) => {
  const { t } = useTranslation();
  const { markerView, mapDomain, loader } = useStore();

  const editHandler = () => {
    markerView.setIsNewMarkerActive(true);

    onClose();
  };

  const addNewMarker = async () => {
    await mapDomain
      .addNewMarker()
      .then(() => onClose())
      .catch(noop);
  };

  return (
    <Dialog open maxWidth="xs">
      <LoadingModal isLoading={loader.isLoading(MapLoaders.GetAddress)}>
        <DialogTitle textAlign="center">
          {t('addMarkerDialog.title')}
        </DialogTitle>
        <DialogContent sx={{ pb: 0 }}>
          <Flex sx={{ alignItems: 'center', gap: sizes[8].rem }}>
            {t('addMarkerDialog.addressLabel')}
            {mapDomain.currentAddress}
            <IconButton
              onClick={editHandler}
              size="small"
              title={t('addMarkerDialog.editButton')}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
          </Flex>
          <DialogContentText sx={{ mt: sizes[8].rem }}>
            {t('addMarkerDialog.description')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            loading={loader.isLoading(MapLoaders.AddNewMarker)}
            onClick={addNewMarker}
          >
            {t('addMarkerDialog.addButton')}
          </LoadingButton>
          <Button
            disabled={loader.isLoading(MapLoaders.AddNewMarker)}
            onClick={() => onClose()}
          >
            {t('addMarkerDialog.cancelButton')}
          </Button>
        </DialogActions>
      </LoadingModal>
    </Dialog>
  );
});
