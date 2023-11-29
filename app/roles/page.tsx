'use client';

import React from 'react';
import { Container, Typography, Paper, Button } from '@mui/material';
import DataTable from '@components/DataTable/DataTable.component';
import CreateDataModal from '../../components/CreateDataModal/CreateDataModal';
import EditRoleModal from '../../components/EditDataModal/EditDataModal';
import { useRoles } from './hooks/useRoles';
import { validationRoleSchema } from '@utils/validationSchema';

const Roles: React.FC = () => {
  const {
    selectedRole,
    selectedRoleId,
    setSelectedRoleId,
    isEditModalOpen,
    isConfirmationModalOpen,
    setIsConfirmationModalOpen,
    isCreateModalOpen,
    setIsCreateModalOpen,
    sortedRoles,
    handleCreateRole,
    handleDeleteRole,
    handleUpdateRole,
    handleUpdateRoleId,
    handleOpenEditModal,
    handleCloseEditModal,
    handleCloseCreateModal,
    handleCloseConfirmationModal,
  } = useRoles();

  return (
    <Container maxWidth="lg" sx={{ marginTop: 10 }}>
      <Paper elevation={3} sx={{ padding: '20px', margin: '20px 0' }}>
        <Typography variant="h4" gutterBottom>
          Roles Page
        </Typography>
        <Button
          variant="contained"
          sx={{ marginBottom: '30px' }}
          onClick={() => setIsCreateModalOpen(!isCreateModalOpen)}
        >
          Create New Role
        </Button>
        <DataTable
          data={sortedRoles}
          handleDeleteData={handleDeleteRole}
          handleOpenModal={handleOpenEditModal}
          handleUpdateDataId={handleUpdateRoleId}
          isConfirmationModalOpen={isConfirmationModalOpen}
          setIsConfirmationModalOpen={setIsConfirmationModalOpen}
          handleCloseConfirmationModal={handleCloseConfirmationModal}
          selectedDataId={selectedRoleId}
          setSelectedDataId={setSelectedRoleId}
        />
      </Paper>
      {isCreateModalOpen && (
        <CreateDataModal
          handleCreateData={handleCreateRole}
          handleCloseModal={handleCloseCreateModal}
          validationSchema={validationRoleSchema}
        />
      )}
      {isEditModalOpen && (
        <EditRoleModal
          handleCloseModal={handleCloseEditModal}
          selectedData={selectedRole}
          selectedDataId={selectedRoleId}
          handleMutation={handleUpdateRole}
          validationSchema={validationRoleSchema}
        />
      )}
    </Container>
  );
};

export default Roles;
