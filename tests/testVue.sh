#!/bin/bash

i= basename "$PWD"

if [ $1 == 2 ] || [ $1 == 3 ];
then
  ProjectName="test-app-vue$1-$2"

  if [ "$i" != "fixtures" ]; then
    mkdir -p tests/fixtures
    cd tests/fixtures
  fi

  pnpx @vue/cli create $ProjectName --no-git --inlinePreset "{\"useConfigFiles\": true,\"plugins\": {},\"vueVersion\": \"$1\"}" --packageManager=pnpm || ERRCODE=$?

  cd $ProjectName
  pnpm install -D ../../.. || ERRCODE=$?
  yes Y | pnpx @vue/cli invoke single-spa || ERRCODE=$?
  echo "module.exports={pluginOptions: {'single-spa': {outputSystemJS: $2}}}" > vue.config.js
  pnpm build || ERRCODE=$?

  exit $ERRCODE
else
  echo "$1 is no valid Vue Version"
  exit 1  
fi

