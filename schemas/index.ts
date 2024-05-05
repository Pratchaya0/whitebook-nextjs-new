import { title } from "process";
import * as z from "zod";

enum UserRoleType {
  ADMIN = "ADMIN",
  USER = "USER",
}

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    // role: z.enum([UserRoleType.ADMIN, UserRoleType.USER]),
    role: z.string(),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

// จัดการหนังสือ
export const BookSchema = z.object({
  name: z.string(),
  description: z.string(),
  // .min(100, {
  //   message: "Minimum 100 characters required",
  // }),
  price: z.string(),
  writer: z.string(),
  publisher: z.string(),
  isOnSale: z.boolean(),
  bookUrl: z.string(),
  categoryId: z.string(),
});

export const BookPreviewImageSchema = z.object({
  imageUrl: z.string(),
  bookId: z.string(),
});

export const ReviewSchema = z.object({
  comment: z.string(),
  userId: z.string(),
  bookId: z.string(),
  rating: z.string(),
});

export const CategorySchema = z.object({
  categoryName: z.string(),
  categoryIcon: z.optional(z.string()),
  userId: z.optional(z.string()),
});

export const GenreTagSchema = z.object({
  genreTagName: z.string(),
  userId: z.string(),
});

export const BookBuyerSchema = z.object({
  userId: z.string(),
  bookId: z.string(),
  isAvailable: z.optional(z.string()),
});

// จัดการข้อมูลการสั่งซื้อ
export const OrderSchema = z.object({
  amount: z.string(),
  paymentImageUrl: z.optional(z.string()),
  isPaid: z.optional(z.string()),
  userId: z.string(),
});

export const OrderBookSchema = z.object({
  orderId: z.string(),
  bookId: z.string(),
});

// จัดการข้อมูลเว็บ
export const WebInformationSchema = z.object({
  name: z.optional(z.string()),
  email: z.optional(z.string()),
  phone: z.optional(z.string()),
  facebook: z.optional(z.string()),
  line: z.optional(z.string()),
});

export const PaymentInformationSchema = z.object({
  paymentName: z.string(),
  paymentCode: z.optional(z.string()),
  paymentImageUrl: z.string(),
});

export const AdvertisementSchema = z.object({
  title: z.string(),
  description: z.string(),
  highlightDescription: z.string(),
  advertiseImageUrl: z.optional(z.string()),
});

// จัดการข้อมูลตะกร้าสินค้า
//สร้างตอน crate user
export const Cart = z.object({
  userId: z.string(),
});

export const CartBook = z.object({
  bookId: z.string(),
  cartId: z.string(),
});
