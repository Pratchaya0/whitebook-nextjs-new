import UsersTable from "@/components/admin/user/table";
import { getListUsers } from "@/data/user";
import { User } from "@prisma/client";

const UserPage = async () => {
  const users = await getListUsers();
  return (
    <div>
      <UsersTable users={users as User[]} />
    </div>
  );
};

export default UserPage;
