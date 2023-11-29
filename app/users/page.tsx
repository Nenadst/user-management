'use client';

import React from 'react';
import { Container, Typography, Paper, Button } from '@mui/material';
import CreateDataModal from '@components/CreateDataModal/CreateDataModal';
import EditDataModal from '@components/EditDataModal/EditDataModal';
import DataTable from '@components/DataTable/DataTable.component';
import { validationUserSchema } from '@utils/validationSchema';
import { useUsers } from './hooks/useUsers';

const Users: React.FC = () => {
  const {
    users,
    roles,
    isUserProp,
    selectedRole,
    selectedUserId,
    setSelectedUserId,
    isEditModalOpen,
    isConfirmationModalOpen,
    setIsConfirmationModalOpen,
    isCreateModalOpen,
    setIsCreateModalOpen,
    handleCreateUser,
    handleDeleteUser,
    handleUpdateUser,
    handleUpdateUserId,
    handleOpenEditModal,
    handleCloseEditModal,
    handleCloseCreateModal,
    handleCloseConfirmationModal,
  } = useUsers();

  return (
    <Container maxWidth="lg" sx={{ marginTop: 10 }}>
      <Paper elevation={3} sx={{ padding: '20px', margin: '20px 0' }}>
        <Typography variant="h4" gutterBottom>
          Users Page
        </Typography>
        <Button
          variant="contained"
          sx={{ marginBottom: '30px' }}
          onClick={() => setIsCreateModalOpen(!isCreateModalOpen)}
        >
          Create New User
        </Button>
        <DataTable
          data={users}
          handleDeleteData={handleDeleteUser}
          handleOpenModal={handleOpenEditModal}
          handleUpdateDataId={handleUpdateUserId}
          isConfirmationModalOpen={isConfirmationModalOpen}
          setIsConfirmationModalOpen={setIsConfirmationModalOpen}
          handleCloseConfirmationModal={handleCloseConfirmationModal}
          selectedDataId={selectedUserId}
          setSelectedDataId={setSelectedUserId}
          isUserProp={isUserProp}
        />
      </Paper>
      {isCreateModalOpen && (
        <CreateDataModal
          handleCreateData={handleCreateUser}
          handleCloseModal={handleCloseCreateModal}
          isUserProp={isUserProp}
          roles={roles}
          validationSchema={validationUserSchema}
        />
      )}
      {isEditModalOpen && (
        <EditDataModal
          handleCloseModal={handleCloseEditModal}
          selectedData={selectedRole}
          selectedDataId={selectedUserId}
          handleMutation={handleUpdateUser}
          isUserProp={isUserProp}
          roles={roles}
          validationSchema={validationUserSchema}
        />
      )}
    </Container>
  );
};

export default Users;
