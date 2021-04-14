#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import sys
import json

sys.path.append(os.path.join(os.getcwd(), 'extensions', 'ext.common.py'))

from name_that_hash import runner

if __name__ == '__main__':
 
    output = ''

    if (len(sys.argv) > 1):     
        input = sys.argv[1]     

        data = json.loads(runner.api_return_hashes_as_json([input]))

        for item in data.values():
            output = json.dumps(item)
            break         

    print(output)