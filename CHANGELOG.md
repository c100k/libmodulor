# CHANGELOG

## v0.5.0 (unreleased)

**Misc**

- Added the Tutorial code in the repo at `examples/libmodulor-tuto` and added a new "Expose a rn Target" step (https://github.com/c100k/libmodulor/pull/11)

## v0.4.0 (2025-01-31)

**feat(target): introduce react-native-pure**

To help with the creation of specific targets, we've added a new one : `react-native-pure`. It's as simple as `react-web-pure`, with no specific UI style. It's a good starting point to take inspiration to create your own GUI target, with your own style.

**Misc**

- Introduced Guides in docs for more advanced scenarios (e.g. Create a target) (https://github.com/c100k/libmodulor/pull/10)
- Improved the docs for a better readability (https://github.com/c100k/libmodulor/pull/10)

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
