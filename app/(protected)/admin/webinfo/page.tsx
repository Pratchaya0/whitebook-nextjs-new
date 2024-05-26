import AddDialogButton from "@/components/admin/add-dialog-button";
import AddAdvertiseForm from "@/components/admin/advertises/add-advertise-form";
import AdvertiseTable from "@/components/admin/advertises/table";
import AddPaymentForm from "@/components/admin/payments/add-advertise-form";
import PaymentTable from "@/components/admin/payments/table";
import WebInfoForm from "@/components/admin/webinfo/webinfo-from";

const WebInfoPage = () => {
  return (
    <div className="mx-2">
      <div className="flex items-center justify-between gap-x-8">
        <h2>Web Information Management</h2>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-8 mt-5">
        <WebInfoForm />
      </div>
      <hr className="my-3" />
      <div className="flex items-center justify-between gap-x-8">
        <h2>Payment Management</h2>
        <div>
          <AddDialogButton title="Add Payment">
            <AddPaymentForm />
          </AddDialogButton>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-8">
        <PaymentTable />
      </div>
      <hr className="my-3" />
      <div className="flex items-center justify-between gap-x-8">
        <h2>Advertise Management</h2>
        <div>
          <AddDialogButton title="Add Advertise">
            <AddAdvertiseForm />
          </AddDialogButton>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-8">
        <AdvertiseTable />
      </div>
    </div>
  );
};

export default WebInfoPage;
