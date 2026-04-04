/** GRID */
export const Grid = (props, lang) => {
  const { data, options, api, on, class: className, style = "height: 100%; width: 100%;" } = props;
  let gridApi = null;

  const isDark = () => {
    return document.documentElement.getAttribute('data-theme') === 'dark' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const getTheme = (dark) => {
    return dark ? 'ag-theme-alpine-dark' : 'ag-theme-alpine';
  };

  return $html("div", {
    style,
    class: className,
    ref: async (container) => {
      try {
        const { createGrid } = await import("./grid.js");

        const initialData = typeof data === "function" ? data() : data;
        const initialOptions = typeof options === "function" ? options() : options;

        // Eventos comunes de AG Grid
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

        // Watch para cambios en los datos
        const stopData = $watch(() => {
          const newData = typeof data === "function" ? data() : data;
          if (gridApi && !gridApi.isDestroyed() && Array.isArray(newData)) {
            const currentData = gridApi.getGridOption("rowData");
            if (newData !== currentData) {
              gridApi.setGridOption("rowData", newData);
            }
          }
        });

        // Watch para cambios de tema
        const stopTheme = $watch(() => {
          if (gridApi && !gridApi.isDestroyed()) {
            const dark = isDark();
            const newTheme = getTheme(dark);
            const currentTheme = gridApi.getGridOption("theme");
            if (newTheme !== currentTheme) {
              gridApi.setGridOption("theme", newTheme);
            }
          }
        });

        // ⚠️ IMPORTANTE: Solo actualizar opciones seguras
        // No actualizar columnDefs, rowData, o theme dinámicamente
        const safeOptions = ['pagination', 'paginationPageSize', 'suppressRowClickSelection',
          'rowSelection', 'enableCellTextSelection', 'ensureDomOrder',
          'stopEditingWhenCellsLoseFocus', 'enterMovesDown', 'enterMovesDownAfterEdit'];

        const stopOptions = $watch(() => {
          if (gridApi && !gridApi.isDestroyed() && options) {
            const newOptions = typeof options === "function" ? options() : options;
            safeOptions.forEach(key => {
              if (newOptions[key] !== undefined) {
                try {
                  gridApi.setGridOption(key, newOptions[key]);
                } catch (e) {
                  console.warn(`Could not set grid option ${key}:`, e);
                }
              }
            });
          }
        });

        // Limpieza
        container._cleanups.add(stopData);
        container._cleanups.add(stopTheme);
        container._cleanups.add(stopOptions);
        container._cleanups.add(() => {
          if (gridApi && !gridApi.isDestroyed()) {
            gridApi.destroy();
            if (api) api.current = null;
            gridApi = null;
          }
        });

      } catch (error) {
        console.error("Failed to initialize AG Grid:", error);
        container.innerHTML = `<div class="text-error p-4">Error loading grid: ${error.message}</div>`;
      }
    }
  });
};