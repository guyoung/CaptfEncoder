'''
implements american m209 cipher
Author: James Lyons
Created: 2012-04-28
'''

from pycipher.base import Cipher

class M209(Cipher):
    ''' The M209 cipher. The key consists of several parameters.
    
    :param wheel_starts: The rotor start positions, consists of 6 characters e.g. "AAAAAA". Note that not all character combinations are possible, e.g. wheel 6 has only 17 characters.
    :param w1s: wheel 1 settings. An array of 26 binary values.
    :param w2s: wheel 2 settings. An array of 25 binary values.
    :param w3s: wheel 3 settings. An array of 23 binary values.
    :param w4s: wheel 4 settings. An array of 21 binary values.
    :param w5s: wheel 5 settings. An array of 19 binary values.
    :param w6s: wheel 6 settings. An array of 17 binary values.
    :param lugpos: The lugs, a 27-tuple of 2-tuples. See below for an example.
        
    Example::
    
        wheel_1_settings = [1,1,0,1,0,0,0,1,1,0,1,0,1,1,0,0,0,0,1,1,0,1,1,0,0,0]
        wheel_2_settings = [1,0,0,1,1,0,1,0,0,1,1,1,0,0,1,0,0,1,1,0,1,0,1,0,0]
        wheel_3_settings = [1,1,0,0,0,0,1,1,0,1,0,1,1,1,0,0,0,1,1,1,1,0,1]
        wheel_4_settings = [0,0,1,0,1,1,0,1,1,0,0,0,1,1,0,1,0,0,1,1,1]
        wheel_5_settings = [0,1,0,1,1,1,0,1,1,0,0,0,1,1,0,1,0,0,1]
        wheel_6_settings = [1,1,0,1,0,0,0,1,0,0,1,0,0,1,1,0,1]
        wheel_starts = "AAAAAA"
        lug_positions = ((0,6),(3,6),(1,6),(1,5),(4,5),(0,4),(0,4),(0,4),(0,4),
                         (2,0),(2,0),(2,0),(2,0),(2,0),(2,0),(2,0),(2,0),(2,0),
                         (2,0),(2,5),(2,5),(0,5),(0,5),(0,5),(0,5),(0,5),(0,5))
        m = M209(wheel_1_settings, wheel_2_settings, wheel_3_settings
                 wheel_4_settings, wheel_5_settings, wheel_6_settings
                 wheel_starts, lug_positions)
        
    '''
    # these key settings correspond to the wheel settings on wikipedia:  http://en.wikipedia.org/wiki/M-209 '''
    def __init__(self,wheel_starts='AAAAAA',w1s=None,w2s=None,w3s=None,w4s=None,w5s=None,w6s=None,lugpos=None):
        # 1 corresponds to effective, 0 to ineffective. Position in array determines character.
        self.wheel_1_settings = w1s or [1,1,0,1,0,0,0,1,1,0,1,0,1,1,0,0,0,0,1,1,0,1,1,0,0,0]
        self.wheel_2_settings = w2s or [1,0,0,1,1,0,1,0,0,1,1,1,0,0,1,0,0,1,1,0,1,0,1,0,0]
        self.wheel_3_settings = w3s or [1,1,0,0,0,0,1,1,0,1,0,1,1,1,0,0,0,1,1,1,1,0,1]
        self.wheel_4_settings = w4s or [0,0,1,0,1,1,0,1,1,0,0,0,1,1,0,1,0,0,1,1,1]
        self.wheel_5_settings = w5s or [0,1,0,1,1,1,0,1,1,0,0,0,1,1,0,1,0,0,1]
        self.wheel_6_settings = w6s or [1,1,0,1,0,0,0,1,0,0,1,0,0,1,1,0,1]
        self.wheel_starts = [self.a2i(i) for i in wheel_starts]
        self.wheel_lengths = (26,25,23,21,19,17) # lengths of each wheel
        self.lug_positions = lugpos or ((0,6),(3,6),(1,6),(1,5),(4,5),(0,4),(0,4),(0,4),(0,4),
                                        (2,0),(2,0),(2,0),(2,0),(2,0),(2,0),(2,0),(2,0),(2,0),
                                        (2,0),(2,5),(2,5),(0,5),(0,5),(0,5),(0,5),(0,5),(0,5))
        self.actual_key = [0,0,0,0,0,0] # this is the key the machine sees                              
        self.reset_settings()
        
    def reset_settings(self):
        # the actual key chars are on the other side of the rotors to the wheel_starts
        for i in range(0,6): self.actual_key[i] = (self.wheel_starts[i] + 15 - i)%self.wheel_lengths[i]
        
    def encipher(self,message):
        """Encipher string using M209 cipher according to initialised key. Punctuation and whitespace
        are removed from the input.       

        Example (continuing from the example above)::
        
            ciphertext = m.encipher(plaintext)     

        :param string: The string to encipher.
        :returns: The enciphered string.
        """           
        message = self.remove_punctuation(message)  
        effective_ch = [0,0,0,0,0,0,0] # these are the wheels which are effective currently, 1 for yes, 0 no
                                       # -the zero at the beginning is extra, indicates lug was in pos 0
        ret = ''
        # from now we no longer need the wheel starts, we can just increment the actual key
        for j in range(len(message)):
            shift = 0 
            effective_ch[0] = 0;
            effective_ch[1] = self.wheel_1_settings[self.actual_key[0]]
            effective_ch[2] = self.wheel_2_settings[self.actual_key[1]]
            effective_ch[3] = self.wheel_3_settings[self.actual_key[2]]
            effective_ch[4] = self.wheel_4_settings[self.actual_key[3]]
            effective_ch[5] = self.wheel_5_settings[self.actual_key[4]]
            effective_ch[6] = self.wheel_6_settings[self.actual_key[5]]
             
            for i in range(0,27): # implements the cylindrical drum with lugs on it
                if effective_ch[self.lug_positions[i][0]] or effective_ch[self.lug_positions[i][1]]: shift+=1
            # shift has been found, now actually encrypt letter
            ret += self.subst(message[j],key='ZYXWVUTSRQPONMLKJIHGFEDCBA',offset=-shift); # encrypt letter
            self.advance_key();    # advance the key wheels
        return ret

    def decipher(self,message):
        """Decipher string using M209 cipher according to initialised key. Punctuation and whitespace
        are removed from the input. The encipher and decipher operations of the M209 are identical.

        Example (continuing from the example above)::

            plaintext = m.decipher(ciphertext)     

        :param string: The string to decipher.
        :returns: The deciphered string.
        """           
        return self.encipher(message)
        
    def subst(self,ch,key,offset=0):
        index = (self.a2i(ch) + offset)%26
        return key[index]
  
    def advance_key(self):
        # advance each key wheel, noting that each is a different size and wraps at  a different length '''
        for i in range(0,6): self.actual_key[i] = (self.actual_key[i] + 1) % self.wheel_lengths[i]
        
        
if __name__ == '__main__': 
    print('use "import pycipher" to access functions')