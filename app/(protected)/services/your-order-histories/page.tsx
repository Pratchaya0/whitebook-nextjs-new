import YourOrderHistoryTable from "@/components/services/your-order-histories/table";

const YourOrderHistoryPage = () => {
  return (
    <>
      <div>
        <h2>Your Orders History</h2>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-8">
        <YourOrderHistoryTable />
      </div>
    </>
  );
};

export default YourOrderHistoryPage;
