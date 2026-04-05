# SigPro Grid

A lightweight, reactive wrapper for AG Grid (Community & Enterprise) built for SigProUI framework.

## Features

- 🚀 **Lightweight wrapper** - AG Grid bundled inside
- ⚡ **Reactive** - Automatically updates when data changes
- 🎨 **Theme aware** - Automatically switches between light/dark themes
- 📦 **Enterprise ready** - Full AG Grid Enterprise modules included
- 🔧 **TypeScript support** - Full type definitions included
- 🧹 **Auto cleanup** - Proper resource disposal

## Requirements

- **SigPro** framework (peer dependency) or use with **SigProUI** (includes SigPro)
- [SigPro](https://natxocc.github.io/sigpro/#/)
- [SigProUI](https://natxocc.github.io/sigpro-ui/#/)
- Modern browser with ES module support

## Installation

```bash
npm install sigpro-grid
```

**No additional dependencies needed** - AG Grid is already bundled!

## Quick Start

```javascript
import { Grid } from 'sigpro-grid';

// Create API reference
const gridApi = { current: null };

// Render grid
Grid({
  api: gridApi,
  data: [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ],
  options: {
    columnDefs: [
      { field: 'id', headerName: 'ID', width: 100 },
      { field: 'name', headerName: 'Name', flex: 1 },
      { field: 'email', headerName: 'Email', flex: 1 }
    ],
    pagination: true,
    paginationPageSize: 20,
    rowSelection: 'multiple'
  },
  on: {
    onGridReady: (params) => {
      console.log('Grid ready', params.api);
    },
    onSelectionChanged: (params) => {
      const selected = params.api.getSelectedRows();
      console.log('Selected rows:', selected);
    }
  }
});

// Export data
const exportToExcel = () => {
  gridApi.current?.exportDataAsExcel({
    fileName: 'data.xlsx'
  });
};
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Array \| () => Array` | `[]` | Grid data (reactive if function) |
| `options` | `Object \| () => Object` | `{}` | AG Grid options (reactive if function) |
| `api` | `{ current: GridApi \| null }` | - | Mutable reference to grid API |
| `on` | `Object` | - | Event handlers |
| `class` | `string` | - | Additional CSS classes |
| `style` | `string` | `"height: 100%; width: 100%;"` | Inline styles |

### Events

| Event | Description |
|-------|-------------|
| `onGridReady` | Grid is ready |
| `onSelectionChanged` | Selection changed |
| `onCellClicked` | Cell clicked |
| `onCellDoubleClicked` | Cell double-clicked |
| `onCellValueChanged` | Cell value changed |
| `onSortChanged` | Sorting changed |
| `onFilterChanged` | Filter changed |
| `onRowClicked` | Row clicked |
| `onColumnResized` | Column resized |
| `onColumnMoved` | Column moved |
| `onPaginationChanged` | Pagination changed |
| `onBodyScroll` | Body scrolled |

### Grid API Methods

Once you have the API reference, you can use all AG Grid methods:

```javascript
// Export
gridApi.current?.exportDataAsExcel();
gridApi.current?.exportDataAsCsv();

// Data
gridApi.current?.setGridOption('rowData', newData);
gridApi.current?.getSelectedRows();

// Columns
gridApi.current?.autoSizeColumns(gridApi.current.getColumns());
gridApi.current?.setColumnVisible('field', false);

// Selection
gridApi.current?.selectAll();
gridApi.current?.deselectAll();

// Filter
gridApi.current?.setFilterModel(null);
```

## Master/Detail Example

```javascript
Grid({
  api: gridApi,
  data: masterData,
  options: {
    columnDefs: [
      { field: 'id', headerName: 'ID' },
      { field: 'name', headerName: 'Customer' }
    ],
    masterDetail: true,
    detailCellRendererParams: {
      detailGridOptions: {
        columnDefs: [
          { field: 'product', headerName: 'Product' },
          { field: 'quantity', headerName: 'Quantity' }
        ]
      },
      getDetailRowData: (params) => {
        fetch(`/api/orders/${params.data.id}`)
          .then(res => res.json())
          .then(details => params.successCallback(details));
      }
    }
  }
});
```

## With TypeScript

```typescript
import { Grid, GridApi, GridOptions } from 'sigpro-grid';

interface User {
  id: number;
  name: string;
  email: string;
}

const gridApi = { current: null as GridApi | null };

Grid({
  api: gridApi,
  data: () => users,
  options: {
    columnDefs: [
      { field: 'id', headerName: 'ID' },
      { field: 'name', headerName: 'Name' },
      { field: 'email', headerName: 'Email' }
    ]
  } as GridOptions<User>
});
```

## Reactive Data Example

```javascript
const users = w([]);

// Data updates automatically reflect in grid
const addUser = (user) => {
  users([...users(), user]);
};

Grid({
  api: gridApi,
  data: () => users(), // Reactive!
  options: { columnDefs: [...] }
});
```

## Dark Mode Support

The grid automatically detects and adapts to dark mode via:
- `data-theme="dark"` attribute on HTML element
- System preference `prefers-color-scheme: dark`

## Included AG Grid Modules

The bundled AG Grid includes:

**Community:**
- Validation, Column Auto-Size, Cell Style, Quick Filter
- Row Selection, Text Editor, Client Side Row Model

**Enterprise:**
- Multi Filter, Cell Selection, Pivot, Master Detail
- Side Bar, Columns Tool Panel, Column Menu
- Status Bar, Excel Export, Clipboard

## Building from Source

```bash
# Install dev dependencies
npm install

# Build AG Grid bundle
npm run build
```

## Requirements

- SigProUI framework
- Modern browser with ES module support

## License

MIT
