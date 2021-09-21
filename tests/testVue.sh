#!/bin/bash

if [ $1 == 2 ] || [ $1 == 3 ];
then
  ProjectName="test-app-vue$1"

  if basename "$PWD" != "tests"; then
    cd tests
  fi

  cleanup() (
    cd ..
    rm -rf $ProjectName
  )

  echo $ProjectName

  vue create $ProjectName --no-git --inlinePreset '{"useConfigFiles": true,"plugins": {},"vueVersion": "2"}' || exit 1

  cd $ProjectName
  yarn add --dev file:../.. || (cleanup && exit 1)
  yes Y | vue invoke single-spa || (cleanup && exit 1)
  yarn run build || (cleanup && exit 1)

  cleanup
else
  echo "$1 is no valid Vue Version"
  exit 1  
fi

