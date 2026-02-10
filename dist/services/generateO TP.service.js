"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = void 0;
/**
 * Generates a numeric OTP
 * @param length number of digits in the OTP (default is 6)
 * @returns generated OTP as a string
 */
const generateOTP = (length = 4) => {
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * digits.length)];
    }
    return otp;
};
exports.generateOTP = generateOTP;
