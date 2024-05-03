import { db } from "@/lib/db";

export const getWebInformation = async () => {
  try {
    const webinfo = await db.webInformation.findUnique({
      where: {
        id: "fixid",
      },
    });

    return webinfo;
  } catch (error) {
    return null;
  }
};

// ช่องทางการชำระเงิน
export const getPaymentInformation = async () => {
  try {
    const paymentInfo = await db.paymentInformation.findMany({
      where: {
        webInformationId: "fixid",
      },
    });

    return paymentInfo;
  } catch (error) {
    return null;
  }
};

// โฆษณา
export const getAdvertisement = async () => {
  try {
    const advertise = await db.advertisement.findMany();

    return advertise;
  } catch (error) {
    return null;
  }
};
