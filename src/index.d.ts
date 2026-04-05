declare module 'sigpro-grid' {
  import { GridApi, GridOptions, ICellRendererParams, IDetailCellRendererParams, ColDef } from 'ag-grid-community';

  export type RowData = Record<string, any>;

  export interface GridEvents {
    onFilterChanged?: (params: any) => void;
    onModelUpdated?: (params: any) => void;
    onGridSizeChanged?: (params: any) => void;
    onFirstDataRendered?: (params: any) => void;
    onRowValueChanged?: (params: any) => void;
    onSelectionChanged?: (params: any) => void;
    onCellClicked?: (params: any) => void;
    onCellDoubleClicked?: (params: any) => void;
    onCellValueChanged?: (params: any) => void;
    onRowClicked?: (params: any) => void;
    onSortChanged?: (params: any) => void;
    onContextMenu?: (params: any) => void;
    onColumnResized?: (params: any) => void;
    onColumnMoved?: (params: any) => void;
    onRowDataUpdated?: (params: any) => void;
    onCellEditingStarted?: (params: any) => void;
    onCellEditingStopped?: (params: any) => void;
    onPaginationChanged?: (params: any) => void;
    onBodyScroll?: (params: any) => void;
    onGridReady?: (params: { api: GridApi; columnApi: any }) => void;
  }

  export interface GridProps extends Partial<GridEvents> {
    data?: RowData[] | (() => RowData[]);
    options?: GridOptions | (() => GridOptions);
    api?: { current: GridApi | null };
    class?: string;
    style?: string;
    lang?: string;
  }

  export const Grid: (props: GridProps) => HTMLElement;
  export function createGridApiRef(): { current: GridApi | null };

  export type { 
    GridApi, 
    GridOptions, 
    ICellRendererParams, 
    IDetailCellRendererParams,
    ColDef
  } from 'ag-grid-community';
}