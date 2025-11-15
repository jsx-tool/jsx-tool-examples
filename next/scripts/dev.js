#!/usr/bin/env node
const { spawn } = require('child_process');

const cyan = '\x1b[36m';
const green = '\x1b[32m';
const dim = '\x1b[2m';
const reset = '\x1b[0m';

spawn('jsx-tool', [], { 
    stdio: 'inherit', 
    shell: true 
});

spawn('next', ['dev', '--turbopack', '--port', '3001'], { 
    stdio: 'inherit', 
    shell: true 
});

console.log(`\n  ${cyan}🔧 JSX Tool${reset}: ${green}http://localhost:3000${reset}`);
console.log(`  ${dim}Your app runs at http://localhost:3001 and is proxied to the above URL${reset}\n`);