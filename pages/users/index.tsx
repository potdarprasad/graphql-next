import Link from "next/link";
import ClientOnly from "../../components/clientOnly";
import UserList from "../../components/users/users";

export default function Users() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 mt-4 ml-6">
            <Link href={"users/add"}>
              <button className="btn btn-primary">Add User</button>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-6 mx-auto my-5">
            <ClientOnly>
              <UserList />
            </ClientOnly>
           
          </div>
        </div>
      </div>
    </>
  );
}
