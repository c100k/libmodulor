# CHANGELOG

## v0.3.0 (2025-01-23)

**feat(uc): introduce alternate mounting point**

Added a new property `UcDef.ext.http.mountAlsoAt` to be able to define path aliases. See the comment below to understand why.

```typescript
/**
 * The path on which the use case should also mounted at
 *
 * This is typically used when the mounting point is changed and you want to maintain a "legacy" endpoint for clients having
 * a different release cycle than the server (e.g. a mobile app), who are still calling the old endpoint.
 */
mountAlsoAt?: UCHTTPMountingPoint[];
```

**feat(uc): add id to fields in UCOutputReader**

The `UCOutputReader` automatically builds a fields list based on the `UCDef.io.o` `fields` and `order`. Although being a technical value, it's sometimes useful to get the `id` as a field as well as all the other fields explicitly defined. Hence the addition of `id` to the fields list.

## v0.2.0 (2025-01-20)

It's finally here ! Very first version of the library with all the primitives discussed in the documentation.

Check it out, play with it, break it, have fun !

Note that the code is not available yet on GitHub but it will be very soon.

## v0.1.0 (2025-01-17)

First release with the documentation and a stub entrypoint.
