'''
implements simple substitution cipher
Author: James Lyons 
Created: 2012-04-28
'''

from pycipher.base import Cipher

class SimpleSubstitution(Cipher):
    """The Simple Substitution Cipher has a key consisting of the letters A-Z jumbled up.
    e.g. 'AJPCZWRLFBDKOTYUQGENHXMIVS'
    This cipher encrypts a letter according to the following equation::

        plaintext =  ABCDEFGHIJKLMNOPQRSTUVWXYZ
        ciphertext = AJPCZWRLFBDKOTYUQGENHXMIVS

    To convert a plaintext letter into ciphertext, read along the plaintext row until the desired
    letter is found, then substitute it with the letter below it. For more information see http://www.practicalcryptography.com/ciphers/simple-substitution-cipher/.
    
    :param key: The key, a permutation of the 26 characters of the alphabet.
    """           
    def __init__(self,key='AJPCZWRLFBDKOTYUQGENHXMIVS'):
        assert len(key) == 26
        self.key = [k.upper() for k in key]
        self.invkey = ''

    def encipher(self,string,keep_punct=False):
        """Encipher string using Simple Substitution cipher according to initialised key.

        Example::

            ciphertext = SimpleSubstitution('AJPCZWRLFBDKOTYUQGENHXMIVS').encipher(plaintext)     

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
        """Decipher string using Simple Substitution cipher according to initialised key.

        Example::

            plaintext = SimpleSubstitution('AJPCZWRLFBDKOTYUQGENHXMIVS').decipher(ciphertext)     

        :param string: The string to decipher.
        :param keep_punct: if true, punctuation and spacing are retained. If false, it is all removed. Default is False. 
        :returns: The deciphered string.
        """       
        # if we have not yet calculated the inverse key, calculate it now
        if self.invkey == '':
            for i in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ': 
                self.invkey += self.i2a(self.key.index(i))
        if not keep_punct: string = self.remove_punctuation(string)
        ret = ''      
        for c in string.upper():
            if c.isalpha(): ret += self.invkey[self.a2i(c)]
            else: ret += c
        return ret
        
if __name__ == '__main__': 
    print('use "import pycipher" to access functions')
