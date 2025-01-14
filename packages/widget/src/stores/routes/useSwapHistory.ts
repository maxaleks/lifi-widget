import shallow from 'zustand/shallow';
import { hasEnumFlag } from '../../utils';
import type { RouteExecution } from './types';
import { RouteExecutionStatus } from './types';
import { useRouteExecutionStore } from './useRouteExecutionStore';

export const useSwapHistory = (address?: string) => {
  return useRouteExecutionStore(
    (state) =>
      Object.values(state.routes)
        .filter(
          (item) =>
            item?.route.fromAddress === address &&
            hasEnumFlag(item!.status, RouteExecutionStatus.Done),
        )
        .sort(
          (a, b) =>
            (b?.route.steps[0].execution?.process[0].startedAt ?? 0) -
            (a?.route.steps[0].execution?.process[0].startedAt ?? 0),
        ) as RouteExecution[],
    shallow,
  );
};
