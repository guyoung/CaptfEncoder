#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import sys
import json


from name_that_hash import runner


if __name__ == '__main__':
 
    output = ''

    input= 'aaaaaaaaaaa'

    data = json.loads(runner.api_return_hashes_as_json([input]))


    print (data)

    print (data.items())
    print (data.values())

    for item in data.values():
        print(json.dumps(item))

