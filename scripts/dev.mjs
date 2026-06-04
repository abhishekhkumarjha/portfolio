import { spawn } from "node:child_process";

const commands = [
  { name: "server", script: "dev:server" },
  { name: "client", script: "dev:client" },
];

const children = commands.map(({ name, script }) => {
  const child = spawn(`npm run ${script}`, {
    env: { ...process.env, API_PORT: process.env.API_PORT || "3001" },
    shell: true,
    stdio: "pipe",
  });

  child.stdout.on("data", (chunk) => process.stdout.write(`[${name}] ${chunk}`));
  child.stderr.on("data", (chunk) => process.stderr.write(`[${name}] ${chunk}`));
  child.on("exit", (code) => {
    if (code && code !== 0) {
      console.error(`[${name}] exited with code ${code}`);
      process.exitCode = code;
    }
  });

  return child;
});

function shutdown() {
  for (const child of children) {
    child.kill();
  }
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
