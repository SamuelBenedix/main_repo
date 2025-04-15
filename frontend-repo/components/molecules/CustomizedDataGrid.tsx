import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { columns } from '../atoms';
import { Button } from '@mui/material';
import { UserTypes } from '../../entities/userInterface';

interface Props {
  data?: UserTypes[];
  onOpenModal: (rowData: { id: string }) => void;
}

export default function CustomizedDataGrid(props: Props) {
  const { data, onOpenModal } = props;

  return (
    <DataGrid
      rows={data}
      columns={[
        ...columns,
        {
          field: 'action',
          headerName: 'Action',
          width: 150,
          sortable: false,
          renderCell: (params) => (
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={() => onOpenModal && onOpenModal(params.row)} // Call the modal opening function with row data
            >
              Edit
            </Button>
          ),
        },
      ]}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
      density="compact"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: 'outlined',
              size: 'small',
            },
            columnInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            operatorInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: 'outlined',
                size: 'small',
              },
            },
          },
        },
      }}
    />
  );
}
