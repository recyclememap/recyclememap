import EditIcon from '@mui/icons-material/Edit';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Dialog,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  Box,
  Chip,
  MenuItem,
  FormHelperText
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { WasteTypes } from '@common/constants';
import { Flex, Icon, LoadingModal } from '@root/components';
import { useStore } from '@root/store';
import { MarkersLoaders, MapLoaders } from '@root/store/domains';
import { NewMarkerForm } from '@root/store/domains/Markers/types';
import { sizes } from '@root/theme';
import { noop } from '@utils/helpers';

interface AddMarkerDialogProps {
  onClose: (isMobile?: boolean) => void;
}

// TODO: refactor to use one component with two states Mobile and Desktop
// Desktop version should be on the left of the screen
export const AddMarkerDialog = observer(({ onClose }: AddMarkerDialogProps) => {
  const { t } = useTranslation();
  const { markersView, markersDomain, mapDomain, loader } = useStore();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<NewMarkerForm>({ mode: 'onChange' });

  const editHandler = () => {
    markersView.setIsNewMarkerActive(true);

    onClose();
  };

  const addNewMarker = async ({ wasteTypes }: NewMarkerForm) => {
    await markersDomain
      .addNewMarker({ wasteTypes })
      .then(() => onClose())
      .catch(noop);
  };

  return (
    <Dialog open maxWidth="xs">
      <LoadingModal isLoading={loader.isLoading(MapLoaders.GetAddress)}>
        <form onSubmit={handleSubmit(addNewMarker)}>
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
            <DialogContentText sx={{ display: 'flex', mt: 1 }}>
              {t('addMarkerDialog.wasteTypesDescription')}
            </DialogContentText>
            <FormControl
              variant="standard"
              sx={{ display: 'flex', mb: 2 }}
              error={!!errors.wasteTypes}
            >
              <InputLabel id="waste-types-select">
                {t('addMarkerDialog.wasteTypesLabel')}
              </InputLabel>
              <Controller
                name="wasteTypes"
                control={control}
                defaultValue={[]}
                rules={{ required: t('addMarkerDialog.wasteTypesError') }}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="waste-types-select"
                    id="waste-types-select"
                    multiple
                    fullWidth
                    value={field.value}
                    onChange={field.onChange}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={t(`icons.${value}.title`)}
                            onDelete={(event) => {
                              event.stopPropagation();

                              const newValue = field.value.filter(
                                (fraction) => fraction !== value
                              );
                              field.onChange(newValue);
                            }}
                            onMouseDown={(event) => {
                              event.stopPropagation();
                            }}
                          />
                        ))}
                      </Box>
                    )}
                  >
                    {Object.values(WasteTypes).map((name) => (
                      <MenuItem key={name} value={name}>
                        <Flex sx={{ alignItems: 'center', gap: '8px' }}>
                          <Icon name={name} key={name} />
                          {t(`icons.${name}.title`)}
                        </Flex>
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.wasteTypes && (
                <FormHelperText>{errors.wasteTypes.message}</FormHelperText>
              )}
            </FormControl>
            <DialogContentText sx={{ mt: sizes[8].rem }}>
              {t('addMarkerDialog.description')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <LoadingButton
              disabled={!!errors.wasteTypes || !isDirty}
              loading={loader.isLoading(MarkersLoaders.AddNewMarker)}
              type="submit"
            >
              {t('addMarkerDialog.addButton')}
            </LoadingButton>
            <Button
              disabled={loader.isLoading(MarkersLoaders.AddNewMarker)}
              onClick={() => onClose()}
            >
              {t('addMarkerDialog.cancelButton')}
            </Button>
          </DialogActions>
        </form>
      </LoadingModal>
    </Dialog>
  );
});
