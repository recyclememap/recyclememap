import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { IconSize, flatIconsKeys } from '@components/common';
import { useStore } from '@root/store';
import { Chip, FilterIcon } from './styled';

interface IFilterChip {
  iconName: flatIconsKeys;
}

export const FilterChip = observer(({ iconName }: IFilterChip) => {
  const { t } = useTranslation();
  const { filterDomain } = useStore();

  return (
    <Chip
      label={t(`icons.${iconName}.title`)}
      icon={
        <FilterIcon
          name={iconName}
          key={iconName}
          sizeName={IconSize.xs}
          isSelected={filterDomain.selectedFilter.has(iconName)}
        />
      }
      onClick={() => filterDomain.updateFilter(iconName)}
    />
  );
});
