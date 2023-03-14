import express from 'express'
import { createServer as createViteServer  } from 'vite'


async function createServer() {
  const app = express()

  // Create Vite server in middleware mode.
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use("*", (req, res, next) => {
    // console.log(req.url, req.method)
    // console.log(req.baseUrl, req.originalUrl)
      res.set('X-Sam-Header', 'text/plain');
      res.set('Feature-Policy', 'battery *');
      res.set('Permissions-Policy', 'battery *');
    // if (req.method == "GET" && req.baseUrl.includes("newVideo")) {
    //   res.set("Cross-Origin-Opener-Policy", "same-origin")
    //   res.set("Cross-Origin-Embedder-Policy", "require-corp")
    //   res.set("Cross-Origin-Resource-Policy", "cross-origin")
    // }
    next()
  })

  // Use vite's connect instance as middleware
  app.use(vite.middlewares)

  app.use('*', async (req, res) => {
    // If `middlewareMode` is `'ssr'`, should serve `index.html` here.
    // If `middlewareMode` is `'html'`, there is no need to serve `index.html`
    // because Vite will do that.
    console.log(req)
  })

  app.listen(6969)
}

createServer()