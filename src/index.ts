import { Elysia } from "elysia";
import cors from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { registerFolderController } from "./infrastructure/http/folder.controller";
import { registerItemController } from "./infrastructure/http/item.controller";

const port = Number(Bun.env.PORT ?? process.env.PORT ?? 3000);
const app = new Elysia();
app.use(cors());
app.use(swagger({ path: "/swagger" }));
registerFolderController(app);
registerItemController(app);
app.get("/assets/rendy.jpeg", () => {
  const file = Bun.file(new URL("./public/rendy.jpeg", import.meta.url))
  return new Response(file, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=86400"
    }
  })
})
app.get("/assets/elysia_v.webp", () => {
  const file = Bun.file(new URL("./public/elysia_v.webp", import.meta.url))
  return new Response(file, {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=86400"
    }
  })
})
app.get("/assets/elysia.png", () => {
  const file = Bun.file(new URL("./public/elysia.png", import.meta.url))
  return new Response(file, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400"
    }
  })
})
app.get("/", () => {
  const html = Bun.file(new URL("./public/index.html", import.meta.url))
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } })
}).listen(port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
