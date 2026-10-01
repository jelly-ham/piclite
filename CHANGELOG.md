# Changelog

All notable changes to PicLite are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-10-01

First stable release.

### Added

- Browser-based image and PDF conversion with all decoding and encoding on the
  user's device: HEIC/HEIF (via libheif), JPG, PNG, WebP, AVIF, BMP and PDF in;
  JPG, PNG, WebP or PDF out.
- Target-size compression for JPG and WebP: set a size such as 100 KB or 200 KB
  and the app searches for the highest quality that stays within it.
- Batch conversion with a single ZIP download, and images to PDF plus PDF to
  images with page-level rendering.
- Twelve locales (English, Simplified and Traditional Chinese, Japanese, Korean,
  Spanish, Portuguese, German, French, Russian, Arabic and Hindi) with hreflang
  alternates, localized guides and FAQs.
- Installable PWA that works offline.
- Homepage and tool-page content covering limitations honestly, including
  metadata, animation and OCR boundaries.

### Security

- No upload path: files never leave the browser, and the app requires no
  account. Verified by the audit that removed all payment links.

[1.0.0]: https://github.com/jelly-ham/piclite/releases/tag/v1.0.0
