#!/bin/bash

if basename "$PWD" != "tests"; then
  cd tests
fi

bash testVue.sh 2
bash testVue.sh 3