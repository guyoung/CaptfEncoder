#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import sys

sys.path.append(os.path.join(os.getcwd(), 'extensions', 'ext.common.py'))

from pycipher import Gronsfeld

if __name__ == '__main__':
    output = ''

    if (len(sys.argv) > 1):
        input = sys.argv[1]
        strNumericKey =  sys.argv[2]

        arrNumericKey = map(int, strNumericKey.split(' '))

        output = Gronsfeld(arrNumericKey).decipher(input)

    print(output)