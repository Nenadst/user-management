import { Grid } from '@mui/material';
import theme from '@theme';
import styled from 'styled-components';

export const ModalContent = styled(Grid)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  padding: '40px',
  backgroundColor: theme.palette.custom.white,
  border: '2px solid #000',
}));
