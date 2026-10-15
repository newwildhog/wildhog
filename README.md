# Wild Hog Vineyard website

A plain static site: HTML, one stylesheet, one small script, no build step.
Edit the `.html` files directly and upload the folder.

## Files

| File | What it is |
|---|---|
| `index.html` | Home page |
| `about.html` | About the vineyard, winery and winemaker |
| `current-releases.html` | Wines for sale now, mixed case offer, ordering contact |
| `past-releases.html` | Archive of past wines, grouped by vintage |
| `photos.html` | Photo gallery with a full-screen viewer |
| `videos.html` | YouTube embeds |
| `404.html` | Shown for broken links (GitHub Pages and Netlify pick it up automatically) |
| `css/style.css` | All styling. Colors are at the top in `:root`. |
| `js/site.js` | Mobile menu, photo viewer, past-releases filter |
| `images/` | Site images. `images/gallery/` holds full-size photos, `images/gallery/thumbs/` the 640x480 thumbnails |
| `fort-ross-seaview-ava-map.pdf` | AVA map linked from the About page |
| `aboutwildhog.html`, `currentreleases.html`, `pastreleases.html`, `albumsWH.html` | Tiny redirect stubs so old bookmarks still work. Leave them alone. |
| `_redirects` | Same redirects for Netlify (proper 301s) |
| `sitemap.xml`, `robots.txt` | For search engines. Update the domain in both if it changes. |

## Common edits

**Add or remove a wine.** In `current-releases.html`, copy one `<article class="wine">` block and change the
vintage, name, region, notes and the stats pills. When a wine sells out, move the block into
`past-releases.html` under the matching `<section class="year-group" id="vYYYY">`. If that year does not exist yet,
copy a whole year section, change the id and heading, and add a matching `<li><a href="#vYYYY">YYYY</a></li>` to the
year list at the top of the page.

**Change the seasonal note.** The highlighted "Welcome to Winter 2023" box at the top of `current-releases.html`.

**Add a photo.** Put the full-size JPEG (1600px on the long edge is plenty) in `images/gallery/` and a 640x480
crop in `images/gallery/thumbs/` with the same file name. Copy one `<li>` in `photos.html` and update the file name
and caption. With ImageMagick installed:

```
convert photo.jpg -auto-orient -strip -resize '1600x1600>' -quality 82 images/gallery/photo.jpg
convert photo.jpg -auto-orient -strip -thumbnail '640x480^' -gravity center -extent 640x480 -quality 80 images/gallery/thumbs/photo.jpg
```

**Add a video.** Copy an `<article class="video">` block in `videos.html` and replace the YouTube id in the
iframe `src` (the part after `/embed/`).

**Change colors or fonts.** Top of `css/style.css`. Fonts load from Google Fonts; delete that `<link>` from the
page heads to use system fonts only.

## Deploying

### GitHub Pages (free, custom domain supported)

1. Create a repository (for example `wildhogvineyard`) and push this folder as its contents.
2. Repository Settings, Pages, Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
3. For the custom domain, add a `CNAME` file containing `wildhogvineyard.com`, then at the registrar
   point an `A` record at GitHub's Pages IPs and `www` as a `CNAME` to `<user>.github.io`.
   Tick "Enforce HTTPS" once the certificate is issued.

`.nojekyll` is already present so GitHub serves the files as-is. The old-URL redirects work through the
stub pages (`meta refresh`), since GitHub Pages cannot do server redirects.

### Netlify (free, drag and drop)

1. Log in, "Add new site", "Deploy manually", and drop this folder on the page. Done.
2. Or connect the GitHub repository for automatic deploys on every push. Build command: none. Publish directory: `/`.
3. Domain settings: add `wildhogvineyard.com` and follow the DNS instructions. HTTPS is automatic.

`_redirects` gives proper 301 redirects for the old URLs on Netlify.

### Cloudflare Pages or any plain web host

Upload the folder as-is. Nothing needs to run on the server.

## Not included from the old site

The old `images/` folder held about 630 MB of raw video (`.MOV`, `.mp4`, `.mpg`) that was never linked from any
page. The same videos are on YouTube and embedded on `videos.html`, so the raw files were left out. Keep a backup
of the old folder if you want the originals.
