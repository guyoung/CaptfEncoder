#implements rot13 cipher
#Author: James Lyons 
#Created: 2014-02-09

from pycipher.base import Cipher

class Rot13(Cipher):
    """The Rot13 Cipher has no key, it is commonly used just to hide text.
    This cipher encrypts a letter according to the following equation::
    
        c = (p + 13)%26
        
    where c is the ciphertext letter, p the plaintext letter. This is equivalent to the Caesar cipher with a key of 13.
    For more details on the rot13 cipher, see http://www.practicalcryptography.com/ciphers/rot13-cipher/ .
    """       
    
    def __init__(self):
        pass
        
    def encipher(self,string,keep_punct=False):
        r"""Encipher string using rot13 cipher.

        Example::

            ciphertext = Rot13().encipher(plaintext)     

        :param string: The string to encipher.
        :param keep_punct: if true, punctuation and spacing are retained. If false, it is all removed. Default is False. 
        :returns: The enciphered string.
        """        
        if not keep_punct: string = self.remove_punctuation(string)
        ret = ''
        for c in string:
            if c.isalpha(): ret += self.i2a( self.a2i(c) + 13 )
            else: ret += c
        return ret    

    def decipher(self,string,keep_punct=False):
        r"""Decipher string using rot13 cipher. The Deciphering and enciphering operations are identical.

        Example::

            plaintext = Rot13().decipher(ciphertext)     

        :param string: The string to decipher.
        :param keep_punct: if true, punctuation and spacing are retained. If false, it is all removed. Default is False. 
        :returns: The deciphered string.
        """         
        return self.encipher(string,keep_punct)
                
if __name__ == '__main__': 
    print('use "import pycipher" to access functions')
