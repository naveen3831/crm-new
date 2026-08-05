import { existsSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { basename, resolve } from "node:path";

const cacheName = process.argv[2] || ".next";

if (![".next", ".next-dev"].includes(basename(cacheName))) {
  console.error(`Refusing to remove unexpected Next cache directory: ${cacheName}`);
  process.exit(1);
}

const cacheDir = resolve(cacheName);

if (!existsSync(cacheDir)) {
  process.exit(0);
}

if (process.platform === "win32") {
  spawnSync("cmd.exe", ["/c", "rmdir", "/s", "/q", cacheDir], {
    cwd: process.cwd(),
    stdio: "ignore"
  });
  process.exit(0);
}

rmSync(cacheDir, { recursive: true, force: true });

