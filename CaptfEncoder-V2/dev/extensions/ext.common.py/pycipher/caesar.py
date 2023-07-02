#implements Caesar substitution cipher
#Author: James Lyons 
#Created: 2012-04-28

from pycipher.base import Cipher

class Caesar(Cipher):
    """The Caesar Cipher has a key consisting of an integer 1-25.
    This cipher encrypts a letter according to the following equation::
    
        c = (p + key)%26
        
    where c is the ciphertext letter, p the plaintext letter.
    For more details on the Caesar cipher, see http://www.practicalcryptography.com/ciphers/caesar-cipher/
    
    :param key: The additive key. Allowable values are integers 0-25.
    """       
    
    def __init__(self,key=13):
        self.key = key % 26
        
    def encipher(self,string,keep_punct=False):
        r"""Encipher string using Caesar cipher according to initialised key.

        Example::

            ciphertext = Caesar(3).encipher(plaintext)     

        :param string: The string to encipher.
        :param keep_punct: if true, punctuation and spacing are retained. If false, it is all removed. Default is False. 
        :returns: The enciphered string.
        """        
        if not keep_punct: string = self.remove_punctuation(string)
        ret = ''
        for c in string:
            if c.isalpha(): ret += self.i2a( self.a2i(c) + self.key )
            else: ret += c
        return ret    

    def decipher(self,string,keep_punct=False):
        r"""Decipher string using Caesar cipher according to initialised key.

        Example::

            plaintext = Caesar(3).decipher(ciphertext)     

        :param string: The string to decipher.
        :param keep_punct: if true, punctuation and spacing are retained. If false, it is all removed. Default is False. 
        :returns: The deciphered string.
        """         
        if not keep_punct: string = self.remove_punctuation(string)    
        ret = ''
        for c in string:
            if c.isalpha(): ret += self.i2a( self.a2i(c) - self.key )
            else: ret += c
        return ret
                
if __name__ == '__main__': 
    print('use "import pycipher" to access functions')
