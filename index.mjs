export const handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  if (event.requestContext?.http?.method === "OPTIONS") {
    return { statusCode: 200, headers, body: JSON.stringify({ message: "CORS preflight OK" }) };
  }

  try {
    let body = typeof event.body === "string" ? JSON.parse(event.body) : (event.body || {});
    const input = (body.code || body.prompt || "").toString().trim();

    let cups = 1;
    let breakTime = 10;

    if (!input) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          excuse: "No code provided, so technically no bugs were created!",
          coffeeRecommendation: "1 cup",
          breakTimeRecommendation: "10 mins"
        })
      };
    }

    if (input.length > 100) {
      cups = 3;
      breakTime = 30;
    } else if (input.length > 50) {
      cups = 2;
      breakTime = 20;
    }

    const excuse = `The code looks fine, but the server is currently meditating. Please try again after coffee.`;

    return {
