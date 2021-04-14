'''
some statistics routines for cryptanalysis
'''
import math
import re

def ic(ctext):
    ''' takes ciphertext, calculates index of coincidence.'''
    counts = ngram_count(ctext,N=1)
    icval = 0
    for k in counts.keys():
        icval += counts[k]*(counts[k]-1)
    icval /= (len(ctext)*(len(ctext)-1))
    return icval
    
def ngram_count(text,N=1,keep_punct=False):
    ''' if N=1, return a dict containing each letter along with how many times the letter occurred.
        if N=2, returns a dict containing counts of each bigram (pair of letters)
        etc.
        There is an option to remove all spaces and punctuation prior to processing '''
    if not keep_punct: text = re.sub('[^A-Z]','',text.upper())
    count = {}
    for i in range(len(text)-N+1):
        c = text[i:i+N]
        if c in count: count[c] += 1
        else: count[c] = 1.0
    return count
    
def ngram_freq(text,N=1,log=False,floor=0.01):
    ''' returns the n-gram frequencies of all n-grams encountered in text.
        Option to return log probabilities or standard probabilities.
        Note that only n-grams occurring in 'text' will have probabilities.
        For the probability of not-occurring n-grams, use freq['floor'].
        This is set to floor/len(text) '''
    freq = ngram_count(text,N)
    L = 1.0*(len(text)-N+1)
    for c in freq.keys():
        if log: freq[c] = math.log10(freq[c]/L)
        else: freq[c] = freq[c]/L
    if log: freq['floor'] = math.log10(floor/L)
    else: freq['floor'] = floor/L   
    return freq

def restore_punctuation(original,modified):
    ''' If punctuation was accidently removed, use this function to restore it.
        requires the orignial string with punctuation. '''
    ret = ''
    count = 0
    try:
        for c in original:
            if c.isalpha(): 
                ret+=modified[count]
                count+=1
            else: ret+=c
    except IndexError:
        print('restore_punctuation: strings must have same number of alphabetic chars')
        raise
    return ret
    

def keyword_to_key(word,alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ'):
    ''' convert a key word to a key by appending on the other letters of the alphabet.
    e.g. MONARCHY -> MONARCHYBDEFGIJKLPQSTUVWXZ
    '''
    ret = ''
    word = (word + alphabet).upper()
    for i in word:
        if i in ret: continue
        ret += i
    return ret    
