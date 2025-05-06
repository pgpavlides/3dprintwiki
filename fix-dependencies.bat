@echo off
echo Cleaning up npm cache...
npm cache clean --force

echo Removing node_modules directory...
rmdir /s /q node_modules

echo Removing package-lock.json...
del /f package-lock.json

echo Setting npm config to ignore optional dependencies...
npm config set optional false

echo Reinstalling dependencies...
npm install

echo Done! Now try running the project with: npm run dev
