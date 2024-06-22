"use server";

import axios from "axios";
import { z } from "zod";
import { actionClient } from "@/lib/safe-action";

const VALID_POST_URL =
  /^(https:\/\/www\.threads\.net\/(@[\w.-]+\/post|t)\/[A-Za-z0-9_-]+)(\/\?[\w=&-]+)?$/;

const VALID_USERNAME =
  /^@?[a-zA-Z0-9](?!.*\.\.)(?!.*\.$)[\w.]{0,28}[a-zA-Z0-9]$/;

// This schema is used to validate input from client.
const schema = z.object({
  usernameOrURL: z.union([
    z
      .string({
        required_error: "Please enter an username.",
      })
      .regex(VALID_USERNAME, {
        message: "Enter a valid username.",
      }),
    z
      .string({
        required_error: "Please enter an url.",
      })
      .regex(VALID_POST_URL, {
        message: "Please enter a valid threads post link.",
      }),
  ]),
  type: z.union([z.literal("getThreads"), z.literal("getUserProfile")]),
});

export const fetchMedia = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { usernameOrURL, type } }) => {
    const BASE_URL = process.env.THREADS_API_URL;
    const isProfile = type === "getUserProfile";
    const endpoint = isProfile ? "user-info" : "post-info";
    const queryKey = isProfile ? "username" : "url";
    const requestUrl = `${BASE_URL}/${endpoint}?${queryKey}=${usernameOrURL}`;

    const response = await axios.get(requestUrl);

    if (response.status === 200) {
      return {
        success: response.status === 200,
        data: response.data,
      };
    }

    return {
      success: false,
      data: response.data ?? null,
    };
  });
