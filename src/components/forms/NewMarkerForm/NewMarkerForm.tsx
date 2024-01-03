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
  useMediaQuery,
  useTheme
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { WasteTypes } from '@common/constants';
import { Flex, Icon } from '@root/components';
import { useStore } from '@root/store';
import { MarkersLoaders } from '@root/store/domains';
import { MarkerFormFields } from '@root/store/domains/Markers/types';
import { sizes } from '@root/theme';
import { noop } from '@utils/helpers';

interface NewMarkerFormProps {
  onClose: () => void;
}

const SELECTED_WASTE_TYPES_LIMIT = 3;

export const NewMarkerForm = observer(({ onClose }: NewMarkerFormProps) => {
  const { t } = useTranslation();
  const { markersView, markersDomain, sidebarView, loader } = useStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<MarkerFormFields>({
    defaultValues: { wasteTypes: markersDomain.suggestionMarker?.wasteTypes },
    mode: 'onChange'
  });

  const editHandler = () => {
    sidebarView.setIsOpen(false);
    markersView.setIsNewMarkerActive(true);
  };

  const addNewMarker = async () => {
    await markersDomain
      .addNewMarker()
      .then(() => onClose())
      .catch(noop);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <form onSubmit={handleSubmit(addNewMarker)}>
        <DialogTitle textAlign="center">
          {t('addMarkerDialog.title')}
        </DialogTitle>
        <DialogContent sx={{ pb: 0, px: sizes[4].rem }}>
          <Flex sx={{ alignItems: 'center', gap: sizes[8].rem }}>
            {t('common.addressLabel')}
            {markersDomain.suggestionMarker?.address}
            {!isMobile && (
              <IconButton
                onClick={editHandler}
                size="small"
                title={t('common.editButton')}
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
            )}
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
                  onChange={(event) => {
                    markersDomain.updateSuggestion({
                      wasteTypes: event.target.value as WasteTypes[]
                    });

                    field.onChange(event);
                  }}
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
                              markersDomain.updateSuggestion({
                                wasteTypes: newValue as WasteTypes[]
                              });
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
            {t('addMarkerDialog.description')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            disabled={
              !!errors.wasteTypes || !markersDomain.suggestionMarker?.wasteTypes
            }
            loading={loader.isLoading(MarkersLoaders.AddNewMarker)}
            type="submit"
          >
            {t('addMarkerDialog.addButton')}
          </LoadingButton>
          <Button
            disabled={loader.isLoading(MarkersLoaders.AddNewMarker)}
            onClick={() => onClose()}
          >
            {t('common.cancelButton')}
          </Button>
        </DialogActions>
      </form>
    </Box>
  );
});
