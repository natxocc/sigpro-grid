import { Tag, Watch, onUnmount } from "../sigpro.js";
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
} from "../ag-grid";

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

export const Grid = (props) => {
  const { data, options, api, on, class: className, style = "height: 100%; width: 100%;" } = props;
  let gridApi = null;

  const isDark = () => {
    return document.documentElement.getAttribute('data-theme') === 'dark' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const getTheme = (dark) => {
    return dark ? 'ag-theme-alpine-dark' : 'ag-theme-alpine';
  };

  const initGrid = (container) => {
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
      theme: getTheme(isDark()),
      rowData: initialData || [],
      onGridReady: (params) => {
        gridApi = params.api;
        if (api) api.current = gridApi;
        if (on?.onGridReady) on.onGridReady(params);

        if (initialOptions?.autoSizeColumns) {
          setTimeout(() => {
            if (gridApi && !gridApi.isDestroyed()) {
              const allColumns = gridApi.getColumns();
              if (allColumns?.length) {
                gridApi.autoSizeColumns(allColumns);
              }
            }
          }, 100);
        }
      },
      ...eventHandlers
    };

    gridApi = createGrid(container, gridOptions);

    const stopData = Watch(data, () => {
      if (!gridApi || gridApi.isDestroyed()) return;
      const newData = typeof data === "function" ? data() : data;
      if (Array.isArray(newData)) {
        const currentData = gridApi.getGridOption("rowData");
        if (newData !== currentData) {
          gridApi.setGridOption("rowData", newData);
        }
      }
    }, true);

    const stopTheme = Watch(isDark, () => {
      if (gridApi && !gridApi.isDestroyed()) {
        const dark = isDark();
        const newTheme = getTheme(dark);
        const currentTheme = gridApi.getGridOption("theme");
        if (newTheme !== currentTheme) {
          gridApi.setGridOption("theme", newTheme);
        }
      }
    }, true);

    const safeOptions = [
      'pagination', 'paginationPageSize', 'suppressRowClickSelection',
      'rowSelection', 'enableCellTextSelection', 'ensureDomOrder',
      'stopEditingWhenCellsLoseFocus', 'enterMovesDown', 'enterMovesDownAfterEdit'
    ];

    const stopOptions = Watch(options, () => {
      if (!gridApi || gridApi.isDestroyed() || !options) return;
      const newOptions = typeof options === "function" ? options() : options;
      safeOptions.forEach(key => {
        if (newOptions[key] !== undefined) {
          try {
            gridApi.setGridOption(key, newOptions[key]);
          } catch (e) {}
        }
      });
    }, true);

    onUnmount(() => {
      stopData();
      stopTheme();
      stopOptions();
      if (gridApi && !gridApi.isDestroyed()) {
        gridApi.destroy();
        if (api) api.current = null;
        gridApi = null;
      }
    });
  };

  return Tag("div", {
    class: className,
    style: style,
    ref: initGrid
  });
};

export { createGrid, themeQuartz, iconSetQuartzLight, ModuleRegistry };