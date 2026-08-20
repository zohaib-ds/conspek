# CONSPEK Industrial Showcase — Fixed Build

This version removes the template-literal syntax that was causing the esbuild errors.

## Run

```bash
npm install
npm run dev
```

## Videos

Put these in `public/videos/`:

- hero-01.mp4
- hero-02.mp4
- hero-03.mp4
- hero-04.mp4
- feature-process.mp4
- video-01.mp4
- video-02.mp4
- video-03.mp4
- video-04.mp4

The four alternating sections are:

VIDEO 01 | TEXT
TEXT | VIDEO 02
VIDEO 03 | TEXT
TEXT | VIDEO 04

Poster images can be put in `public/media/` using the matching names:
hero-01.jpg ... hero-04.jpg, feature-process.jpg, video-01.jpg ... video-04.jpg.

If a poster is missing, the dark background remains visible until the video loads.
