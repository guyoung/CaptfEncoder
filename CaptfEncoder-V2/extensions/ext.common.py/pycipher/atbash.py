'''
implements atbash cipher
Author: James Lyons 
Created: 2014-02-09
'''

from pycipher.base import Cipher

class Atbash(Cipher):
    """The Atbash Cipher has no key.
    For more information see http://www.practicalcryptography.com/ciphers/atbash-cipher-cipher/.
    """           
    def __init__(self):
        self.key = 'ZYXWVUTSRQPONMLKJIHGFEDCBA'

    def encipher(self,string,keep_punct=False):
        """Encipher string using Atbash cipher.

        Example::

            ciphertext = Atbash().encipher(plaintext)     

        :param string: The string to encipher.
        :param keep_punct: if true, punctuation and spacing are retained. If false, it is all removed. Default is False. 
        :returns: The enciphered string.
        """       
        if not keep_punct: string = self.remove_punctuation(string)
        ret = ''
        for c in string.upper():
            if c.isalpha(): ret += self.key[self.a2i(c)]
            else: ret += c
        return ret    

    def decipher(self,string,keep_punct=False):
        """Decipher string using the Atbash cipher.

        Example::

            plaintext = Atbash().decipher(ciphertext)     

        :param string: The string to decipher.
        :param keep_punct: if true, punctuation and spacing are retained. If false, it is all removed. Default is False. 
        :returns: The deciphered string.
        """       
        return self.encipher(string,keep_punct)
        
if __name__ == '__main__': 
    print('use "import pycipher" to access functions')
