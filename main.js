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
  createGrid // La exportamos por si la necesitas fuera
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

// ✅ Registro de módulos automático al importar este archivo
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

// ✅ Exportamos lo básico para que el bundle sea útil
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