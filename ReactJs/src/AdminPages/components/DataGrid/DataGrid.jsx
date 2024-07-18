import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

export default function DataTable(props) {
   const { data } = useDemoData({
      dataSet: 'Commodity',
      rowLength: 500,
      maxColumns: 6,
   });
   return (
      <Box sx={{ height: 450, width: 1060, backgroundColor: '#fff', marginTop: 2 }}>
         <DataGrid
            rows={props.data}
            columns={props.columns}
            initialState={{
               pagination: {
                  paginationModel: {
                     pageSize: 10,
                  },
               },
            }}
            pageSizeOptions={[10]}
            checkboxSelection
            disableRowSelectionOnClick
         />
      </Box>
   );
}
