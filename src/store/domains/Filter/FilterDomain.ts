import axios from 'axios';
import { observable, makeObservable, action } from 'mobx';
import { WasteTypes } from '@common/constants';
import { flatIconsKeys } from '@components/common';
import { RootStore } from '@root/store';
import { loader, notify } from '@utils/decorators';
import { FilterLoaders } from './constants';

export class FilterDomain {
  private rootStore: RootStore;
  selectedFilter: Set<flatIconsKeys> = new Set(Object.values(WasteTypes));
  requestController: AbortController | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeObservable(this, {
      selectedFilter: observable,
      setSelectedFilter: action
    });
  }

  setSelectedFilter(selectedFilter: Set<flatIconsKeys>): void {
    this.selectedFilter = selectedFilter;
  }

  @notify({
    message: 'common.errorTitle',
    details: 'filter.applyError'
  })
  @loader(FilterLoaders.UpdateFilter)
  async updateFilter(wasteTypeFilter: flatIconsKeys): Promise<void> {
    const oldFilter = this.selectedFilter;
    let newFilter: Set<flatIconsKeys>;

    if (this.selectedFilter.size === Object.values(WasteTypes).length) {
      newFilter = new Set([wasteTypeFilter]);
    } else {
      newFilter = new Set(this.selectedFilter);
      this.selectedFilter.has(wasteTypeFilter)
        ? newFilter.delete(wasteTypeFilter)
        : newFilter.add(wasteTypeFilter);
    }

    this.setSelectedFilter(newFilter);

    try {
      if (this.requestController) {
        this.requestController.abort();
      }

      this.requestController = new AbortController();
      await this.rootStore.markersDomain.getMarkers(
        this.selectedFilter,
        this.requestController
      );
    } catch (e) {
      if (!axios.isCancel(e)) {
        this.setSelectedFilter(oldFilter);

        throw e;
      }
    }
  }
}
