import { FC } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import { ConfirmationModalProps } from './ConfirmationModalComponent.types';
import { ModalContent } from './ConfirmationModalComponent.styles';

const ConfirmationModalComponent: FC<ConfirmationModalProps> = ({
  handleCloseModal,
  openModal,
  handleSubmit,
  text,
  selectedDataId,
}) => {
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      componentsProps={{
        backdrop: { style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } },
      }}
    >
      <ModalContent>
        <Typography variant="h6">{text}</Typography>
        <Box
          sx={{ display: 'flex', justifyContent: 'center', gap: '20px', mt: 2 }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleSubmit(selectedDataId);
              handleCloseModal();
            }}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModalComponent;
