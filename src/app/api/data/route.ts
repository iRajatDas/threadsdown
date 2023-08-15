export async function GET(request: Request) {
  const origin = request.headers.get("host");
  const allowedDomains = ["localhost:3000", "instathreadsdown.com"];

  // Check if the request's origin is in the list of allowed domains
  if (origin && allowedDomains.includes(origin)) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    const res = await fetch(`http://165.232.181.95:3001/scrape?url=${url}`);
    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } else {
    // If the domain is not allowed, respond with a "Not Allowed" message
    return new Response("Not Allowed", {
      status: 403, // Forbidden status
    });
  }
}
