"use strict";
/**
 * JavaScript implementation of the rotation algorithm.
 * 
 * ROT13 (Rotate13, "rotate by 13 places", sometimes hyphenated ROT-13) is a simple letter 
 * substitution cipher that replaces a letter with the 13th letter after it in the Latin alphabet. 
 * ROT13 is a special case of the Caesar cipher which was developed in ancient Rome. 
 * 
 * @link   https://en.wikipedia.org/wiki/ROT13
 * @link   https://en.wikipedia.org/wiki/Caesar_cipher
 * @file   This file defines the rot global constant.
 * @author Korosium
 */
const rot = (() => {

    const ASCII_NUMBER = { start: 48, end: 57 };
    const ASCII_UPPERCASE = { start: 65, end: 90 };
    const ASCII_LOWERCASE = { start: 97, end: 122 };
    const ASCII_PRINTABLE = { start: 33, end: 126 };

    /**
     * Get all the numbers from the ASCII table.
     * 
     * @returns {string[]} The string array containing the numbers.
     */
    const get_numbers = () => {
        let retval = [];
        for (let i = ASCII_NUMBER.start; i <= ASCII_NUMBER.end; i++) {
            retval.push(String.fromCharCode(i));
        }
        return retval;
    };

    /**
     * Get all the lowercase letters from the ASCII table.
     * 
     * @returns {string[]} The string array containing the lowercase letters.
     */
    const get_letters = () => {
        let retval = [];
        for (let i = ASCII_LOWERCASE.start; i <= ASCII_LOWERCASE.end; i++) {
            retval.push(String.fromCharCode(i));
        }
        return retval;
    };

    /**
     * Get all the ASCII printable characters.
     * 
     * @returns {string[]} The string array containing the whole printable ASCII table minus the space.
     */
    const get_ascii_printable = () => {
        let retval = [];
        for (let i = ASCII_PRINTABLE.start; i <= ASCII_PRINTABLE.end; i++) {
            retval.push(String.fromCharCode(i));
        }
        return retval;
    };

    /**
     * Check if a character is uppercase.
     * 
     * @param {string} c The character to check.
     * 
     * @returns {boolean} True if uppercase, false otherwise.
     */
    const is_uppercase = c => c.charCodeAt() >= ASCII_UPPERCASE.start && c.charCodeAt() <= ASCII_UPPERCASE.end;

    /**
     * Encode or decode a string using the specified amount of offset.
     * 
     * @param {string} s              The string to encode or decode.
     * @param {number} numbers_offset By how many numbers the number should be replaced with.
     * @param {number} letters_offset By how many letters the letter should be replaced with.
     * 
     * @returns {string} The converted string.
     */
    const process = (s, numbers_offset, letters_offset) => {
        const numbers = get_numbers();
        const letters = get_letters();
        let arr = s.split('');
        let retval = '';
        for (let i = 0; i < arr.length; i++) {
            const c = arr[i];
            if (numbers.indexOf(c) !== -1 && numbers_offset !== 0) {
                retval += numbers[(numbers.indexOf(c) + numbers_offset) % numbers.length];
            }
            else if (letters.indexOf(c.toLowerCase()) !== -1 && letters_offset !== 0) {
                const found = letters[(letters.indexOf(c.toLowerCase()) + letters_offset) % letters.length];
                retval += is_uppercase(c) ? found.toUpperCase() : found;
            }
            else {
                retval += c;
            }
        }
        return retval;
    };

    /**
     * Encode or decode a string with the ROT47 logic.
     * 
     * @param {string} s The string to encode or decode.
     * 
     * @returns {string} The converted string.
     */
    const process_47 = s => {
        const printable = get_ascii_printable();
        let arr = s.split('');
        let retval = '';
        for(let i = 0; i < arr.length; i++){
            const c = arr[i];
            if(printable.indexOf(c) !== -1){
                retval += printable[(printable.indexOf(c) + 47) % printable.length];
            }
            else{
                retval += c;
            }
        }
        return retval;
    };

    return {

        /**
         * [0-9] Rotate only the numbers of a string.
         * 
         * @param {string} s The string to encode or decode.
         * 
         * @returns {string} The encoded or decoded string.
         */
        rot5(s) {
            return process(s, 5, 0);
        },

        /**
         * [A-Z, a-z] Rotate only the letters of a string.
         * 
         * @param {string} s The string to encode or decode.
         * 
         * @returns {string} The encoded or decoded string.
         */
        rot13(s) {
            return process(s, 0, 13);
        },

        /**
         * [0-9, A-Z, a-z] Rotate the numbers and the letters of a string.
         * 
         * @param {string} s The string to encode or decode.
         * 
         * @returns {string} The encoded or decoded string.
         */
        rot18(s) {
            return process(s, 5, 13);
        },

        /**
         * [!-~] Rotate everything in the string.
         * 
         * @param {string} s The string to encode or decode.
         * 
         * @returns {string} The encoded or decoded string.
         */
        rot47(s) {
            return process_47(s);
        }

    }

})();