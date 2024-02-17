const dayjs = require('dayjs');

const merchantTransformer = {
    transform: (merchant) => {
        return {
            userId: merchant?.userId._id,
            name: merchant?.userId?.userName,
            email: merchant?.userId?.email,
            phoneNumber: merchant?.userId?.phoneNumber,
            merchantId: merchant?._id,
            isVerified: merchant?.isVerified,
            isAvailable: merchant?.isAvailable,
            city: merchant?.city,
            license: merchant?.license,
            bankDetails: {
                accountNumber: merchant?.bankDetails?.accountNumber,
                ifsc: merchant?.bankDetails?.ifsc,
                branchName: merchant?.bankDetails?.branchName,
                accountHolderName: merchant?.bankDetails?.accountHolderName,
            }
        }
    }
}

const merchantListTransformer = {
    transform: (merchants) => {
        const response = {};
        response.list = merchants.map(merchant => {
            return merchantTransformer.transform(merchant);
        })
        return response;
    }
}

const merchantOrder = {
    transform: (order) => {
        return {
            orderId: order?._id,
            address: order?.address,
            odt: dayjs(order?.createdAt).add(90, 'm').format('hh:mm A'),
        }
    }
}

const merchantOrderList = {
    transform: (orders) => {
        const response = {};
        response.list = orders.map(order => {
            return merchantOrder.transform(order);
        })
        return response;
    }
}

module.exports = { merchantTransformer, merchantListTransformer, merchantOrderList };