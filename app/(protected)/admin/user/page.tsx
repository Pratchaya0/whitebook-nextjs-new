import UsersTable from "@/components/admin/user/table";
import { getListUsers } from "@/data/user";
import { User } from "@prisma/client";

const UserPage = async () => {
  const users = await getListUsers();
  return (
    <>
      <div>
        <h2>Users Management</h2>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-8">
        <UsersTable users={users as User[]} />
      </div>
    </>
  );
};

export default UserPage;
