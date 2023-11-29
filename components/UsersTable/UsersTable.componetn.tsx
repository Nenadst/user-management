import React, { FC } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import ConfirmationModalComponent from '@components/ConfirmationModalComponent/ConfirmationModalComponent';
import { CONFIRMATION_MODAL_TEXT } from '@utils/constants';
import { RolesTableProps } from './UsersTable.types';

const UsersTable: FC<RolesTableProps> = ({
  roles,
  handleDeleteRole,
  handleOpenModal,
  handleUpdateRoleId,
  isConfirmationModalOpen,
  setIsConfirmationModalOpen,
  handleCloseConfirmationModal,
  selectedRoleId,
  setSelectedRoleId,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Role Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles?.map((role) => (
            <TableRow key={role._id}>
              <TableCell>{role._id}</TableCell>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.description}</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell>
                <IconButton
                  aria-label="edit"
                  onClick={() => {
                    handleOpenModal(role);
                    handleUpdateRoleId(role._id!);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    setIsConfirmationModalOpen(true);
                    setSelectedRoleId(role._id!.toString());
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ConfirmationModalComponent
        openModal={isConfirmationModalOpen}
        handleCloseModal={handleCloseConfirmationModal}
        text={CONFIRMATION_MODAL_TEXT}
        handleSubmit={handleDeleteRole}
        selectedDataId={selectedRoleId}
      />
    </TableContainer>
  );
};

export default UsersTable;
