import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const uploadDir = path.join(root, 'discloud-upload');
const zipPath = path.join(root, 'yellow-rose-discloud.zip');

console.log('→ Build de produção...');
execSync('npm run build', { cwd: root, stdio: 'inherit' });

console.log('→ Montando pacote Discloud...');
rmSync(uploadDir, { recursive: true, force: true });
mkdirSync(path.join(uploadDir, 'public'), { recursive: true });

cpSync(path.join(root, 'dist'), path.join(uploadDir, 'public'), { recursive: true });
cpSync(path.join(root, 'discloud.config'), path.join(uploadDir, 'discloud.config'));

writeFileSync(
  path.join(uploadDir, 'server.js'),
  `import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 8080;

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.listen(PORT, '0.0.0.0', () => {
  console.log(\`Yellow Rose online em http://0.0.0.0:\${PORT}\`);
});
`,
);

writeFileSync(
  path.join(uploadDir, 'package.json'),
  `${JSON.stringify(
    {
      name: 'yellow-rose',
      version: '1.0.0',
      type: 'module',
      private: true,
      scripts: { start: 'node server.js' },
      dependencies: { express: '^4.21.2' },
    },
    null,
    2,
  )}\n`,
);

rmSync(zipPath, { force: true });

if (process.platform === 'win32') {
  execSync(
    `powershell -NoProfile -Command "Compress-Archive -Path '${uploadDir}\\*' -DestinationPath '${zipPath}' -Force"`,
    { stdio: 'inherit' },
  );
} else {
  execSync(`cd "${uploadDir}" && zip -r "${zipPath}" .`, { stdio: 'inherit' });
}

console.log(`\n✓ Pronto: ${zipPath}`);
console.log('  Faça upload deste .zip no painel da Discloud.');
