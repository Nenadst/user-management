export interface ConfirmationModalProps {
  handleCloseModal: () => void;
  openModal: boolean;
  handleSubmit: (id: string) => void;
  text: string;
  selectedDataId: string;
}
