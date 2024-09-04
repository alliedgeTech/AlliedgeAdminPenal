export interface Column {
    field: string;
    headerName: string;
    width: number;
    align?: 'left' | 'center' | 'right';
    renderCell?: (params: { value: any, row: any }) => React.ReactNode;
  }
  
 export interface CommonDataGridProps {
    rows: any[];
    columns: Column[];
    getRowId: (row: any) => string;
    showConfirmation: boolean;
    confirmationMessage: string;
    onCancelDelete: () => void;
    onConfirmDelete: () => void;
    loading: boolean;
    toolbarQuickFilter?: boolean;
    onDateFilter: (startDate: Date, endDate: Date) => void;
  }