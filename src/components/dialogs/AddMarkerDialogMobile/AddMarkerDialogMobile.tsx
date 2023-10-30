import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Chip,
  DialogActions,
  DialogContentText,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  Typography
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { WasteTypes } from '@common/constants';
import { Icon } from '@components/common';
import { Flex, LoadingContainer } from '@components/containers';
import { useStore } from '@root/store';
import { MarkersLoaders, MapLoaders } from '@root/store/domains';
import { NewMarkerForm } from '@root/store/domains/Markers/types';
import { noop } from '@utils/helpers';
import { DialogContainer } from './styled';

interface AddMarkerDialogMobileProps {
  onClose: (isMobile?: boolean) => void;
}

// TODO: refactor to use one component with two states Mobile and Desktop
// Desktop version should be on the left of the screen
export const AddMarkerDialogMobile = observer(
  ({ onClose }: AddMarkerDialogMobileProps) => {
    const { t } = useTranslation();
    const { mapDomain, markersDomain, markersView, loader } = useStore();

    const {
      control,
      handleSubmit,
      formState: { errors, isDirty }
    } = useForm<NewMarkerForm>({ mode: 'onChange' });

    const addNewMarker = async ({ wasteTypes }: NewMarkerForm) => {
      await markersDomain
        .addNewMarker({ wasteTypes })
        .then(() => onClose())
        .catch(noop);
    };

    return (
      <Slide direction="up" in={true}>
        <DialogContainer sx={{ p: 2 }}>
          {markersView.isUnsupportedCoordinates ? (
            <>
              <Typography variant="h2">
                {t('map.invalidCoordinatesErrorMessage')}
              </Typography>
              <Typography align="center">
                {t('map.invalidCoordinatesErrorDetails')}
              </Typography>
            </>
          ) : (
            <LoadingContainer
              isLoading={loader.isLoading(MapLoaders.GetAddress)}
            >
              <form onSubmit={handleSubmit(addNewMarker)}>
                <Typography variant="h2">
                  {t('addMarkerDialog.title')}
                </Typography>
                <Flex>
                  {t('addMarkerDialog.addressLabel')}
                  {mapDomain.currentAddress}
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
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5
                            }}
                          >
                            {selected.slice(0, 3).map((value) => (
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
                            {selected.length > 3 && `+${selected.length - 3}`}
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
                <Typography variant="caption">
                  {t('addMarkerDialog.description')}
                </Typography>
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
                    onClick={() => onClose(true)}
                  >
                    {t('addMarkerDialog.cancelButton')}
                  </Button>
                </DialogActions>
              </form>
            </LoadingContainer>
          )}
        </DialogContainer>
      </Slide>
    );
  }
);
