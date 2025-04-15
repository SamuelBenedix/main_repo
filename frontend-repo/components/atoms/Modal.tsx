import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import { default as MuiModal } from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface ModalProps {
  open?: boolean;
  onClose?: () => void;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
  children?: React.ReactNode;
  title?: string;
  onSubmit?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  open: openProp = false,
  onClose,
  onEnter,
  onExited,
  children,
  title,
  onSubmit,
}) => {
  const [open, setOpen] = React.useState(openProp);

  React.useEffect(() => {
    setOpen(openProp);
  }, [openProp]);

  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <MuiModal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          onEnter: onEnter
            ? (node: HTMLElement) => onEnter(node, true)
            : undefined,
          onExited: onExited
            ? (node: HTMLElement) => onExited(node, true)
            : undefined,
        },
      }}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <>{children}</>
        <Grid container spacing={2}>
          <Grid size={8}></Grid>
          <Grid size={4}>
            <Stack
              direction="row"
              spacing={2}
              useFlexGap
              sx={{
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <Button variant="outlined" onClick={() => handleClose()}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => (onSubmit ?? (() => {}))()}
              >
                Save
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </MuiModal>
  );
};

export default Modal;
