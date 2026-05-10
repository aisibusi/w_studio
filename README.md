# w studio

A quiet luxury jewelry storefront for w studio collections.

The project uses a React storefront and a separate Express admin panel. Product data, inquiries, and uploaded product images are stored on disk so the app can run with a Railway Volume instead of Firebase.

## Project Overview

- Public storefront at `/`
- Separate admin page at `/admin`
- Video-led homepage with image fallback
- Private archive style product collection
- Product detail modal with description, price, and inquiry action
- Customer inquiry form for contact details and questions
- Admin product create, edit, delete, and image upload
- Admin homepage hero image upload, category cover image upload, and category order controls
- USD pricing and `Inquire for pricing` support
- File-based storage through `DATA_DIR`
- Railway Volume ready

## Tech Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS
- Express
- Motion
- Lucide React

## Local Development

Install dependencies:

```powershell
npm.cmd install
```

Start the local site:

```powershell
npm.cmd run dev
```

Open these URLs:

```text
Storefront: http://127.0.0.1:3000
Admin:      http://127.0.0.1:3000/admin
```

Build for production:

```powershell
npm.cmd run build
```

Type-check the project:

```powershell
npm.cmd run lint
```

Start the production server after building:

```powershell
npm.cmd start
```

## Admin

The admin page is separate from the storefront:

```text
/admin
```

Default local password:

```text
666
```

For production, set the password with:

```text
ADMIN_PASSWORD=666
```

Also set a long session secret in Railway:

```text
SESSION_SECRET=replace-this-with-a-long-random-string
```

## Admin Image Upload Guidance

The admin editor includes a product image upload area. Before uploading, the editor shows the selected collection and explains where the image will appear after the product is saved:

- the public collection product archive grid
- the product card thumbnail
- the product detail modal
- the inquiry drawer product context
- the admin archive thumbnail

The upload success message also repeats the exact selected collection name, so the admin user knows which public collection page will display the uploaded product image.

## Storage

The app does not use Firebase.

Local data is written to:

```text
data/
```

The server creates these automatically:

```text
products.json
inquiries.json
uploads/
```

Uploaded product images are served from:

```text
/uploads
```

When an admin replaces or deletes a product image, the server attempts to clean unused uploaded image files from the storage folder. Images that are still used by another product are kept.

## Environment Variables

Copy `.env.example` if you need local environment overrides.

```text
PORT=3000
DATA_DIR="./data"
ADMIN_PASSWORD="666"
SESSION_SECRET="change-this-before-production"
```

For Railway, use the mounted Volume path:

```text
DATA_DIR=/data
```

## Railway Deployment

1. Push this project to GitHub.
2. Create a Railway project from the GitHub repository.
3. Add a Railway Volume.
4. Mount the Volume at:

```text
/data
```

5. Add these Railway variables:

```text
DATA_DIR=/data
ADMIN_PASSWORD=666
SESSION_SECRET=replace-this-with-a-long-random-string
```

6. Use these Railway commands:

```text
Build Command: npm run build
Start Command: npm start
```

Railway will run the Express server, serve the built React site, and keep products, inquiries, and uploaded images inside the mounted Volume.

## Important Notes

- Do not commit `data/`.
- Do not use `DATA_DIR=./data` on Railway.
- Use `DATA_DIR=/data` when the Railway Volume is mounted at `/data`.
- Do not upload local database files to GitHub.
- Large source videos should stay out of git unless they are final web assets inside `public/`.
- The deployed site and admin panel are served by the same Express server.

## Git Push

This project uses local git metadata stored in `.codex-git`.

Use this push command from PowerShell:

```powershell
cd "C:\Users\32493\OneDrive\Desktop\w-studio-jewelry"
git --git-dir=.codex-git --work-tree=. push https://github.com/aisibusi/w_studio.git main:main
```

## Admin homepage controls

The `/admin` dashboard now includes a `Homepage` tab.

From this tab, the site owner can:

- Upload the main homepage hero photo. This image appears at the very top of `/`, behind the “Formed by Nature. Refined by Time.” headline.
- Upload or reset each collection/category cover image. These images appear on the homepage collection cards.
- Drag collection/category rows to change the order of the homepage collection cards.
- Use the up/down buttons as an alternative to drag-and-drop.
- Click `Save Homepage Changes` to publish the updated homepage photo, category cover images, and collection order.

These settings are stored in `site-settings.json` under `DATA_DIR`, so Railway production should keep `DATA_DIR=/data` and mount a Railway Volume at `/data`.
