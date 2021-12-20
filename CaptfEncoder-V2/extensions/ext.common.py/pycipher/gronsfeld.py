'''  
implements gronsfeld cipher
Author: James Lyons
Created: 2012-04-28
'''
from pycipher.base import Cipher

####################################################################################
class Gronsfeld(Cipher):
    """The Gronsfeld Cipher is similar to the Vigenere Cipher, and has a key consisting of a sequence of numbers 0-9 e.g. [4,9,2,0,2].
    This cipher encrypts a letter according to the Vigenere tableau. More information about the algorithm can be 
    found at http://www.practicalcryptography.com/ciphers/vigenere-gronsfeld-and-autokey-cipher/
    
    :param key: The keyword, any word or phrase will do. Must consist of alphabetical characters only, no punctuation of numbers.        
    """
    def __init__(self,key=[5, 4, 7, 9, 8, 5, 8, 2, 0, 9, 8, 4, 3]):
        self.key = key

    def encipher(self,string):
        """Encipher string using Gronsfeld cipher according to initialised key. Punctuation and whitespace
        are removed from the input.       

        Example::

            ciphertext = Gronsfeld([5, 4, 7, 9, 8, 5, 8, 2, 0, 9, 8, 4, 3]).encipher(plaintext)     

        :param string: The string to encipher.
        :returns: The enciphered string.
        """            
        string = self.remove_punctuation(string)  
        ret = ''
        for (i,c) in enumerate(string):
            i = i%len(self.key)
            ret += self.i2a(self.a2i(c) + self.key[i])
        return ret 

    def decipher(self,string):
        """Decipher string using Gronsfeld cipher according to initialised key. Punctuation and whitespace
        are removed from the input.

        Example::

            plaintext = Gronsfeld([5, 4, 7, 9, 8, 5, 8, 2, 0, 9, 8, 4, 3]).decipher(ciphertext)     

        :param string: The string to decipher.
        :returns: The deciphered string.
        """       
        string = self.remove_punctuation(string)  
        ret = ''
        for (i,c) in enumerate(string):
            i = i%len(self.key)
            ret += self.i2a(self.a2i(c) - self.key[i])
        return ret         


if __name__ == '__main__': 
    print('use "import pycipher" to access functions')