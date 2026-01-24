"use server";
import axios from "axios";
import { auth } from "@clerk/nextjs/server";
// import { getSubscriptionStatus } from "./stripe-actions";
// import { db } from "@/server/db";
import {
  FREE_ACCOUNTS_PER_USER,
  PRO_ACCOUNTS_PER_USER,
} from "@/constants/constants";

// Temporary DB stubs; replace with real implementation
const db = {
  user: {
    findUnique: async (_: {
      where: { id: string };
      select: { role: true };
    }) => ({ role: "user" }),
  },
  account: { count: async (_: { where: { userId: string } }) => 0 },
};

// Temporary stub until stripe-actions is implemented
const getSubscriptionStatus = async (): Promise<boolean> => {
  return false;
};

export const getAurinkoAuthorizationUrl = async (
  serviceType: "Google" | "Office365",
) => {
  const { userId } = await auth();
  if (!userId) throw new Error("User not found");

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: { role: true },
  });

  if (!user) throw new Error("User not found");

  const isSubscribed = await getSubscriptionStatus();

  const accounts = await db.account.count({
    where: { userId },
  });

  if (user.role === "user") {
    if (isSubscribed) {
      if (accounts >= PRO_ACCOUNTS_PER_USER) {
        throw new Error(
          "You have reached the maximum number of accounts for your subscription",
        );
      }
    } else {
      if (accounts >= FREE_ACCOUNTS_PER_USER) {
        throw new Error(
          "You have reached the maximum number of accounts for your subscription",
        );
      }
    }
  }

  const params = new URLSearchParams({
    clientId: process.env.AURINKO_CLIENT_ID as string,
    serviceType,
    scopes: "Mail.Read Mail.ReadWrite Mail.Send Mail.Drafts Mail.All",
    responseType: "code",
    returnUrl: `${process.env.NEXT_PUBLIC_URL}/api/aurinko/callback`,
  });

  return `https://api.aurinko.io/v1/auth/authorize?${params.toString()}`;
};

export const getAurinkoToken = async (code: string) => {
  try {
    const response = await axios.post(
      `https://api.aurinko.io/v1/auth/token/${code}`,
      {},
      {
        auth: {
          username: process.env.AURINKO_CLIENT_ID as string,
          password: process.env.AURINKO_CLIENT_SECRET as string,
        },
      },
    );

    return response.data as {
      accountId: number;
      accessToken: string;
      userId: string;
      userSession: string;
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching Aurinko token:", error.response?.data);
    } else {
      console.error("Unexpected error fetching Aurinko token:", error);
    }
  }
};

export const getAccountDetails = async (accessToken: string) => {
  try {
    const response = await axios.get("https://api.aurinko.io/v1/account", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data as {
      email: string;
      name: string;
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching account details:", error.response?.data);
    } else {
      console.error("Unexpected error fetching account details:", error);
    }
    throw error;
  }
  // TODO: Replace with real subscription status check
  const getSubscriptionStatus = async (): Promise<boolean> => {
    return false;
  };
};

export const getEmailDetails = async (
  accessToken: string,
  emailId: string,
): Promise<Record<string, unknown>> => {
  try {
    const response = await axios.get<Record<string, unknown>>(
      `https://api.aurinko.io/v1/email/messages/${emailId}`,
      {
        params: {
          loadInlines: true,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching email details:", error.response?.data);
    } else {
      console.error("Unexpected error fetching email details:", error);
    }
    throw error;
  }
};
