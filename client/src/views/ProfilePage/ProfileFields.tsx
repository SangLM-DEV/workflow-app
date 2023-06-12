import React, { useState } from 'react';
import { FormikProps, Form, Field, withFormik } from 'formik';
import { TextField } from 'components/general/TextInput';
import Button from 'components/general/Button';
import * as Yup from 'yup';
import { updateCredentials } from 'service';

//Lược đồ xác thực
const validationSchema = Yup.object({
  username: Yup.string().max(25, 'Tài khoản quá dài').required('Không được để trống!'),
  email: Yup.string().email().required('Không được để trống!'),
  name: Yup.string().max(25, 'Tên quá dài').required('Không được để trống'),
  surname: Yup.string().max(25, 'Họ quá dài').required('Không được để trống')
});

//Trường dữ liệu hồ sơ
interface ProfileFieldsProps {
  username: string;
  email: string;
  name: string;
  surname: string;
}

interface FormValues extends ProfileFieldsProps {}

//hồ sơ
const ProfileFields: React.FC<FormikProps<FormValues>> = (props) => {
  const { errors, isSubmitting, isValid, resetForm } = props;
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const editFormHandler = () => setIsEditing(true);
  const cancelFormChangesHandler = () => {
    resetForm();
    setIsEditing(false);
  };

  return (
    <Form className="profile__inputs">
      <Field disabled={!isEditing} name="username" error={errors['username']} as={TextField} />
      <Field disabled={!isEditing} name="email" error={errors['email']} as={TextField} />
      <Field disabled={!isEditing} name="name" error={errors['name']} as={TextField} />
      <Field disabled={!isEditing} name="surname" error={errors['surname']} as={TextField} />
      {isEditing ? (
        <>
          <Button disabled={isSubmitting || !isValid} variant="glow" type="submit">
            Cập nhật
          </Button>
          <Button onClick={cancelFormChangesHandler} type="button">
            Hủy bỏ
          </Button>
        </>
      ) : (
        <Button onClick={editFormHandler} className="btn-edit" type="button">
          Chỉnh sửa
        </Button>
      )}
    </Form>
  );
};

const ProfileFieldsWithFormik = withFormik<ProfileFieldsProps, FormValues>({
  mapPropsToValues: (props) => {
    const { username, email, name, surname } = props;
    return { username, email, name, surname };
  },
  validationSchema: validationSchema,
  handleSubmit: async (submittedData, { setSubmitting, setErrors }) => {
    const { error } = await updateCredentials({
      setLoading: setSubmitting,
      payload: submittedData
    });

    if (!!error) {
      setErrors(error.message);
    }
  }
})(ProfileFields);

export default ProfileFieldsWithFormik;
