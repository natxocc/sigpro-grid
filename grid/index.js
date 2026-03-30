/** GRID */
export const Grid = (props, lang) => {
    const { data, options, api, on, class: className } = props;
    let gridApi = null;

    return $html("div", {
        style: "height: 100%; width: 100%;",
        class: className,
        ref: async (container) => {
            const { createGrid } = await import("./grid/grid.js");

            const initialData = typeof data === "function" ? data() : data;
            const initialOptions = typeof options === "function" ? options() : options;

            const gridOptions = {
                ...initialOptions,
                theme: getTheme(isDark()),
                rowData: initialData || [],
                onGridReady: (params) => {
                    gridApi = params.api;
                    if (api) api.current = gridApi;
                    if (on?.onGridReady) on.onGridReady(params);
                },
                onFilterChanged: (e) => on?.onFilterChanged?.(e),
                onModelUpdated: (e) => on?.onModelUpdated?.(e),
                onGridSizeChanged: (e) => on?.onGridSizeChanged?.(e),
                onFirstDataRendered: (e) => on?.onFirstDataRendered?.(e),
                onRowValueChanged: (e) => on?.onRowValueChanged?.(e),
                onSelectionChanged: (e) => on?.onSelectionChanged?.(e),
                onCellClicked: (e) => on?.onCellClicked?.(e),
                onCellDoubleClicked: (e) => on?.onCellDoubleClicked?.(e),
                onCellValueChanged: (e) => on?.onCellValueChanged?.(e),
                onRowClicked: (e) => on?.onRowClicked?.(e),
                onSortChanged: (e) => on?.onSortChanged?.(e),
                onContextMenu: (e) => on?.onContextMenu?.(e),
                onColumnResized: (e) => on?.onColumnResized?.(e),
                onColumnMoved: (e) => on?.onColumnMoved?.(e),
                onRowDataUpdated: (e) => on?.onRowDataUpdated?.(e)
            };

            gridApi = createGrid(container, gridOptions);

            const stopData = $watch(() => {
                const rowData = typeof data === "function" ? data() : data;
                if (gridApi && Array.isArray(rowData)) {
                    gridApi.setGridOption("rowData", rowData);
                }
            });

            const stopTheme = $watch(() => {
                const dark = isDark();
                if (gridApi) gridApi.setGridOption("theme", getTheme(dark));
            });

            container._cleanups.add(stopData);
            container._cleanups.add(stopTheme);
            container._cleanups.add(() => {
                if (gridApi) {
                    gridApi.destroy();
                    if (api) api.current = null;
                    gridApi = null;
                }
            });
        }
    });
};