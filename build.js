const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Create build directory if it doesn't exist
const buildDir = path.join(__dirname, 'build');
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir);
}

// Copy static files to build directory
const staticFiles = ['index.html', 'style.css', 'app.js'];
staticFiles.forEach(file => {
  const srcPath = path.join(__dirname, 'src', 'frontend', file);
  const destPath = path.join(buildDir, file);
  fs.copyFileSync(srcPath, destPath);
});

// Run any additional build commands
exec('npm run build:additional', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error executing additional build commands: ${err.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
