import { copyFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(".");
const serverSource = resolve(root, "sites/server/index.js");
const serverTarget = resolve(root, "dist/server/index.js");
const hostingSource = resolve(root, ".openai/hosting.json");
const hostingTarget = resolve(root, "dist/.openai/hosting.json");

await mkdir(resolve(root, "dist/server"), { recursive: true });
await mkdir(resolve(root, "dist/.openai"), { recursive: true });
await copyFile(serverSource, serverTarget);
await copyFile(hostingSource, hostingTarget);

console.log("Sites build preparado em dist/server e dist/client.");
