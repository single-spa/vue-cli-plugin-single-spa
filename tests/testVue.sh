#!/bin/bash

i= basename "$PWD"

if [ $1 == 2 ] || [ $1 == 3 ];
then
  ProjectName="test-app-vue$1-$2"

  if [ "$i" != "fixtures" ]; then
    mkdir -p tests/fixtures
    cd tests/fixtures
  fi

  echo "creating vue project"
  npx @vue/cli create $ProjectName --no-git --inlinePreset "{\"useConfigFiles\": true,\"plugins\": {},\"vueVersion\": \"$1\"}" --packageManager=pnpm || ERRCODE=$?

  cd $ProjectName
  echo "installing local vue-cli-plugin-single-spa"
  pnpm install -D ../../.. || ERRCODE=$?
  echo "invoking vue-cli-plugin-single-spa"
  yes | npx @vue/cli invoke single-spa || ERRCODE=$?
  echo "creating vue.config.js"
  echo "module.exports={pluginOptions: {'single-spa': {outputSystemJS: $2}}}" > vue.config.js
  echo "building"
  pnpm build || ERRCODE=$?

  exit $ERRCODE
else
  echo "$1 is no valid Vue Version"
  exit 1  
fi

