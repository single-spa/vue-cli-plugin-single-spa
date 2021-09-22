#!/bin/bash

i= basename "$PWD"

if [ "$i" != "tests" ]; then
  cd tests
fi

bash testVue.sh 2 && bash testVue.sh 3 || exit 1
