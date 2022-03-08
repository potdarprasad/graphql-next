import * as Yup from 'yup';

export const UserSchema = Yup.object().shape({
    first_name: Yup.string().required('This Field Is Required'),
    last_name: Yup.string().required('This Field Is Required'),
    email: Yup.string().required('This Field Is Required').email('Should be a valid email')
});