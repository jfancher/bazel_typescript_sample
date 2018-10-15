####
# Declare workspace name.
#
# This is used as the root for absolute module imports.
# e.g.: import { x } from 'bazel_typescript_sample/src/lib';
# If we were following official best practice this would be a full reverse-domain string like
# com_github_jfancher_bazel_typescript_sample, but that's just too long.
#
# ref: https://docs.bazel.build/versions/master/be/functions.html#workspace
####
workspace(name = "bazel_typescript_sample")

####
# Pull in rules_typescript. Standard Bazel stuff.
####
load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
http_archive(
    name = "build_bazel_rules_typescript",
    sha256 = "2879fbd7168ba5d17db22bc2f585c0d1d3a82dd5e6f8af118e8b2f74d290024e",
    url = "https://github.com/bazelbuild/rules_typescript/archive/0.20.2.zip",
    strip_prefix = "rules_typescript-0.20.2",
)

####
# Pull in rules_typescript dependencies.
# This adds additional repositories needed by rules_typescript, notably rules_nodejs.
#
# ref: https://github.com/bazelbuild/rules_typescript/blob/0.20.2/package.bzl#L29
####
load("@build_bazel_rules_typescript//:package.bzl", "rules_typescript_dependencies")
rules_typescript_dependencies()

####
# Pull in rules_nodejs dependencies.
# Same as above, except for rules_nodejs. Also sets up node project environment.
#
# For this form of the rule, both BUILD and package.json must exist, although they can be blank and
# '{}' at this point, respectively. It _is_ possible to completely bootstrap from a non-existent
# package.json, but that requires more steps -- a 0-arg call to node_repositories(), setup using
# 'bazel run @nodejs//:bin/yarn', and _then_ this call.
#
# After this call we can run yarn as 'bazel run @nodejs//:yarn'
#
# ref: https://github.com/bazelbuild/rules_nodejs/blob/0.15.0/internal/node/node_repositories.bzl#L420
####
load("@build_bazel_rules_nodejs//:defs.bzl", "node_repositories")
node_repositories(package_json = ["//:package.json"])

####
# Set up typescript workspace.
# This makes typescript work. Unlike the call above and the one below, I don't think this does
# anything project-specific, but it needs @nodejs// so it must come at this point. Kind of awkward.
#
# https://github.com/bazelbuild/rules_typescript/blob/0.20.2/internal/ts_repositories.bzl#L20
####
load("@build_bazel_rules_typescript//:defs.bzl", "ts_setup_workspace")
ts_setup_workspace()

####
# Set up dependency management.
#
# This exposes dependencies from package.json under @npm//...
# We can run binaries provided by deps, and, more importantly, make them available as deps to
# targets we write. This won't work until we actually create yarn.lock by adding dependencies.
#
# ref: https://github.com/bazelbuild/rules_nodejs/blob/0.15.0/internal/npm_install/npm_install.bzl#L140
####
load("@build_bazel_rules_nodejs//:defs.bzl", "yarn_install")
yarn_install(
    name = "npm",
    package_json = "//:package.json",
    yarn_lock = "//:yarn.lock",
)

####
# Add Go support.
#
# This isn't needed for core bazel/typescript support, but it is needed for ts_devserver, because
# the server binary just happens to be written in Go. I couldn't ultimately make ts_devserver work,
# so this is not really needed at all, but keeping it in case the situation changes.
####
load("@io_bazel_rules_go//go:def.bzl", "go_rules_dependencies", "go_register_toolchains")
go_rules_dependencies()
go_register_toolchains()
