const htmlRequest = (request) =>
  request.method === "GET" &&
  (request.headers.get("accept") ?? "").includes("text/html");

export default {
  async fetch(request, environment) {
    const response = await environment.ASSETS.fetch(request);

    if (response.status !== 404 || !htmlRequest(request)) {
      return response;
    }

    const fallbackUrl = new URL("/index.html", request.url);
    return environment.ASSETS.fetch(new Request(fallbackUrl, request));
  }
};
