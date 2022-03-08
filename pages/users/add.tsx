import CreateUserForm from "../../components/users/create.form";

export default function AddUser() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-6 mx-auto border border-dark p-3 my-5">
            <h4 className="text-center">Create User</h4>
            <CreateUserForm />
          </div>
        </div>
      </div>
    </>
  );
}
