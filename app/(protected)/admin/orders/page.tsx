import OrdersTable from "@/components/admin/orders/table";
import { getListOrders } from "@/data/order";
import { Order } from "@prisma/client";

const OrdersPage = async () => {
  const orders = await getListOrders();
  return (
    <div>
      <OrdersTable orders={orders as Order[]} />
    </div>
  );
};

export default OrdersPage;
