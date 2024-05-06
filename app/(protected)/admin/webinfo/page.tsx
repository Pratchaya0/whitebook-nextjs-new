"use client";

import AddDialogButton from "@/components/admin/add-dialog-button";
import AddAdvertiseForm from "@/components/admin/advertises/add-advertise-form";
import AdvertiseTable from "@/components/admin/advertises/table";
import AddPaymentForm from "@/components/admin/payments/add-advertise-form";
import PaymentTable from "@/components/admin/payments/table";
import UpdateWebInfoForm from "@/components/admin/webinfo/update-webinfo-form";
import { Button } from "@/components/ui/button";
import { getWebInformation } from "@/data/webinfo";
import { WebInformation } from "@prisma/client";
import { useEffect, useState, useTransition } from "react";
import { FaRedoAlt } from "react-icons/fa";

const WebInfoPage = () => {
  const [data, setData] = useState<WebInformation>();
  const fetchWebInfo = async () => {
    const data = await getWebInformation();
    setData(data as WebInformation);
  };
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    startTransition(() => {
      fetchWebInfo();
    });
  }, []);

  return (
    <div className="mx-2">
      <div className="flex items-center justify-between gap-x-8">
        <h2>Web Information Management</h2>
        <div>
          <Button
            type="button"
            variant="secondary"
            className="ml-auto"
            onClick={() => {
              fetchWebInfo();
            }}
          >
            <FaRedoAlt />
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-8 mt-5">
        {!isPending && <UpdateWebInfoForm webinfo={data as WebInformation} />}
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
