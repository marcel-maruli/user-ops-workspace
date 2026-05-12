import { useParams } from "next/navigation";

const UsersDetailDesktop = () => {
  const { id } = useParams();

  return <div>Users Detail Desktop for ID: {id}</div>;
};

export default UsersDetailDesktop;
