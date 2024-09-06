// CustomDataGrid.tsx
import React from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import ConfirmationDialog from './ConfirmationDialog';

interface CustomDataGridProps {
  rows: any[];
  columns: GridColDef[];
  loading: boolean;
  showConfirmation: boolean;
  confirmationMessage: string;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
  toolbarProps?: any;
}

const CustomDataGrid: React.FC<CustomDataGridProps> = ({
  rows,
  columns,
  loading,
  showConfirmation,
  confirmationMessage,
  onCancelDelete,
  onConfirmDelete,
  toolbarProps
}) => {
  return (
    <Box m="40px 0 0 0" height="75vh" sx={{
      "& .MuiDataGrid-root": {
        border: "2px solid #ddd",
        borderRadius: "8px",
      },
      "& .MuiDataGrid-cell": {
        borderBottom: "1px solid #ddd",
        padding: '8px',
        textAlign: 'center',
        "&:hover": {
          backgroundColor: 'transparent', 
        },
      },
      "& .MuiDataGrid-row:hover ":{
        backgroundColor: '#ffffff', 
      } , 
      "& .MuiDataGrid-row.Mui-selected":{
        ":hover":{
          backgroundColor: '#ffffff', 
        }
      } ,
      "& .MuiDataGrid-columnHeader": {
        backgroundColor: "transparent",
        color: "#333",
        fontWeight: "bold",
        textAlign: 'center',
      },
      "& .MuiDataGrid-cell:not(:last-child)": {
        borderRight: "1px solid #ddd",
      },
      "& .MuiDataGrid-toolbarContainer":{
        borderBottom: '1px solid #ddd',
        padding: '5px',
        marginLeft:'10px',
        gap:'20px',
      },
      "& .css-1knaqv7-MuiButtonBase-root-MuiButton-root":{
        color:'#2196f3ed',
        fontSize:'1rem',
        marginBottom:'10px',
        marginTop:'10px',
      }
    }}>
      {showConfirmation && (
        <ConfirmationDialog
          message={confirmationMessage}
          onCancel={onCancelDelete}
          onConfirm={onConfirmDelete}
        />
      )}
      <DataGrid
        rows={rows}
        columns={columns}
        slots={{ toolbar: GridToolbar }}            
        getRowId={(row) => row._id}
        autoHeight
        pageSizeOptions = {[100]}
        slotProps={toolbarProps}
        loading={loading}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
      />
    </Box>
  );
};

export default CustomDataGrid;
