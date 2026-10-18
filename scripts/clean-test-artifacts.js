// Cross-platform posttest cleanup (replaces the old `rm -rf` one-liner, which fails on Windows).
// Removes Playwright MCP screenshots/logs and stray root-level PNGs in this repo.
const fs = require('fs');
const path = require('path');

function clean(dir) {
  if (!fs.existsSync(dir)) return;
  fs.rmSync(path.join(dir, '.playwright-mcp'), { recursive: true, force: true });
  for (const f of fs.readdirSync(dir)) {
    if (f.toLowerCase().endsWith('.png')) fs.rmSync(path.join(dir, f), { force: true });
  }
}

clean(process.cwd());
