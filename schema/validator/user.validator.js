import * as Yup from 'yup';

export const UserSchema = Yup.object().shape({
    first_name: Yup.string().required('This Field Is Required'),
    last_name: Yup.string().required('This Field Is Required'),
    age: Yup.number().required('This Field Is Required').min(18, 'Min Age Should be atleast 18 years').max(50, 'Max Age Should be atleast 50 years'),
    email: Yup.string().required('This Field Is Required').email('Should be a valid email')
});