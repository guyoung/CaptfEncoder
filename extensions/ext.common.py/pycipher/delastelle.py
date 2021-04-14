'''
implements delastelle cipher
Author: James Lyons
Created: 2014-02-12
'''
from itertools import product
from pycipher.base import Cipher
import re

####################################################################################
class Delastelle(Cipher):
    """The Delastelle cipher is a simple substitution cipher that outputs 3 characters of ciphertext for each character of plaintext. It has a key consisting
    of a 'key cube' 27 characters in length. This cipher is used as part of the Trifid cipher.
    For a more detailed look at how it works see http://www.practicalcryptography.com/ciphers/trifid-cipher/.
    
    :param key: The keycube. The key must by 27 characters in length.
    :param chars: the set of characters to use. By default 123 are used.
    """    
    def __init__(self,key='phqgiumeaylnofdxkrcvst.zwb',chars="123"):
        self.key = ''.join([k.upper() for k in key])
        self.chars = chars
        assert len(self.key)==27, 'invalid key in init: must have length 27, has length '+str(len(key))
        self.IND2L = dict(zip(list(product(chars,repeat=3)),key))
        self.L2IND = dict(zip(key,list(product(chars,repeat=3))))
    
    def encipher(self,string):
        """Encipher string using Delastelle cipher according to initialised key.

        Example::

            ciphertext = Delastelle('APCZ WRLFBDKOTYUQGENHXMIVS').encipher(plaintext)     

        :param string: The string to encipher.
        :returns: The enciphered string. The ciphertext will be 3 times the length of the plaintext.
        """           
        string = self.remove_punctuation(string,filter='[^'+self.key+']')        
        ctext = ""
        for c in string:
            ctext += ''.join([str(i) for i in L2IND[c]])
        return ctext

    def decipher(self,string):
        """Decipher string using Delastelle cipher according to initialised key.

        Example::

            plaintext = Delastelle('APCZ WRLFBDKOTYUQGENHXMIVS').decipher(ciphertext)     

        :param string: The string to decipher.
        :returns: The deciphered string. The plaintext will be 1/3 the length of the ciphertext.
        """         
        string = self.remove_punctuation(string,filter='[^'+self.chars+']')
        ret = ''
        for i in range(0,len(string),3):
            ind = tuple([int(string[i+k]) for k in [0,1,2]])
            ret += IND2L[ind]
        return ret    

if __name__ == '__main__': 
    print('use "import pycipher" to access functions')