import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { emailOTP } from "better-auth/plugins";
import { Resend } from "resend";

const prisma = new PrismaClient();
// const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: false, // We're using OTP only, not password
  },
  // Configure verification model mapping
  // verification: {
  //   modelName: "verification", // Match your Prisma model name (lowercase)
  // },

  user: {
    fields: {
      name: "fullName",
    },
    additionalFields: {
      username: {
        type: "string",
        required: false,
      },
      bio: {
        type: "string",
        required: false,
      },
      avatarUrl: {
        type: "string",
        required: false,
        fieldName: "avatarUrl",
      },
    },
  },

  plugins: [
    emailOTP({
      otpLength: 6,
      expiresIn: 60, // 60 seconds as requested
      allowedAttempts: 3, // 3 attempts as requested
      async sendVerificationOTP({ email, otp, type }) {
        // Development mode: just log to console
        // if (!resend) {
        console.log("=================================");
        console.log(`📧 OTP Email for ${email}`);
        console.log(`🔢 Code: ${otp}`);
        console.log(`⏰ Expires in: 60 seconds`);
        console.log(`📝 Type: ${type}`);
        console.log("=================================");
        return;
        // }

        // Production mode: send via Resend
        // await resend.emails.send({
        //   from: "onboarding@resend.dev", // Replace with your verified domain
        //   to: email,
        //   subject: "Your login code",
        //   html: `
        //     <h2>Your verification code</h2>
        //     <p>Your code is: <strong>${otp}</strong></p>
        //     <p>This code will expire in 60 seconds.</p>
        //     <p>If you didn't request this code, please ignore this email.</p>
        //   `,
        // });
      },
    }),
  ],

  session: {
    expiresIn: 60 * 60 * 24 * 30,
    updateAge: 60 * 60 * 24,
  },

  // Rate limiting configuration
  rateLimit: {
    window: 300,
    max: 3,
  },
});
