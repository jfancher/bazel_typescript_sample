load("@build_bazel_rules_nodejs//:defs.bzl", "nodejs_binary")
load("@build_bazel_rules_typescript//:defs.bzl", "ts_library")

package(default_visibility = ["//visibility:public"])

####
# //src/app:lib
#
# (same as any other ts_library)
####

ts_library(
    name = "lib",
    srcs = glob(["*.ts"]),
    deps = [
        "//src/lib",
        "@npm//@types/express",
        "@npm//@types/node",
        "@npm//express",
    ]
)

####
# //src/app:app
#
# Allows the entry point to be run as 'bazel run //src/app'.
# This starts a webserver that servers an endpoint at http://localhost:1234/add/num
# Note that for some reason deps are put in data (there is no 'deps' attribute).
####

nodejs_binary(
    name = "app",
    data = [
        ":lib",
        "@npm//source-map-support"
    ],
    entry_point = "bazel_typescript_sample/src/app/main.js",
)
