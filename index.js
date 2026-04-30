const { h, watch, onUnmount } = window;

import {
  ModuleRegistry,
  ValidationModule,
  ColumnAutoSizeModule,
  CellStyleModule,
  QuickFilterModule,
  RowSelectionModule,
  TextEditorModule,
  ClientSideRowModelModule,
  themeQuartz,
  iconSetQuartzLight,
  createGrid
} from "ag-grid-community";
import {
  MultiFilterModule,
  CellSelectionModule,
  PivotModule,
  MasterDetailModule,
  SideBarModule,
  ColumnsToolPanelModule,
  ColumnMenuModule,
  StatusBarModule,
  ExcelExportModule,
  ClipboardModule,
} from "./ag-grid";

ModuleRegistry.registerModules([
  ValidationModule,
  ColumnAutoSizeModule,
  CellStyleModule,
  QuickFilterModule,
  RowSelectionModule,
  TextEditorModule,
  ClientSideRowModelModule,
  MultiFilterModule,
  CellSelectionModule,
  PivotModule,
  MasterDetailModule,
  SideBarModule,
  ColumnsToolPanelModule,
  ColumnMenuModule,
  StatusBarModule,
  ExcelExportModule,
  ClipboardModule,
]);

const Grid = (props) => {
  const { data, options, api, on, class: className, style = "height: 100%; width: 100%", dark } = props;
  let gridApi = null;
  let cleanupFn = null;

  const getDark = () =>
    dark !== undefined
      ? (typeof dark === 'function' ? dark() : dark)
      : document.documentElement.getAttribute('data-theme') === 'dark' ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;

  const getTheme = () => getDark() ? 'ag-theme-balham-dark' : 'ag-theme-balham';

  const initGrid = (container) => {
    if (cleanupFn) {
      cleanupFn();
      cleanupFn = null;
    }
    if (gridApi && !gridApi.isDestroyed()) {
      gridApi.destroy();
      if (api) api.current = null;
      gridApi = null;
    }

    if (!container) return;

    const initialData = typeof data === "function" ? data() : data;
    const initialOptions = typeof options === "function" ? options() : options;

    const commonEvents = [
      'onFilterChanged', 'onModelUpdated', 'onGridSizeChanged',
      'onFirstDataRendered', 'onRowValueChanged', 'onSelectionChanged',
      'onCellClicked', 'onCellDoubleClicked', 'onCellValueChanged',
      'onRowClicked', 'onSortChanged', 'onContextMenu',
      'onColumnResized', 'onColumnMoved', 'onRowDataUpdated',
      'onCellEditingStarted', 'onCellEditingStopped',
      'onPaginationChanged', 'onBodyScroll'
    ];

    const eventHandlers = {};
    commonEvents.forEach(eventName => {
      if (on?.[eventName]) {
        eventHandlers[eventName] = (params) => on[eventName](params);
      }
    });

    const gridOptions = {
      ...initialOptions,
      theme: getTheme(),
      rowData: initialData || [],
      onGridReady: (params) => {
        gridApi = params.api;
        if (api) api.current = gridApi;
        if (on?.onGridReady) on.onGridReady(params);

        if (initialOptions?.autoSizeColumns) {
          params.api.autoSizeAllColumns();
        }
      },
      ...eventHandlers
    };

    gridApi = createGrid(container, gridOptions);

    const stopData = watch(() => {
      if (!gridApi || gridApi.isDestroyed()) return;
      const newData = typeof data === "function" ? data() : data;
      if (Array.isArray(newData)) {
        const currentData = gridApi.getGridOption("rowData");
        if (newData !== currentData) {
          gridApi.setGridOption("rowData", newData);
        }
      }
    });

    const stopTheme = watch(() => {
      if (!gridApi || gridApi.isDestroyed()) return;
      getDark();
      const currentTheme = getTheme();
      if (currentTheme !== gridApi.getGridOption("theme")) {
        gridApi.setGridOption("theme", currentTheme);
      }
    });

    const stopOptions = watch(() => {
      if (!gridApi || gridApi.isDestroyed() || !options) return;
      const newOptions = typeof options === "function" ? options() : options;
      if (newOptions) {
        Object.entries(newOptions).forEach(([key, val]) => {
          try {
            gridApi.setGridOption(key, val);
          } catch (e) {}
        });
      }
    });

    cleanupFn = () => {
      stopData();
      stopTheme();
      stopOptions();
      if (gridApi && !gridApi.isDestroyed()) {
        gridApi.destroy();
        if (api) api.current = null;
        gridApi = null;
      }
    };

    onUnmount(() => {
      if (cleanupFn) {
        cleanupFn();
        cleanupFn = null;
      }
    });
  };

  return h("div", {
    class: className,
    style: style,
    ref: initGrid
  });
};

if (typeof window !== 'undefined') window.Grid = Grid;
export { Grid, createGrid, themeQuartz, iconSetQuartzLight, ModuleRegistry };