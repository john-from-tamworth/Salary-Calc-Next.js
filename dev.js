import { spawn } from 'child_process';

const args = process.argv.slice(2);
const sanitizedArgs = [];

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--host') {
    // Rewrite '--host' to '-H'
    sanitizedArgs.push('-H');
  } else {
    sanitizedArgs.push(args[i]);
  }
}

// NextJS expects -p and -H
// Ensure 3000 and 0.0.0.0 are set by default if not already specified by previous args
if (!sanitizedArgs.includes('-p') && !sanitizedArgs.includes('--port')) {
  sanitizedArgs.push('-p', '3000');
}
if (!sanitizedArgs.includes('-H') && !sanitizedArgs.includes('--hostname')) {
  sanitizedArgs.push('-H', '0.0.0.0');
}

console.log('Sanitized dev arguments:', sanitizedArgs);

const child = spawn('npx', ['next', 'dev', ...sanitizedArgs], {
  stdio: 'inherit',
  shell: true,
});

child.on('close', (code) => {
  process.exit(code || 0);
});
