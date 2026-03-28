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
} from "ag-grid-enterprise";

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

export { 
  createGrid, 
  themeQuartz, 
  iconSetQuartzLight,
  ModuleRegistry 
};

/**
 * Tip: Si en el futuro quieres añadir un tema personalizado 
 * por defecto, podrías exportar una configuración aquí.
 */