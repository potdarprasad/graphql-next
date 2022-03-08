import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { Formik, Form, FormikHelpers, Field } from "formik";
import { User } from "../../schema/models/user.model";
import { UserSchema } from "../../schema/validator/user.validator";
import { InputField } from "../input";
import { useState, useEffect } from "react";

import Router from "next/router";

const CREATE_QUERY = gql`
  mutation CreateUser(
    $first_name: String!
    $last_name: String!
    $email: String!
  ) {
    createUser(first_name: $first_name, last_name: $last_name, email: $email) {
      id
    }
  }
`;

const UPDATE_QUERY = gql`
  mutation UpdateUser(
    $id: String!
    $first_name: String!
    $last_name: String!
    $email: String!
  ) {
    updateUser(
      id: $id
      first_name: $first_name
      last_name: $last_name
      email: $email
    ) {
      id
    }
  }
`;
export default function CreateUserForm(props) {
  let [initialValues, setInitialValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  let [createUser] = useMutation(CREATE_QUERY);
  let [updateUser] = useMutation(UPDATE_QUERY);

  const isAddMode = !props?.user;

  useEffect(() => {
    const user = props.user;
    if (user) {
      setInitialValues((prevState) => ({
        ...prevState,
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      }));
    }
  }, [props.user]);

  if (isLoading) {
    return (
      <>
        <h5 className="text-info text-center my-5">Creating New User</h5>
      </>
    );
  }
  if (error)
    return (
      <>
        <h5 className="text-danger text-center my-5">{`Submission error! ${error}`}</h5>
      </>
    );

  const handleSubmit = async (values, formikHelpers: FormikHelpers<any>) => {
    try {
      setIsLoading(true);
      if (isAddMode) {
        await createUser({
          variables: values,
        });
      } else {
        await updateUser({
          variables: values,
        });
      }

      setIsLoading(false);
      Router.push("/users");
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      alert("Something Went Wrong");
    }
  };

  return (
    <>
      <Formik
        enableReinitialize
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
            </div>
            <div className="mb-3">
              <span className="me-3">
                <button type="submit" className="btn btn-success mr-3">
                  {isAddMode ? "Create " : "Update "} User
                </button>
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
