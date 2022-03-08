import { useQuery, gql, useMutation, useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import UserCard from "./user.card";

const QUERY = gql`
  query Users {
    users {
      id
      first_name
      last_name
      email
    }
  }
`;

const DEL_QUERY = gql`
  mutation RemoveUser($id: String!) {
    removeUser(id: $id) {
      id
    }
  }
`;

export default function UserList() {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  let [deleteUserMutation] = useMutation(DEL_QUERY);

  let [getUsers] = useLazyQuery(QUERY);

  // Method To Load Users List
  useEffect(async () => {
    try {
      setIsLoading(true);
      const { data } = await getUsers();
      setUsers([...data.users]);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      alert("Something Went Wrong");
    }
  }, []);

  // Method To Delete User
  const deleteUser = async (id, index) => {
    try {
      setIsLoading(true);
      await deleteUserMutation({ variables: { id } });
      users.splice(
        users.findIndex((x) => x.id === id),
        1
      );
      setUsers([...users]);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      alert("Something Went Wrong");
    }
  };

  if (isLoading) {
    return (
      <>
        <h2>
          <a href="#loading" aria-hidden="true" id="loading"></a>Loading...
        </h2>
      </>
    );
  }

  if (error) {
    return (
      <>
        <h4 className="text-danger">{error}</h4>
      </>
    );
  }

  return (
    <>
      <table className="table table-bordered table-striped text-center">
        <thead>
          <tr className="bg-primary text-white">
            <td>#</td>
            <td>Name</td>
            <td>Email</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, index) => {
              return (
                <UserCard
                  key={user.id}
                  user={user}
                  deleteUser={deleteUser}
                  index={index}
                />
              );
            })}
        </tbody>
      </table>
    </>
  );
}
