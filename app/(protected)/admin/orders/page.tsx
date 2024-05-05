import OrdersTable from "@/components/admin/orders/table";
import { getListOrders } from "@/data/order";
import { Order } from "@prisma/client";

const OrdersPage = async () => {
  const orders = await getListOrders();
  return (
    <>
      <div>
        <h2>Orders Management</h2>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-8">
        <OrdersTable orders={orders as Order[]} />
      </div>
    </>
  );
};

export default OrdersPage;
