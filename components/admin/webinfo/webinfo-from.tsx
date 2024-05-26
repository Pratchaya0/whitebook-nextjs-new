"use client";

import { getWebInformation } from "@/data/webinfo";
import { WebInformation } from "@prisma/client";
import { useEffect, useState, useTransition } from "react";
import UpdateWebInfoForm from "./update-webinfo-form";

const WebInfoForm = () => {
  const [data, setData] = useState<WebInformation>();
  const fetchWebInfo = async () => {
    const data = await getWebInformation();
    setData(data as WebInformation);
  };
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    fetchWebInfo();
  }, []);

  console.log(data);

  return (
    <>
      {data && (
        <UpdateWebInfoForm
          webinfo={data as WebInformation}
          fetchData={fetchWebInfo}
        />
      )}
    </>
  );
};

export default WebInfoForm;
