load("@build_bazel_rules_nodejs//:defs.bzl", "rollup_bundle")

package(default_visibility = ["//visibility:public"])

####
# Would be nice to do this, but it's basically blocked by this issue:
# https://github.com/bazelbuild/rules_typescript/issues/103
#
# A lot of additional custom work would be needed to make this useful.
####

# load("@build_bazel_rules_typescript//:defs.bzl", "ts_devserver")
# ts_devserver(
#     name = "dev",
#     deps = ["//src/lib"],
#     serving_path = "/bundle.js",
# )

####
# //src/app:bundle
#
# This creates bazel-bin/src/app/bundle.min.js (among others).
# This is loadable in a browser and exposes a global named 'bundle'.
# Our library can then be called with bundle.add2(..)
#
# Note that this requires transitive deps to be listed; for some reason, it can't figure them out
# on its own like nodejs_binary can.
####

rollup_bundle(
    name = "bundle",
    entry_point = "bazel_typescript_sample/src/lib/add.js",
    deps = [
        "//src/lib",
        "@npm//lodash",
    ],
)
