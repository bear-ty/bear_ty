# Tianyu Xiong — Personal Homepage

An English academic homepage for Tianyu Xiong at Nanjing University, with research, education, projects, and honors. Built with HTML, CSS, and Markdown; no build step is required.

## Local preview

Serve the repository over HTTP so the Markdown content can load:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000` in your browser.

## Edit content

- `contents/config.yml`: page title, hero copy, and footer.
- `contents/profile.md`: education, research interests, and contact links.
- `contents/home.md`: biography.
- `contents/research.md`: research cards and publication resources.
- `contents/projects.md`: the featured competition project.
- `contents/awards.md`: awards and scholarships.
- `index.html`: page structure and navigation.
- `static/css/main.css`: responsive layout and visual styling.

The Markdown files support inline HTML for cards and structured content. Unreleased resources use plain “Coming soon” labels; replace them with links when available.

## Palette

The interface uses five colors from [Tailwind’s Slate and Indigo palettes](https://tailwindcss.com/docs/colors): Slate 900 (`#0f172a`), Slate 600 (`#475569`), Indigo 600 (`#4f46e5`), Indigo 100 (`#e0e7ff`), and Slate 50 (`#f8fafc`). Surface and border variations use opacity of these same colors.

## Images

The hero uses `static/assets/img/lake.jpg` (1920 × 1080). Its cover crop and dark overlay are configured in `.top-section`; the mobile breakpoint adjusts the image position. The avatar uses `static/assets/img/me.jpg` (640 × 640), displayed as a circle with `object-fit: cover`.

## Deployment

Publish the repository root through GitHub Pages. All asset and content paths are relative, so the site also works under a project subdirectory.

## Credits and license

Adapted from [Yixin Huang’s personal homepage template](https://github.com/Yixin0313/personal-homepage-template), based on [Sen Li’s academic homepage template](https://github.com/senli1073/senli1073.github.io).

Copyright Yixin Huang, 2025. Licensed under the MIT license; see `LICENSE`.
