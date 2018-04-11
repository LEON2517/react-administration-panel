#!/bin/bash
set -e
echo "eslint linting"
TEMPFILE="eslint-precommit$(date +%s)"
touch /tmp/$TEMPFILE
npm run lint:fix
find . -newer /tmp/$TEMPFILE -print0 | xargs -0 git add
rm -rf /tmp/$TEMPFILE

echo "testing"
yarn test:cover
