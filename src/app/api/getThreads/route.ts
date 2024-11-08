export const maxDuration = 60; // This function can run for a maximum of 5 seconds
import { getAllMedia } from "@/lib/threads";

export async function GET(request: Request) {
  const origin = request.headers.get("host");
  const allowedDomains = ["localhost:3000", "instathreadsdown.com"];

  if (!origin || !allowedDomains.includes(origin)) {
    return new Response("Not Allowed", {
      status: 403,
    });
  }

  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return new Response("Threads URL missing.", {
      status: 403,
    });
  }

  const postData = await getAllMedia(url);
  if (!postData) {
    return new Response("Something went wrong with the request.", {
      status: 404,
    });
  }

  return new Response(JSON.stringify(postData), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}
