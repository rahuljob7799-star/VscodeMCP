# Angular Karma Coverage Agent

## Description
Runs Angular unit tests with Karma, generates a code coverage report, and opens it in Google Chrome.

## Capabilities
- Executes `ng test` with coverage enabled.
- Waits for Karma to finish.
- Opens the generated HTML coverage report in Chrome.
- Works cross-platform (Windows, macOS, Linux).

## Commands
### Run Coverage and Open in Chrome
```bash
# Ensure dependencies are installed
npm install

# Run Angular tests with coverage enabled
npx ng test --code-coverage --browsers=ChromeHeadless --watch=false

# Open the coverage report in Chrome
# Adjust path if your coverage folder is different
if [[ "$OSTYPE" == "darwin"* ]]; then
    open -a "Google Chrome" coverage/index.html
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    google-chrome coverage/index.html
elif [[ "$OS" == "Windows_NT" ]]; then
    start chrome coverage/index.html
fi