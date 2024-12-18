import { z } from "zod";

export const passwordField = (
  name: string,
  min: number = 4,
  max: number = 32
) =>
  z
    .string({
      required_error: `The ${name} is required.`,
      invalid_type_error: `${name} type is invalid`,
    })
    .min(min, { message: `${name} is too short` })
    .max(max, { message: `${name} is too long` });

export const NumberField = (name: string, length: number = 0) =>
  z
    .number({
      required_error: `The ${name} is required.`,
      invalid_type_error: `Provide valid type`,
    })
    .min(length, { message: `invalid ${name}` })
    .refine(
      (data) => data > 0,
      `${name} cannot be less than 0 or equals to 0 `
    );

export const PhoneField = (name: string, len: number = 0) =>
  z
    .number({
      required_error: `${name} is required`,
      invalid_type_error: `Provide valid type`,
    })
    .refine(
      (data) => data.toString().length <= 10,
      `${name} digits cannot be greater than 10 `
    );

export const PercentageField = (name: string, length: number = 0) =>
  z
    .number({
      required_error: `${name} is required`,
      invalid_type_error: `Provide valid type`,
    })
    .min(length, { message: `invalid ${name}` })
    .refine((data) => data <= 100, `${name} cannot be greater than 100 `);

export const emailField = (val: string) =>
  z
    .string({
      required_error: `The ${val} is required.`,
      invalid_type_error: "Provide valid type",
    })
    .min(1, { message: `${val} is too short` })
    .email("Invalid email address");

// export  const searchEmailSchema = z.object({
//     email: z.string().email({ message: "Invalid email address" }),
//   });

export const stringField = (val: string, min?: number, max?: number) =>
  z
    .string({
      required_error: `The ${val} is required.`,
      invalid_type_error: `Provide ${val} valid type`,
    })
    .refine((data) => (max ? data.length <= max : true), `${val} is too long`)
    .refine((data) => (min ? data.length >= min : true), `${val} is too short`);

export const ISODateTimeString = (name: string) =>
  z.string().refine((value) => /^\d{4}-\d{2}-\d{2}/.test(value), {
    message: `${name} must be a valid ISO date-time string.`,
  });

// 2044-2-3

export const discountField = (name: string) =>
  z.string().refine((value) => value === "percentage" || value === "amount", {
    message: `${name} must be either 'percentage' or 'amount'`,
  });
export const GenderEnums = z.enum(["male", "female", "other"]);
export const PaymentEnums = z.enum([
  "cash",
  "cheque",
  "card",
  "e-wallet",
  "bank-transfer",
  "bank-deposit",
  "other",
]);
