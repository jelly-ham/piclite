# PicLite

Private, browser-based image and PDF converter. Files are processed on your
own device and never uploaded to a server — no account, no queue, no copy left
behind.

Live site: [piclite.net](https://piclite.net)

## Features

- **Convert** HEIC/HEIF, JPG, PNG, WebP, AVIF, BMP and PDF to JPG, PNG, WebP or PDF
- **Compress** JPG and WebP toward a target file size with automatic quality search
- **Batch** processing with a single ZIP download for multiple results
- **Private by design**: all decoding and encoding runs locally in the browser
- **PWA**: installable and works offline
- **12 languages** with full hreflang support, dark mode included

Built with Next.js (via [vinext](https://github.com/cloudflare/vinext)) and
React, deployed as a Cloudflare Worker. HEIC decoding by
[heic-to](https://www.npmjs.com/package/heic-to), PDF rendering by
[pdf.js](https://mozilla.github.io/pdf.js/), PDF writing by
[jsPDF](https://github.com/parallax/jsPDF), archives by
[JSZip](https://stuk.github.io/jszip/).

## Develop

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

## Test and build

```bash
npm run lint   # ESLint
npm test       # production build + rendered-HTML regression tests
npm run build  # verify the production build
```

## Deploy

The site deploys to Cloudflare Workers via the GitHub Actions workflow in
`.github/workflows/` on push to `main`. Manual deploy:
`npm run deploy:cloudflare` with `CLOUDFLARE_API_TOKEN` set in the environment.

## License

[MIT](LICENSE)
