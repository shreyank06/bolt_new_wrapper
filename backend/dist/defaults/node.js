"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseprompt = void 0;
exports.baseprompt = "# Project Files\n\nThe following is a list of all project files and their complete contents that are currently visible and accessible to you.\n\nindex.js:\n```\n// run `node index.js` in the terminal\n\nconsole.log(`Hello Node.js v${process.versions.node}!`);\n\n```\n\npackage.json:\n```\n{\n  \"name\": \"node-starter\",\n  \"private\": true,\n  \"scripts\": {\n    \"test\": \"echo \\\"Error: no test specified\\\" && exit 1\"\n  }\n}\n\n```\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n  - .bolt/config.json";
