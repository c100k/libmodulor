### Summary

```sh
git log --oneline
```

```sh
7be4e06 (HEAD -> master) feat: add the mcp-server target
0fb3d57 feat: add the cli target
e8a52a6 feat: define wording for humans
3d41f82 feat: persist data in SQLite
d55bc42 feat: add the web target
1af90ea feat: add the server target
dffa202 feat: add the product
8b83e1f test: init app tests
0f99382 feat: add the use case
33ac247 feat: add the app
09909aa chore: init source code
```

That was cool ! In a couple of minutes we have created the foundations of a multi-platform application.

And we have only touched the surface as `libmodulor` has much more to offer.

We have used the "pre-built" targets, but it's totally possible to do the same with a Hono server, a stricli CLI, a Vue.js SPA and so on. All the targets implement generic interfaces provided by `libmodulor`, making the whole thing fully modular.

Coming soon : the Advanced Guide.

If you appreciated this Guide or have any feedback, of all kinds, please feel free to send me a message. I'll be happy to discuss and help.
