# Ikey Franco portfolio

Static portfolio site with a locally hosted 2048 World game. Open `index.html` to view the site, or serve this directory with any static HTTP server.

## Deploy on Vercel

1. Import this private GitHub repository into Vercel.
2. Set **Framework Preset** to **Other**.
3. Use the repository root as the root directory. Leave **Build Command** blank and use `.` as the output directory.
4. Deploy. No environment variables are required.

The original `2048world.zip` is excluded from Git because the playable files are already in `projects/2048-world/`. The Slate source ZIP is included because its portfolio button downloads it.
The game's large WAV music loops are stored as browser-ready AAC files so the repository and deployment stay small.
