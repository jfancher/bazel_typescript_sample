# Project Guide

This file documents the complete creation of this repository, starting from an empty directory.

## Workspace Setup

```console
$ cat "bazel-*" > .gitignore            # ignore bazel ouput symlinks
$ cat "node_modules" >> .gitignore      # ignore node dependencies
$ touch BUILD                           # will be filled in later, but must exist
$ echo "{}" > package.json              # same; will be init by yarn but needed to bootstrap
```
Create [`WORKSPACE`](WORKSPACE). See that file for more information.

## Project Setup

Now, set up the basic Node project:

```console
$ bazel run @nodejs//:yarn -- init -y
```

Add infrastructure dependencies. These are not project-specific and are needed for any instance of
the bazel/typescript rules as noted.
```console
$ # needed for ts_library, for basic typescript compilation support
$ bazel run @nodejs//:yarn -- add --dev @bazel/typescript typescript
$ # needed for jasmine_node_test
$ bazel run @nodejs//:yarn -- add --dev jasmine @types/jasmine
$ # needed for source maps in node binaries; I'm not sure if this should be a dep or dev dep
$ bazel run @nodejs//:yarn -- add source-map-support
```

Add project dependencies. These are only needed because they are used by the sample project code.
```
$ bazel run @nodejs//:yarn -- add lodash @types/lodash express @types/express
```

Create [`tsconfig.json`](tsconfig.json). See that file for more information.

Expose `tsconfig.json` in [`BUILD`](BUILD). See that file for more information.

## Library

Finally, code can be written. First, there's a small dummy library intended to be consumed either
in a node app _or_ in the browser as part of a client bundle.

See:
- [`src/lib/add.ts`](src/lib/add.ts) for the main library implementation
- [`src/lib/add.spec.ts`](src/lib/add.spec.ts) for a test suite of the library
- [`src/lib/BUILD`](src/lib/BUILD) for the library and test rules

## Application

Next, an Express server to expose the above library as an endpoint.

See:
- [`src/app/main.ts`](src/app/main.ts) for the entry point implementation
- [`src/app/BUILD`](src/app/BUILD) for the library and binary rules

## Client

Finally, the same library packaged for browser consumption.

See:
- [`src/client/BUILD`](src/client/BUILD) for the client library rule
