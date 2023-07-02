'''
implements affine substitution cipher
Author: James Lyons
Created: 2012-04-28
'''
from pycipher.base import Cipher

####################################################################################
class Affine(Cipher):
    """The Affine Cipher has two components to the key, numbers *a* and *b*.
    This cipher encrypts a letter according to the following equation::
    
        c = (a*p + b)%26
        
    where c is the ciphertext letter, p the plaintext letter.
    *b* is an integer 0-25, *a* is an integer that has an inverse (mod 26).
    Allowable values for *a* are: 1,3,5,7,9,11,15,17,19,21,23,25 
    For more info on the Affine cipher see http://www.practicalcryptography.com/ciphers/affine-cipher/
    
    :param a: The multiplicative part of the key. Allowable values are: 1,3,5,7,9,11,15,17,19,21,23,25 
    :param b: The additive part of the key. Allowable values are integers 0-25
    """   
    
    def __init__(self,a=5,b=9):
        self.a = a
        self.b = b
        self.inva = -1
        for i in range(1,26,2):
            if (self.a*i) % 26 == 1: self.inva = i
        assert 0 <= self.inva <= 25, 'invalid key: a='+str(a)+', no inverse exists (mod 26)'

    def encipher(self,string,keep_punct=False):
        """Encipher string using affine cipher according to initialised key.

        Example::
        
            ciphertext = Affine(a,b).encipher(plaintext)     

        :param string: The string to encipher.
        :param keep_punct: if true, punctuation and spacing are retained. If false, it is all removed. Default is False. 
        :returns: The enciphered string.
        """        
        if not keep_punct: string = self.remove_punctuation(string)
        ret = ''
        for c in string:
            if c.isalpha(): ret += self.i2a(self.a*self.a2i(c) + self.b)
            else: ret += c
        return ret    

    def decipher(self,string,keep_punct=False):
        """Decipher string using affine cipher according to initialised key.

        Example::
        
            plaintext = Affine(a,b).decipher(ciphertext)     

        :param string: The string to decipher.
        :param keep_punct: if true, punctuation and spacing are retained. If false, it is all removed. Default is False. 
        :returns: The deciphered string.
        """        
        if not keep_punct: string = self.remove_punctuation(string)    
        ret = ''
        for c in string:
            if c.isalpha(): ret += self.i2a(self.inva*(self.a2i(c) - self.b))
            else: ret += c
        return ret
        
if __name__ == '__main__': 
    print('use "import pycipher" to access functions')
