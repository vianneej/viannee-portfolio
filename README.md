# Viannee portfolio

A lavender and pink portfolio for showcasing Viannee's work.

## Run locally

This is a dependency-free static site. Open `index.html` in a browser, or serve the folder with any static server:

```bash
npx serve .
```

## Deploy on Vercel

1. Push this repository to GitHub.
2. In [Vercel](https://vercel.com), choose **Add New → Project** and import the repository.
3. Leave the framework preset as **Other**, with no build command and `.` as the output directory.
4. Select **Deploy**. Vercel will host the static files for free.

### Add a custom domain

You will need to purchase a domain such as `viannee.dev` from a domain registrar; Vercel's free hosting does not include the domain registration. Then:

1. Open the Vercel project and go to **Settings → Domains**.
2. Add your domain (for example, `viannee.dev`).
3. Copy the DNS records Vercel gives you into your registrar's DNS settings.
4. Wait for DNS verification. Vercel automatically provisions HTTPS once it is verified.

### Add your photo

Create an `assets` folder and add your portrait as `assets/profile.jpg`. The `identity.json` card is already wired to display it. You can use `.png` or `.webp` instead, but update the `src` in `index.html` to match.

### Link your projects

Each project preview is an ordinary link in `index.html`. Replace the four placeholder URLs with either:

- A live deployed project, such as `https://my-project.vercel.app`
- Its GitHub repository, such as `https://github.com/your-name/my-project`

The links are on the four elements with the `project-visual` class. Each project also has separate `source`, `demo`, and `devpost` links in its metadata. They open in a new tab. Replace the placeholder URLs, social links, email address, location, and project copy before launch.

### Add your resume

The uploaded resume is `assets/Viannee_J_Rosa-Arroyo_Resume.pdf`, and the download link is already connected to it.

### Add life and project photos

The life carousel reads its photos and captions from the `lifePhotos` list near the top of `script.js`. The eight uploaded images are already connected; add more entries there whenever you add more files:

```text
{ file: "image1.JPG", title: "building together", alt: "Viannee working with her team" }
```

Put each matching image in `assets/`. The carousel auto-plays every five seconds and includes previous/next and pause/play controls. The `title` value appears as the caption below each photo. Project images can also live in `assets/`; the current project cards use illustrated CSS mockups.