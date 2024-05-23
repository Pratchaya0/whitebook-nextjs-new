import nodemailer from "nodemailer";

const domain = process.env.NEXT_PUBLIC_APP_URL;

const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (error) {
    console.log(error);
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: "2FA Code",
      html: `<p>Your 2FA code: ${token}</p>`,
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  console.log(email);
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (error) {
    console.log(error);
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: "Reset your password",
      html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  console.log(email);
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (error) {
    console.log(error);
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: "Confirm your email",
      html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
};

export const sendOrderCreatedEmailToAdmin = async (
  email: string,
  orderId: string
) => {
  console.log(email);
  const orderDetailLink = `${domain}/services/order-details/${orderId}`;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (error) {
    console.log(error);
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: "New order alert",
      html: `<p>Click <a href="${orderDetailLink}">here</a> to see order detail.</p>`,
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
};

export const sendConfirmedOrderEmailToUser = async (
  email: string,
  orderId: string
) => {
  console.log(email);
  const orderDetailLink = `${domain}/services/order-details/${orderId}`;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (error) {
    console.log(error);
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: "Your order is approved",
      html: `<p>Click <a href="${orderDetailLink}">here</a> to see order detail.</p>`,
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
};
