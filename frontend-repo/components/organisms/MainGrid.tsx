import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Copyright } from '../atoms';
import { CustomizedDataGrid } from '../molecules';
import { Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { UserTypes } from '../../entities/userInterface';
interface Props {
  onClick?: () => void;
  data?: UserTypes[];
  status?: string;
  text?: string;
  onUpdateModal: (rowData: { id: string }) => void;
}

export default function MainGrid(props: Props) {
  const { loading, error } = useSelector(
    (state: RootState) => state.user as { loading: boolean; error: string }
  );
  console.log('MainGrid props', props.data);

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Details
      </Typography>
      <Button
        sx={{ marginBottom: '10px' }}
        variant="contained"
        onClick={props.onClick}
      >
        {loading ? 'Loading...' : props.text}
      </Button>
      <Grid container spacing={2} columns={12}>
        {error && <Typography>{error}</Typography>}
        <Grid size={{ xs: 12, lg: 12 }}>
          <CustomizedDataGrid
            data={props.data || []}
            onOpenModal={props.onUpdateModal}
          />
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
