import { GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';

export const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 1.5, minWidth: 200 },
  {
    field: 'numberOfRents',
    headerName: 'Number Of Rents',
    flex: 1,
    minWidth: 80,
  },
  {
    field: 'totalAverageWeightRatings',
    headerName: 'Total Average Weight Ratings',
    flex: 1,
    minWidth: 80,
  },
  {
    field: 'recentlyActive',
    headerName: 'Recently Active',
    flex: 1,
    minWidth: 80,
    valueFormatter: (params: { _seconds: string; value: string }) =>
      params?._seconds
        ? dayjs(params?._seconds).format('dddd, DD/MM/YYYY HH:mm')
        : dayjs(params?.value).format('dddd, DD/MM/YYYY HH:mm'),
  },
];
