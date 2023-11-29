import React, { FC, useState } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  TablePagination,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import ConfirmationModalComponent from '@components/ConfirmationModalComponent/ConfirmationModalComponent';
import { CONFIRMATION_MODAL_TEXT } from '@utils/constants';
import { RolesTableProps } from './DataTable.types';

const DataTable: FC<RolesTableProps> = ({
  data,
  handleDeleteData,
  handleOpenModal,
  handleUpdateDataId,
  isConfirmationModalOpen,
  setIsConfirmationModalOpen,
  handleCloseConfirmationModal,
  selectedDataId,
  setSelectedDataId,
  isUserProp,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const isUser = isUserProp ? 'User' : 'Role';

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order</TableCell>
            <TableCell>{isUserProp ? 'First' : 'Role'} Name</TableCell>
            <TableCell>
              {isUserProp ? 'Last name' : 'Short Description'}
            </TableCell>
            {isUserProp ? <TableCell>Role Name</TableCell> : null}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((el, index) => (
              <TableRow key={el._id}>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>

                {isUserProp ? (
                  <>
                    <TableCell>{el.firstName}</TableCell>
                    <TableCell>{el.lastName}</TableCell>
                    <TableCell>{el.role}</TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{el.name}</TableCell>
                    <TableCell>{el.description}</TableCell>
                  </>
                )}
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    onClick={() => {
                      handleOpenModal(el);
                      handleUpdateDataId(el._id!);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      setIsConfirmationModalOpen(true);
                      setSelectedDataId(el._id!.toString());
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ConfirmationModalComponent
        openModal={isConfirmationModalOpen}
        handleCloseModal={handleCloseConfirmationModal}
        text={`${CONFIRMATION_MODAL_TEXT}  ${isUser}`}
        handleSubmit={handleDeleteData!}
        selectedDataId={selectedDataId}
      />
    </TableContainer>
  );
};

export default DataTable;
