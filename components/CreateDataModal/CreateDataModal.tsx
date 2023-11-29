import React from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Modal,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useFormik } from 'formik';
import { CreateRoleDataProps } from './CreateDataModal.types';
import { ModalContent } from './CreateDataModal.styles';
import { Data } from '@components/DataTable/DataTable.types';

const CreateDataModal = ({
  handleCreateData,
  handleCloseModal,
  isUserProp,
  roles,
  validationSchema,
}: CreateRoleDataProps) => {
  const handleSubmit = (data: Data) => {
    handleCreateData(data);
  };

  const initialValues = isUserProp
    ? { firstName: '', lastName: '', email: '', role: '' }
    : { name: '', description: '' };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleSubmit(values);
      formik.resetForm();
    },
  });

  return (
    <Modal
      open
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      componentsProps={{
        backdrop: { style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } },
      }}
      sx={{ minWidth: '500px' }}
    >
      <ModalContent sx={{ py: 5, px: 15, minWidth: 500 }}>
        <Grid
          container
          spacing={1}
          sx={{ mt: 2, flexDirection: 'column', alignItems: 'center' }}
        ></Grid>
        <Typography variant="h6" gutterBottom>
          Create {isUserProp ? 'User' : 'Role'}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            {isUserProp ? (
              <>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    fullWidth
                    id="firstName"
                    label="First Name"
                    variant="outlined"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    variant="outlined"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email"
                    variant="outlined"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="role">Select Role</InputLabel>
                    <Select
                      fullWidth
                      id="role"
                      name="role"
                      label="Role Name"
                      labelId="role"
                      variant="outlined"
                      value={formik.values.role}
                      onChange={formik.handleChange}
                      error={formik.touched.role && Boolean(formik.errors.role)}
                    >
                      {roles?.map((role) => (
                        <MenuItem key={role._id} value={role.name}>
                          {role.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    fullWidth
                    id="name"
                    label="Role Name"
                    variant="outlined"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="description"
                    label="Short Description"
                    variant="outlined"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                  />
                </Grid>
              </>
            )}
          </Grid>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              mt: 2,
            }}
          >
            <Button type="submit" variant="contained" color="primary">
              Create
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateDataModal;
