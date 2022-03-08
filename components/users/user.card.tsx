import Link from "next/link";

export default function UserCard({ user, index, deleteUser }) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{`${user.first_name} ${user.last_name}`}</td>
      <td>{user.email}</td>
      <td>
        <Link href={`users/edit/${user.id}`}>
          <button className="btn btn-warning text-white mx-2">Edit</button>
        </Link>

        <button
          className="btn btn-danger mx-2"
          onClick={() => {
            deleteUser(user.id, index);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
