import { FC } from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { ModalContent } from './EditDataModal.styles';
import { EditRoleModalProps } from './EditDataModal.types';
import { Role } from '@app/roles/roles.types';

const EditDataModal: FC<EditRoleModalProps> = ({
  handleCloseModal,
  selectedData,
  selectedDataId,
  handleMutation,
  isUserProp,
  roles,
  validationSchema,
}) => {
  const handleSubmit = (roles: Role) => {
    handleMutation?.({ id: selectedDataId, data: roles })!;
    handleCloseModal();
  };

  const initialValues = isUserProp
    ? {
        firstName: selectedData.firstName,
        lastName: selectedData.lastName,
        email: selectedData.email,
        role: selectedData.role,
      }
    : { name: selectedData.name, description: selectedData.description };

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
        <Typography variant="h6" gutterBottom>
          Edit {isUserProp ? 'User' : 'Role'}
        </Typography>
        <Grid
          container
          spacing={1}
          sx={{ mt: 2, flexDirection: 'column', alignItems: 'center' }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              {isUserProp ? (
                <>
                  <Grid item xs={12}>
                    <TextField
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
                        formik.touched.lastName &&
                        Boolean(formik.errors.lastName)
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
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
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
                        error={
                          formik.touched.role && Boolean(formik.errors.role)
                        }
                      >
                        {roles?.map((role) => (
                          <MenuItem key={role._id} value={role.description}>
                            {role.description}
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
                Save
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
        </Grid>
      </ModalContent>
    </Modal>
  );
};

export default EditDataModal;
