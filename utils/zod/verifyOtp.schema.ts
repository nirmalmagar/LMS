import { z } from "zod";
import { stringField } from "./common.schema";

export const verifyOtpSchema = z.object({
    otp : stringField('otp', 5 , 5)
})