'''
implements Columnar transposition cipher
Author: James Lyons 
Created: 2012-04-28
'''
from pycipher.base import Cipher

####################################################################################
class ColTrans(Cipher):
    """The Columnar Transposition Cipher is a fractionating cipher, and has a key consisting of a word e.g. 'GERMAN'
    For more information, the algorithm can be 
    seen e.g. http://www.practicalcryptography.com/ciphers/columnar-transposition-cipher/ .
    
    :param key: The keyword, any word or phrase will do. Must consist of alphabetical characters only, no punctuation of numbers.    
    """

    def __init__(self,keyword='GERMAN'):
        self.keyword = keyword.upper()
        assert len(keyword)>0, 'invalid keyword in init: should be >= 1'

    # return the sorted indices of a word e.g. 'german' = [2,1,5,3,0,4] '''
    def sortind(self,word):
        t1 = [(word[i],i) for i in range(len(word))]
        t2 = [(k[1],i) for i,k in enumerate(sorted(t1))]
        return [q[1] for q in sorted(t2)]
        
    # return the unsorted indices of a word '''        
    def unsortind(self,word):
        t1 = [(word[i],i) for i in range(len(word))]
        return [q[1] for q in sorted(t1)]        
        
    def encipher(self,string):
        """Encipher string using Columnar Transposition cipher according to initialised key. Punctuation and whitespace
        are removed from the input.       

        Example::

            ciphertext = ColTrans('GERMAN').encipher(plaintext)     

        :param string: The string to encipher.
        :returns: The enciphered string.
        """                    
        string = self.remove_punctuation(string)    
        ret = ''
        ind = self.sortind(self.keyword)
        for i in range(len(self.keyword)):
            ret += string[ind.index(i)::len(self.keyword)]
        return ret

    # deciphering is messy because the columns may be ragged '''
    def decipher(self,string):
        '''Decipher string using Columnar Transposition cipher according to initialised key. Punctuation and whitespace
        are removed from the input.

        Example::

            plaintext = ColTrans('GERMAN').decipher(ciphertext)     

        :param string: The string to decipher.
        :returns: The deciphered string.
        '''           
        string = self.remove_punctuation(string)        
        ret = ['_']*len(string)
        L,M = len(string),len(self.keyword)
        ind = self.unsortind(self.keyword)
        upto = 0
        for i in range(len(self.keyword)):
            thiscollen = (int)(L/M)
            if ind[i]< L%M: thiscollen += 1
            ret[ind[i]::M] = string[upto:upto+thiscollen]
            upto += thiscollen
        return ''.join(ret)    

if __name__ == '__main__': 
    print('use "import pycipher" to access functions')