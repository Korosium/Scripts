"use strict";
/**
 * JavaScript implementation of the HOTP and TOTP algorithms.
 * 
 * HMAC-based one-time password (HOTP) is a one-time password (OTP) algorithm based upon a 
 * Hash-based Message Authentication Code (HMAC). When a client attempts to access a server, 
 * a challenge is sent by the destination server to the client. The client then computes a response 
 * which represents a one time password. This often forms part of multi-factor authentication protocols 
 * such as the Open Authentication initiative (OATH) challenge-response algorithm
 * 
 * Time-based one-time password (TOTP) is a computer algorithm that generates a one-time password (OTP) 
 * using the current time as a source of uniqueness. As an extension of the 
 * HMAC-based one-time password (HOTP) algorithm, it has been adopted as Internet Engineering Task Force (IETF) 
 * standard RFC 6238
 * 
 * @link   https://en.wikipedia.org/wiki/HMAC-based_one-time_password
 * @link   https://en.wikipedia.org/wiki/Time-based_one-time_password
 * @link   https://datatracker.ietf.org/doc/html/rfc4226
 * @link   https://datatracker.ietf.org/doc/html/rfc6238
 * @file   This file defines the otp global constant.
 * @author Korosium
 */
const otp = (() => {

    /**
     * The implementation of HMAC-based one-time password (HOTP)
     */
    const hotp = (() => {

        /**
         * Convert a counter to a byte array of 8 bytes.
         * 
         * @param {number} counter The number to convert.
         * 
         * @returns {number[]} The 8 bytes array.
         */
        const counter_to_arr = counter => {
            const halfway = counter.toString(16).padStart(16, "0");
            let arr = [];
            for (let i = 0; i < halfway.length; i += 2) {
                arr.push(parseInt(halfway.slice(i, i + 2), 16))
            }
            return arr;
        };

        /**
         * Truncate the MAC to a 6, 7 or 8 digits number.
         * 
         * @param {number[]} mac    The MAC to truncate.
         * @param {number}   digits The number of digits.
         * 
         * @returns {string} The truncated MAC.
         */
        const truncate = (mac, digits) => {
            const offset = mac[mac.length - 1] & 0xf;
            const p = mac.slice(offset, offset + 4);
            p[0] &= 0x7f;
            return (parseInt(p.map(x => x.toString(16).padStart(2, "0")).join(''), 16) % 10 ** digits).toString().padStart(digits, "0");
        };

        return {

            /**
             * Generate a HOTP of 6, 7 or 8 digits.
             * 
             * @param {number[] | string | Uint8Array | ArrayBuffer} secret  The shared secret.
             * @param {number}                                       counter The counter.
             * @param {number}                                       digits  The number of digits in the resulting HOTP.
             * @param {string}                                       algo    The hash algorithm used to generate the HOTP.
             * 
             * @returns {string} The numeric string.
             */
            generate(secret, counter, digits = 6, algo = "sha1") {
                const byte_counter = counter_to_arr(counter);
                switch (algo.toLowerCase()) {
                    case "sha1":
                    case "sha-1": return truncate(sha1.hmac.array(secret, byte_counter), digits);

                    case "sha256":
                    case "sha-256": return truncate(sha256.hmac.array(secret, byte_counter), digits);

                    case "sha512":
                    case "sha-512": return truncate(sha512.hmac.array(secret, byte_counter), digits);

                    default: throw new Error("Wrong hash algorithm");
                }
            }

        }

    })();

    /**
     * The implementation of time-based one-time password (TOTP)
     */
    const totp = (() => {

        /**
         * Get the current amount of seconds elapsed since midnight, January 1, 1970 (UTC).
         * 
         * @returns {number} The number of seconds since epoch.
         */
        const get_current_seconds_since_epoch = () => parseInt(Date.now() / 1000);

        return {

            /**
             * Generate a TOTP of 6, 7 or 8 digits.
             * 
             * @param {number[] | string | Uint8Array | ArrayBuffer} secret  The shared secret.
             * @param {string}                                       algo    The hash algorithm used to generate the TOTP.
             * @param {number}                                       refresh The time between two tokens.
             * @param {number}                                       digits  The number of digits in the resulting TOTP.
             * @param {number}                                       time    The number of seconds since epoch.
             * 
             * @returns {{"token": string; "remaining": number}} 
             */
            generate(secret, algo = "sha1", refresh = 30, digits = 6, time = get_current_seconds_since_epoch()) {
                const interval = parseInt(time / refresh);
                const next_window = interval * refresh + refresh;
                const remaining_seconds = next_window - time;
                const token = hotp.generate(secret, interval, digits, algo);
                return {
                    "token": token,
                    "remaining": remaining_seconds
                }
            }

        }

    })();

    return {

        hotp: hotp,
        totp: totp

    }

})();
