'''
implements autokey cipher
Author: James Lyons
Created: 2012-04-28
'''
from pycipher.base import Cipher

####################################################################################
class Autokey(Cipher):
    """The Autokey Cipher has a key consisting of a word e.g. 'FORTIFICATION'.
    This cipher encrypts a letter according to the Vigenere tableau, the algorithm can be 
    seen e.g. http://www.practicalcryptography.com/ciphers/classical-era/autokey/
    
    :param key: The keyword, any word or phrase will do. Must consist of alphabetical characters only, no punctuation of numbers.      
    """
    def __init__(self,key='FORTIFICATION'):
        self.key = [k.upper() for k in key]
        
    def encipher(self,string):
        """Encipher string using Autokey cipher according to initialised key. Punctuation and whitespace
        are removed from the input.       

        Example::

            ciphertext = Autokey('HELLO').encipher(plaintext)     

        :param string: The string to encipher.
        :returns: The enciphered string.
        """           
        string = self.remove_punctuation(string)
        ret = ''
        for (i,c) in enumerate(string):
            if i<len(self.key): offset = self.a2i(self.key[i])
            else: offset = self.a2i(string[i-len(self.key)])     
            ret += self.i2a(self.a2i(c)+offset)
        return ret    

    def decipher(self,string):
        """Decipher string using Autokey cipher according to initialised key. Punctuation and whitespace
        are removed from the input.       

        Example::

            plaintext = Autokey('HELLO').decipher(ciphertext)     

        :param string: The string to decipher.
        :returns: The enciphered string.
        """                   
        string = self.remove_punctuation(string)
        ret = ''
        for (i,c) in enumerate(string):
            if i<len(self.key): offset = self.a2i(self.key[i])
            else: offset = self.a2i(ret[i-len(self.key)])             
            ret += self.i2a(self.a2i(c)-offset)
        return ret    

if __name__ == '__main__': 
    print('use "import pycipher" to access functions')
