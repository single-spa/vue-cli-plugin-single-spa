#!/bin/bash

mkcdir ()
{
    mkdir -p -- "$1" &&
      cd -P -- "$1"
}

if [ $1 == 2 ] || [ $1 == 3 ];
then
  ProjectName="test-app-vue$1"

  mkcdir test/fixtures

  cleanup() (
    cd ..
    rm -rf $ProjectName
  )

  echo $ProjectName

  vue create $ProjectName --no-git --inlinePreset "{\"useConfigFiles\": true,\"plugins\": {},\"vueVersion\": \"$1\"}" --packageManager pnpm || ERRCODE=$?

  cd $ProjectName
  pnpm add ../../../ -D || ERRCODE=$?
  yes Y | vue invoke single-spa || ERRCODE=$?
  pnpm run build || ERRCODE=$?

  cleanup
  exit $ERRCODE
else
  echo "$1 is no valid Vue Version"
  exit 1  
fi
