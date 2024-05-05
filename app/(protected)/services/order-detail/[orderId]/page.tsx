import OrderDetail from "@/components/admin/orders/order-detail";

interface IParams {
  orderId?: string;
}

const OrderDetailPage = ({ params }: { params: IParams }) => {
  const { orderId } = params;
  return (
    <div>
      <h2>Order Details</h2>
      <OrderDetail orderId={orderId as string} />
    </div>
  );
};

export default OrderDetailPage;
