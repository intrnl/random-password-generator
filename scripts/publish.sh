#!/usr/bin/env bash

if [[ -n $(git status --porcelain) ]]; then
	echo 'Working directory is not clean'
	git status --short
	exit 1
fi

GIT_COMMIT=$(git rev-parse HEAD)

rsync -aHAX --delete --exclude=.git --exclude=.nojekyll dist/ deploy/
touch deploy/.nojekyll

pnpm exec minify-html deploy/index.html --output deploy/index.html

git -C deploy/ add .
git -C deploy/ commit -m "deploy: ${GIT_COMMIT}"
git -C deploy/ push
