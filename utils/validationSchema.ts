import * as Yup from 'yup';

export const validationRoleSchema = Yup.object().shape({
  name: Yup.string()
    .required('Role name is required')
    .matches(
      /^\s*[\w\s]+\s*$/,
      'Alphanumeric characters, underscore, and blank spaces only',
    )
    .min(2, 'Minimum 2 characters')
    .max(16, 'Maximum 16 characters'),
  description: Yup.string()
    .min(2, 'Minimum 2 characters')
    .max(50, 'Maximum 50 characters'),
});

export const validationUserSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .matches(
      /^\s*[A-Za-z\s]+\s*$/,
      'Only alphabetic characters and blank spaces allowed',
    )
    .min(2, 'Minimum 2 characters')
    .max(20, 'Maximum 20 characters'),
  lastName: Yup.string()
    .required('Last name is required')
    .matches(
      /^\s*[A-Za-z\s]+\s*$/,
      'Only alphabetic characters and blank spaces allowed',
    )
    .min(2, 'Minimum 2 characters')
    .max(20, 'Maximum 20 characters'),
  email: Yup.string()
    .required('Email address is required')
    .email('Invalid email address')
    .min(2, 'Minimum 2 characters')
    .max(50, 'Maximum 50 characters'),
  role: Yup.string().required('Role name is required'),
});
