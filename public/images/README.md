# Site images (static)

Paths are set in `src/config/site.ts`.

| File | Used for |
| --- | --- |
| `hero-dresses.webp` | Home hero (transparent background) |
| `about/about-banner.jpg` | About teaser + /about banner |
| `about/threads.jpg` | About teaser + /about "Our Craft" |
| `about/workshop.jpg` | /about "Supporting Emerging Brands" |
| `qr-join-group.svg` | QR to the Facebook group (generated from `LINKS.joinGroup`) |

Product images are NOT stored here: upload them in Admin → Products (saved in MongoDB, served from `/media/:id`).
