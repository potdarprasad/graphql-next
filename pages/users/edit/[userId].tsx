import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CreateUserForm from "../../../components/users/create.form";

const GET_USER_QUERY = gql`
  query User($id: String!) {
    user(id: $id) {
      id
      first_name
      last_name
      email
    }
  }
`;

export default function addEdit() {
  const router = useRouter();
  const { userId } = router.query;
  const { data, loading, error, refetch } = useQuery(GET_USER_QUERY, {
    variables: { id: userId },
    skip: !userId,
  });
  let user;
  if (data) {
    user = data?.user;
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-6 mx-auto border border-dark p-3 my-5">
            <h4 className="text-center">Edit User</h4>
            {user ? <CreateUserForm user={user} /> : null}
          </div>
        </div>
      </div>
    </>
  );
}
