export const paymentSignatureGenerator = (obj, merchantAccount = process.env.MERCHANT_ACCOUNT || "", secretKey = process.env.SECRET_KEY || "") => {
    const body = {
        merchantAccount,
        merchantDomainName: obj.merchantDomainName,
        orderReference: obj.orderReference,
        orderDate: obj.orderDate,
        amount: obj.amount,
        currency: obj.currency,
        productName: obj.productName,
        productCount: obj.productCount,
        productPrice: obj.productPrice,
    };
    const valuesString = Object.values(body).flat().join(';');

    return crypto.createHmac('md5', secretKey).update(valuesString).digest('hex');
};