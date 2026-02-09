let mailIdCount = 0;
export const mailIdCounter = () => {
    if (mailIdCount >= 1) {
        mailIdCount = 0;
    }
    else {
        mailIdCount++;
    }
};
export const getMailIdCount = () => {
    return mailIdCount;
};
