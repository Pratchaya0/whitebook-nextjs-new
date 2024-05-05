import UsersTable from "@/components/admin/user/table";

const UserPage = async () => {
  return (
    <>
      <div>
        <h2>Users Management</h2>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-8">
        <UsersTable />
      </div>
    </>
  );
};

export default UserPage;
