import config from "../vercel.json";

describe("Vercel Git deployment", () => {
  it("publishes the Vite client output with SPA fallback", () => {
    expect(config.framework).toBe("vite");
    expect(config.buildCommand).toBe("npm run build");
    expect(config.outputDirectory).toBe("dist/client");
    expect(config.rewrites).toContainEqual({
      source: "/(.*)",
      destination: "/index.html"
    });
  });
});
