'''
implements beaufort cipher
Author: James Lyons
Created: 2012-04-28
'''
from pycipher.base import Cipher

####################################################################################
class Beaufort(Cipher):
    """The Beaufort Cipher is similar to the Vigenere Cipher, and has a key consisting of a word e.g. 'FORTIFICATION'.
    This cipher encrypts a letter according to the Vigenere tableau, the but uses a different algorithm to find the
    ciphertext letter. The algorithm can be 
    seen e.g. http://www.practicalcryptography.com/ciphers/beaufort-cipher/
    
    :param key: The keyword, any word or phrase will do. Must consist of alphabetical characters only, no punctuation of numbers.          
    """
    def __init__(self,key='FORTIFICATION'):
        self.key = [k.upper() for k in key]
        
    def encipher(self,string):
        """Encipher string using Beaufort cipher according to initialised key. Punctuation and whitespace
        are removed from the input.       

        Example::

            ciphertext = Beaufort('HELLO').encipher(plaintext)     

        :param string: The string to encipher.
        :returns: The enciphered string.
        """            
        string = self.remove_punctuation(string)
        ret = ''
        for (i,c) in enumerate(string):
            i = i%len(self.key)
            ret += self.i2a(self.a2i(self.key[i])-self.a2i(c))
        return ret    

    def decipher(self,string):
        """Decipher string using Beaufort cipher according to initialised key. Punctuation and whitespace
        are removed from the input. For the Beaufort cipher, enciphering and deciphering are the same operation.

        Example::

            plaintext = Beaufort('HELLO').decipher(ciphertext)     

        :param string: The string to decipher.
        :returns: The deciphered string.
        """   
        return self.encipher(string)    

if __name__ == '__main__': 
    print('use "import pycipher" to access functions')
