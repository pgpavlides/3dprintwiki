@echo off
echo *** ROLLUP ISSUE FIX WITH WASM OVERRIDE ***
echo.
echo This will replace your package.json with a version using the WebAssembly version of Rollup
echo and clean your installation to fix the module not found error.
echo.
echo Step 1: Backing up your current package.json...
copy package.json package.json.backup
echo.
echo Step 2: Replacing package.json with WebAssembly version...
copy new-package.json package.json
echo.
echo Step 3: Removing node_modules and package-lock.json...
rmdir /s /q node_modules
del /f package-lock.json
echo.
echo Step 4: Installing the WebAssembly version of Rollup...
npm install @rollup/wasm-node
echo.
echo Step 5: Reinstalling all dependencies...
npm install
echo.
echo Done! Now try running your application with: npm run dev
echo.
pause
