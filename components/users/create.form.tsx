import { Formik, Form, FormikHelpers, Field } from "formik";
import { User } from "../../schema/models/user.model";
import { UserSchema } from "../../schema/validator/user.validator";
import { InputField } from "../input";

export default function CreateUserForm() {
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    age: "",
  };

  const handleSubmit = async (values, formikHelpers: FormikHelpers<any>) => {
    console.log(values);
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={UserSchema}
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Form>
            <div className="mb-3">
              <Field
                label="First Name"
                name="first_name"
                placeholder="Enter first name"
                component={InputField}
              />
              <Field
                label="Last Name"
                name="last_name"
                placeholder="Enter last name"
                component={InputField}
              />
              <Field
                type="email"
                label="Email"
                name="email"
                placeholder="Enter email"
                component={InputField}
              />
              <Field
                type="number"
                label="Age"
                name="age"
                placeholder="Enter age"
                component={InputField}
              />
            </div>
            <div className="mb-3">
              <span className="me-3">
                <button type="submit" className="btn btn-success mr-3">
                  Register
                </button>
              </span>
              {/* <Link href="/login">
                <a>I already have an account</a>
              </Link> */}
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
