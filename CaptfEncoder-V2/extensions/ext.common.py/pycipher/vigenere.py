'''
implements vigenere cipher
Author: James Lyons 
Created: 2012-04-28
'''
from pycipher.base import Cipher

####################################################################################
class Vigenere(Cipher):
    """The Vigenere Cipher has a key consisting of a word e.g. 'FORTIFICATION'.
    This cipher encrypts a letter according to the Vigenere tableau, the algorithm can be 
    seen e.g. http://practicalcryptography.com/ciphers/vigenere-gronsfeld-and-autokey-cipher/
    
    :param key: The keyword, any word or phrase will do. Must consist of alphabetical characters only, no punctuation of numbers.        
    """
    def __init__(self,key='fortification'):
        self.key = [k.upper() for k in key]
        
    def encipher(self,string):
        """Encipher string using Vigenere cipher according to initialised key. Punctuation and whitespace
        are removed from the input.       

        Example::

            ciphertext = Vigenere('HELLO').encipher(plaintext)     

        :param string: The string to encipher.
        :returns: The enciphered string.
        """           
        string = self.remove_punctuation(string)
        ret = ''
        for (i,c) in enumerate(string):
            i = i%len(self.key)
            ret += self.i2a(self.a2i(c) + self.a2i(self.key[i]))
        return ret    

    def decipher(self,string):
        """Decipher string using Vigenere cipher according to initialised key. Punctuation and whitespace
        are removed from the input.       

        Example::

            plaintext = Vigenere('HELLO').decipher(ciphertext)     

        :param string: The string to decipher.
        :returns: The enciphered string.
        """               
        string = self.remove_punctuation(string)
        ret = ''
        for (i,c) in enumerate(string):
            i = i%len(self.key)
            ret += self.i2a(self.a2i(c) - self.a2i(self.key[i]))
        return ret    

if __name__ == '__main__': 
    print('use "import pycipher" to access functions')
