const BASE_URL = "https://austinpoor.com";

const ROUTES = [
  "/",
  "/blog",
  "/projects",
  "/about",
];

export function loader() {
  const data = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(r => "  <url><loc>" + BASE_URL + r + "</loc></url>").join('\n')}
</urlset>
    `.trim();
  return new Response(data, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}