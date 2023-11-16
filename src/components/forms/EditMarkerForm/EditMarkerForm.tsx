import EditIcon from '@mui/icons-material/Edit';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  Box,
  Chip,
  MenuItem,
  FormHelperText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { WasteTypes } from '@common/constants';
import { Flex, Icon } from '@root/components';
import { useStore } from '@root/store';
import { MarkersLoaders } from '@root/store/domains';
import { MarkerFormFields } from '@root/store/domains/Markers/types';
import { sizes } from '@root/theme';
import { noop } from '@utils/helpers';

interface EditMarkerFormProps {
  onClose: () => void;
}

const SELECTED_WASTE_TYPES_LIMIT = 3;

export const EditMarkerForm = observer(({ onClose }: EditMarkerFormProps) => {
  const { t } = useTranslation();
  const { markersView, sidebarView, markersDomain, loader } = useStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<MarkerFormFields>({
    defaultValues: { wasteTypes: markersDomain.suggestionMarker?.wasteTypes },
    mode: 'onChange'
  });

  const editHandler = () => {
    if (isMobile) {
      markersView.setIsNewMobileMarkerActive(true);

      return;
    }

    sidebarView.setIsOpen(false);
    markersView.setIsNewMarkerActive(true);
  };

  const updateMarker = async ({ wasteTypes }: MarkerFormFields) => {
    markersDomain.updateSuggestion({ wasteTypes });

    await markersDomain
      .updateMarker()
      .then(() => onClose())
      .catch(noop);
  };

  const isPositionSame = useMemo(() => {
    return markersDomain.activeMarker!.position.every(
      (value, idx) => value === markersDomain.suggestionMarker?.position[idx]
    );
  }, [markersDomain.activeMarker, markersDomain.suggestionMarker]);

  return (
    <Box sx={{ width: '100%' }}>
      <form onSubmit={handleSubmit(updateMarker)}>
        <DialogTitle textAlign="center">
          {t('editMarkerDialog.title')}
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <Flex sx={{ alignItems: 'center', gap: sizes[8].rem }}>
            {t('common.addressLabel')}
            {markersDomain.suggestionMarker?.address}
            <IconButton
              onClick={editHandler}
              size="small"
              title={t('common.editButton')}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
          </Flex>
          <DialogContentText sx={{ display: 'flex', mt: 1 }}>
            {t('common.wasteTypesDescription')}
          </DialogContentText>
          <FormControl
            variant="standard"
            sx={{ display: 'flex', mb: 2 }}
            error={!!errors.wasteTypes}
          >
            <InputLabel id="waste-types-select">
              {t('common.wasteTypesLabel')}
            </InputLabel>
            <Controller
              name="wasteTypes"
              control={control}
              defaultValue={[]}
              rules={{ required: t('common.wasteTypesError') }}
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
                      {selected
                        .slice(0, SELECTED_WASTE_TYPES_LIMIT)
                        .map((value) => (
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
                      {selected.length > SELECTED_WASTE_TYPES_LIMIT &&
                        `+${selected.length - SELECTED_WASTE_TYPES_LIMIT}`}
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
            {t('editMarkerDialog.description')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            disabled={!!errors.wasteTypes || (!isDirty && isPositionSame)}
            loading={loader.isLoading(MarkersLoaders.UpdateMarker)}
            type="submit"
          >
            {t('editMarkerDialog.updateButton')}
          </LoadingButton>
          <Button
            disabled={loader.isLoading(MarkersLoaders.UpdateMarker)}
            onClick={() => onClose()}
          >
            {t('common.cancelButton')}
          </Button>
        </DialogActions>
      </form>
    </Box>
  );
});
