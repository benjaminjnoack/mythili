#!/bin/bash
echo deleted:
find data/ -name "*.csv"
rm data/*.csv 2> /dev/null