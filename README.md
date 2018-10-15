# bazel_typescript_sample

This repository holds a sample application using bazel and typescript, including:
- A simple node library (using node package dependencies)
- A [Jasmine](https://jasmine.github.io/) test for the library
- An [Express](https://expressjs.com/) app that exposes the library as an API
- A minified client distribution of the library

The intention is to serve as a personal reference for standing up similar projects in the future.
The starting point is a [Bazel](https://bazel.build/) installation. All dependencies are downloaded
and managed by Bazel, including Node and Yarn.

See the [guide](GUIDE.md) for a step-by-step breakdown of the sample project.

This was created on `2018-10-14` and has not been verified to be up-to-date beyond that point.

Disclaimer: I am far from an expert in Bazel, Typescript, Node, `rules_nodejs`, `rules_typescript`,
or anything else in this sample. If someone else stumbles upon this, do not consider anything I do
here to be standard or best practice. But maybe it will be useful!
