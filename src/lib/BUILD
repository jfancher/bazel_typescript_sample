load("@build_bazel_rules_typescript//:defs.bzl", "ts_library")
load("@build_bazel_rules_nodejs//:defs.bzl", "jasmine_node_test")

package(default_visibility = ["//visibility:public"])

####
# //src/lib:lib
#
# Building this target runs the typescript compiler, creating bazel-bin/src/lib/lib.{js,d.ts}.
# The library is also available as a dependency to other ts_library targets.
####

ts_library(
    name = "lib",
    srcs = glob(["*.ts"], exclude = ["*.spec.ts"]),
    deps = [
        "@npm//@types/lodash",
        "@npm//lodash",
    ],
)

####
# //src/lib:test_lib and //src/lib:test
#
# These targets are, respectively, the test code library and the test runner for it.
# bazel build //src/lib:test_lib compiles the library as above.
# bazel test //src/lib:test runs the tests.
#
# These can/should be combined into a macro, but as far as I'm aware no built-in one exists.
####

ts_library(
    name = "test_lib",
    testonly = True,
    srcs = glob(["*.spec.ts"]),
    deps = [
        ":lib",
        "@npm//@types/jasmine",
        "@npm//jasmine",
    ],
)

jasmine_node_test(
    name = "test",
    deps = [
        ":test_lib",
        "@npm//jasmine",
        "@npm//source-map-support",
    ],
)
