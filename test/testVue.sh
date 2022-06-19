#!/bin/bash
Version=`npx -c 'node -p "process.env.npm_package_version"'`
tgz="../../vue-cli-plugin-single-spa-"$Version".tgz"
mkcdir ()
{
    mkdir -p -- "$1" &&
      cd -P -- "$1"
}

if [ $1 == 2 ] || [ $1 == 3 ];
then
  ProjectName="test-app-vue$1"

  pnpm pack --pack-destination test

  mkcdir test/fixtures

  cleanup() (
    cd ..
    rm -rf $ProjectName
  )

  echo $ProjectName

  vue create $ProjectName --no-git --inlinePreset "{\"useConfigFiles\": true,\"plugins\": {},\"vueVersion\": \"$1\"}" --packageManager npm

  cd $ProjectName

  npm install $tgz
  yes Y | vue invoke single-spa || ERRCODE=$?
  npm run build || ERRCODE=$?

  cleanup
  exit $ERRCODE
else
  echo "$1 is no valid Vue Version"
  exit 1  
fi
