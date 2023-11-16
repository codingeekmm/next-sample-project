import * as yup from 'yup';

export const userFormSchema = yup
  .object()
  .shape({

    name: yup.string().nullable(),
    email: yup.string().email('Invalid mail format.').required('email is a required field'),
    password: yup.string().min(4).required('password is a required field'),
    roleId: yup.string().required(),
    departmentId: yup.string().required(),
  })
  .required();
export type UserFormData = yup.InferType<typeof userFormSchema>;


