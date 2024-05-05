import OrdersTable from "@/components/admin/orders/table";
import { getListOrders } from "@/data/order";
import { Order } from "@prisma/client";

const OrdersPage = async () => {
  return (
    <>
      <div>
        <h2>Orders Management</h2>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-8">
        <OrdersTable />
      </div>
    </>
  );
};

export default OrdersPage;
