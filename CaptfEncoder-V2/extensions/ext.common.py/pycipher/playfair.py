"""
implements Playfair cipher
Author: James Lyons
Created: 2012-04-28
"""
from pycipher.base import Cipher
import re


####################################################################################
class Playfair(Cipher):
    """The Playfair Cipher enciphers pairs of characters, the key consists of a keysquare 25 characters in length.
    More information about the algorithm can be 
    found at http://www.practicalcryptography.com/ciphers/playfair-cipher/.
    
    :param key: The keysquare, as a 25 character string.
    """
    def __init__(self, key='ABCDEFGHIKLMNOPQRSTUVWXYZ'):
        self.key = [k.upper() for k in key]
        
    def encipher_pair(self, a, b):
        if a == b:
            b = 'X'
        arow, acol = int(self.key.index(a) / 5), self.key.index(a) % 5
        brow, bcol = int(self.key.index(b) / 5), self.key.index(b) % 5
        if arow == brow:
            return self.key[arow * 5 + (acol + 1) % 5] + self.key[brow * 5 + (bcol + 1) % 5]
        elif acol == bcol:
            return self.key[((arow + 1) % 5) * 5 + acol] + self.key[((brow + 1) % 5) * 5 + bcol]
        else:
            return self.key[arow * 5 + bcol] + self.key[brow * 5 + acol]
        
    def decipher_pair(self, a, b):
        assert a != b, 'two of the same letters occurred together, illegal in playfair'
        arow, acol = int(self.key.index(a) / 5), self.key.index(a) % 5
        brow, bcol = int(self.key.index(b) / 5), self.key.index(b) % 5
        if arow == brow:
            return self.key[arow * 5 + (acol - 1) % 5] + self.key[brow * 5 + (bcol - 1) % 5]
        elif acol == bcol:
            return self.key[((arow - 1) % 5) * 5 + acol] + self.key[((brow - 1) % 5) * 5 + bcol]
        else:
            return self.key[arow * 5 + bcol] + self.key[brow * 5 + acol]
        
    def encipher(self, string):
        """Encipher string using Playfair cipher according to initialised key. Punctuation and whitespace
        are removed from the input. If the input plaintext is not an even number of characters, an 'X' will be appended.

        Example::

            ciphertext = Playfair(key='zgptfoihmuwdrcnykeqaxvsbl').encipher(plaintext)     

        :param string: The string to encipher.
        :returns: The enciphered string.
        """    
        string = self.remove_punctuation(string)  
        string = re.sub(r'[J]', 'I', string)
        if len(string) % 2 == 1:
            string += 'X'
        ret = ''
        for c in range(0, len(string), 2):
            ret += self.encipher_pair(string[c], string[c + 1])
        return ret    

    def decipher(self, string):
        """Decipher string using Playfair cipher according to initialised key. Punctuation and whitespace
        are removed from the input. The ciphertext should be an even number of characters. If the input ciphertext is not an even number of characters, an 'X' will be appended.

        Example::

            plaintext = Playfair(key='zgptfoihmuwdrcnykeqaxvsbl').decipher(ciphertext)     

        :param string: The string to decipher.
        :returns: The deciphered string.
        """    
        string = self.remove_punctuation(string)  
        if len(string) % 2 == 1:
            string += 'X'
        ret = ''
        for c in range(0, len(string), 2):
            ret += self.decipher_pair(string[c], string[c + 1])
        return ret    
        
if __name__ == '__main__': 
    print('use "import pycipher" to access functions')
