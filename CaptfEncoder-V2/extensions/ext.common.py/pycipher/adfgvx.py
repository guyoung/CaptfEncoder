'''
implements ADFGVX cipher
Author: James Lyons
Created: 2012-04-28
'''
from pycipher.base import Cipher
from pycipher.columnartransposition import ColTrans
from pycipher.polybius import PolybiusSquare

####################################################################################
class ADFGVX(Cipher):
    """The ADFGVX Cipher has a key consisting of a 6x6 key square and a word e.g. 'GERMAN'.
    The algorithm is described here: http://www.practicalcryptography.com/ciphers/classical-era/adfgvx/
    The key square consists of the letters A-Z and the numbers 0-9 (36 characters total). 

    :param key: The keysquare, as a 36 character string.
    :param keyword: The keyword, any word or phrase will do.   
    """
    def __init__(self,key='ph0qg64mea1yl2nofdxkr3cvs5zw7bj9uti8',keyword='GERMAN'):
        self.key = [k.upper() for k in key]
        self.keyword = keyword
        assert len(key)==36, 'invalid key in init: must have length 36, has length '+str(len(key))
        assert len(keyword)>0, 'invalid keyword in init: should have length >= 1'
       
    def encipher(self,string):
        """Encipher string using ADFGVX cipher according to initialised key information. Punctuation and whitespace
        are removed from the input.       

        Example::

            ciphertext = ADFGVX('ph0qg64mea1yl2nofdxkr3cvs5zw7bj9uti8','HELLO').encipher(plaintext)     

        :param string: The string to encipher.
        :returns: The enciphered string.
        """               
        step1 = PolybiusSquare(self.key,size=6,chars='ADFGVX').encipher(string)
        step2 = ColTrans(self.keyword).encipher(step1)
        return step2

    def decipher(self,string):
        """Decipher string using ADFGVX cipher according to initialised key information. Punctuation and whitespace
        are removed from the input.       

        Example::

            plaintext = ADFGVX('ph0qg64mea1yl2nofdxkr3cvs5zw7bj9uti8','HELLO').decipher(ciphertext)     

        :param string: The string to decipher.
        :returns: The enciphered string.
        """                
        step2 = ColTrans(self.keyword).decipher(string)
        step1 = PolybiusSquare(self.key,size=6,chars='ADFGVX').decipher(step2)
        return step1    

if __name__ == '__main__': 
    print('use "import pycipher" to access functions')
