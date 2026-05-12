import { useParams } from "next/navigation";

const UsersDetailMobile = () => {
  const { id } = useParams();

  return <div>Users Detail Mobile for ID: {id}</div>;
};

export default UsersDetailMobile;
