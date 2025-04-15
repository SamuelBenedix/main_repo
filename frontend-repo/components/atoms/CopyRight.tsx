import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

interface CopyrightProps {
  sx?: object | object[];
}

export default function Copyright(props: CopyrightProps) {
  return (
    <Typography
      variant="body2"
      align="center"
      {...props}
      sx={[
        {
          color: 'text.secondary',
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Samuel Benedict
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
