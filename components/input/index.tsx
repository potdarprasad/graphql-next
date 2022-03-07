import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { ErrorMessage, FieldProps } from "formik";

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const InputField = ({
  field,
  form: _,
  ...props
}: FieldProps & InputProps) => {
  return (
    <div className="form-group my-2">
      <label htmlFor={field.name || ""}>
        <strong>{props?.label}</strong>
      </label>
      <input className="form-control" {...field} {...props} />
      <div className="text-danger text-sm fst-italic">
        <ErrorMessage name={field.name} />
      </div>
    </div>
  );
};
