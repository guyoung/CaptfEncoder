'''
implements ADFGX cipher
Author: James Lyons
Created: 2012-04-28
'''
from pycipher.base import Cipher
from pycipher.columnartransposition import ColTrans
from pycipher.polybius import PolybiusSquare

####################################################################################
class ADFGX(Cipher):
    """The ADFGX Cipher has a key consisting of a 5x5 key square and a word e.g. 'GERMAN'.
    The algorithm is described here: http://www.practicalcryptography.com/ciphers/classical-era/adfgvx/
    The key square consists of the letters A-Z with J omitted (25 characters total). 

    :param key: The keysquare, as a 25 character string.
    :param keyword: The keyword, any word or phrase will do.       
    """
    def __init__(self,key='phqgmeaylnofdxkrcvszwbuti',keyword='GERMAN'):
        self.key = [k.upper() for k in key]
        self.keyword = keyword
        assert len(key)==25, 'invalid key in init: must have length 25, has length '+str(len(key))
        assert len(keyword)>0, 'invalid keyword in init: should have length >= 1'
       
    def encipher(self,string):
        """Encipher string using ADFGX cipher according to initialised key information. Punctuation and whitespace
        are removed from the input.       

        Example::

            ciphertext = ADFGX('phqgmeaylnofdxkrcvszwbuti','HELLO').encipher(plaintext)     

        :param string: The string to encipher.
        :returns: The enciphered string.
        """                   
        step1 = PolybiusSquare(self.key,size=5,chars='ADFGX').encipher(string)
        step2 = ColTrans(self.keyword).encipher(step1)
        return step2

    def decipher(self,string):
        """Decipher string using ADFGX cipher according to initialised key information. Punctuation and whitespace
        are removed from the input.       

        Example::

            plaintext = ADFGX('phqgmeaylnofdxkrcvszwbuti','HELLO').decipher(ciphertext)     

        :param string: The string to decipher.
        :returns: The enciphered string.
        """                   
        step2 = ColTrans(self.keyword).decipher(string)
        step1 = PolybiusSquare(self.key,size=5,chars='ADFGX').decipher(step2)
        return step1    

if __name__ == '__main__': 
    print('use "import pycipher" to access functions')
