"use strict";
/**
 * JavaScript implementation of the morse code.
 * 
 * Morse code is a telecommunications method which encodes text characters as standardized 
 * sequences of two different signal durations, called dots and dashes, or dits and dahs.
 * Morse code is named after Samuel Morse, one of several developers of the code system.
 * 
 * @link   https://en.wikipedia.org/wiki/Morse_code
 * @link   https://morsecode.world/international/morse2.html
 * @file   This file defines the morse global constant.
 * @author Korosium
 */
const morse = (() => {

    /**
     * The table used to encode the text with.
     */
    const ENCODING_TABLE = {
        // Letters
        'A': '.-',
        'B': '-...',
        'C': '-.-.',
        'D': '-..',
        'E': '.',
        'F': '..-.',
        'G': '--.',
        'H': '....',
        'I': '..',
        'J': '.---',
        'K': '-.-',
        'L': '.-..',
        'M': '--',
        'N': '-.',
        'O': '---',
        'P': '.--.',
        'Q': '--.-',
        'R': '.-.',
        'S': '...',
        'T': '-',
        'U': '..-',
        'V': '...-',
        'W': '.--',
        'X': '-..-',
        'Y': '-.--',
        'Z': '--..',

        // Numbers
        '0': '-----',
        '1': '.----',
        '2': '..---',
        '3': '...--',
        '4': '....-',
        '5': '.....',
        '6': '-....',
        '7': '--...',
        '8': '---..',
        '9': '----.',

        // Symbols
        '&': '.-...',
        '\'': '.----.',
        '@': '.--.-.',
        ')': '-.--.-',
        '(': '-.--.',
        ':': '---...',
        ',': '--..--',
        '=': '-...-',
        '!': '-.-.--',
        '.': '.-.-.-',
        '-': '-....-',
        '+': '.-.-.',
        '\"': '.-..-.',
        '?': '..--..',
        '/': '-..-.',

        // Other
        ' ': '/'
    };

    /**
     * Get the corresponding key from the value in the dictionary.
     * 
     * @param {Object} object The dictionary to search the key from the value.
     * @param {string} value  The value to get the key.
     * 
     * @returns {string | undefined} The value if it was in the dictionary.
     */
    const get_key_by_value = (object, value) => Object.keys(object).find(key => object[key] === value);

    return {

        /**
         * Encode a string to it's morse code equivalent.
         * 
         * @param {string} s The string to encode.
         *  
         * @returns {string} The encoded morse code.
         */
        encode(s){
            return s.trim().toUpperCase().split('').map(x => ENCODING_TABLE[x] === undefined ? '#' : ENCODING_TABLE[x]).join(' ').trim();
        },

        /**
         * Decode a string to it's ASCII string equivalent.
         * 
         * @param {string} s The string to decode.
         * 
         * @returns {string} The decoded ASCII string.
         */
        decode(s){
            return s.replaceAll('_', '-').split(' ').map(x => get_key_by_value(ENCODING_TABLE, x) === undefined ? '#' : get_key_by_value(ENCODING_TABLE, x)).join('');
        }

    }

})();