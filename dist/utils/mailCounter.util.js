"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMailIdCount = exports.mailIdCounter = void 0;
let mailIdCount = 0;
const mailIdCounter = () => {
    if (mailIdCount >= 1) {
        mailIdCount = 0;
    }
    else {
        mailIdCount++;
    }
};
exports.mailIdCounter = mailIdCounter;
const getMailIdCount = () => {
    return mailIdCount;
};
exports.getMailIdCount = getMailIdCount;
