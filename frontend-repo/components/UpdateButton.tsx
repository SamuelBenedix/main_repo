'use client';

import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';
import { RootState, AppDispatch } from '../store/store'; // Adjust the import path as necessary
import { fetchAllUsers } from '../store/actions/userActions';

export default function UpdateButton() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, user, error } = useSelector(
    (state: RootState) => state.user
  );

  return (
    <>
      <Button variant="contained" onClick={() => dispatch(fetchAllUsers())}>
        Get User Info
      </Button>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{String(error)}</Typography>}
      {user && <Typography>User: {JSON.stringify(user)}</Typography>}
    </>
  );
}
