#!/usr/bin/env bash

if [[ -n $(git status --porcelain) ]]; then
	echo 'Working directory is not clean'
	git status --short
	exit 1
fi

GIT_BRANCH=$(git rev-parse --symbolic-full-name --abbrev-ref HEAD)
GIT_COMMIT=$(git rev-parse HEAD)
pnpm exec netlifydd deploy -m "${GIT_BRANCH} ${GIT_COMMIT}" dist/
