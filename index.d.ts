declare module 'sigpro-grid' {
  import type {
    GridApi,
    GridOptions,
    GridReadyEvent,
    FirstDataRenderedEvent,
    RowDataUpdatedEvent,
    SelectionChangedEvent,
    CellClickedEvent,
    CellDoubleClickedEvent,
    CellValueChangedEvent,
    CellEditingStartedEvent,
    CellEditingStoppedEvent,
    RowClickedEvent,
    RowValueChangedEvent,
    SortChangedEvent,
    FilterChangedEvent,
    ModelUpdatedEvent,
    GridSizeChangedEvent,
    ColumnResizedEvent,
    ColumnMovedEvent,
    PaginationChangedEvent,
    BodyScrollEvent,
    ContextMenuEvent,
    ColDef,
    ColGroupDef,
    Theme,
  } from 'ag-grid-community';

  export { 
    GridApi, 
    GridOptions, 
    ColDef, 
    ColGroupDef,
    createGrid,
    themeQuartz,
    iconSetQuartzLight,
    ModuleRegistry,
  };

  export interface GridEvents {
    onGridReady?: (params: GridReadyEvent) => void;
    onFirstDataRendered?: (params: FirstDataRenderedEvent) => void;
    onRowDataUpdated?: (params: RowDataUpdatedEvent) => void;
    onSelectionChanged?: (params: SelectionChangedEvent) => void;
    onCellClicked?: (params: CellClickedEvent) => void;
    onCellDoubleClicked?: (params: CellDoubleClickedEvent) => void;
    onCellValueChanged?: (params: CellValueChangedEvent) => void;
    onCellEditingStarted?: (params: CellEditingStartedEvent) => void;
    onCellEditingStopped?: (params: CellEditingStoppedEvent) => void;
    onRowClicked?: (params: RowClickedEvent) => void;
    onRowValueChanged?: (params: RowValueChangedEvent) => void;
    onSortChanged?: (params: SortChangedEvent) => void;
    onFilterChanged?: (params: FilterChangedEvent) => void;
    onModelUpdated?: (params: ModelUpdatedEvent) => void;
    onGridSizeChanged?: (params: GridSizeChangedEvent) => void;
    onColumnResized?: (params: ColumnResizedEvent) => void;
    onColumnMoved?: (params: ColumnMovedEvent) => void;
    onPaginationChanged?: (params: PaginationChangedEvent) => void;
    onBodyScroll?: (params: BodyScrollEvent) => void;
    onContextMenu?: (params: ContextMenuEvent) => void;
  }

  export interface GridProps<TData = any> {
    data?: TData[] | (() => TData[]);
    options?: GridOptions<TData> | (() => GridOptions<TData>);
    api?: { current: GridApi<TData> | null };
    on?: GridEvents;
    class?: string;
    style?: string;
    dark?: boolean | (() => boolean);
  }

  export function Grid<TData = any>(props: GridProps<TData>): HTMLElement;
}