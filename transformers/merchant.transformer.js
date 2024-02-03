const merchantTransformer = {
    transform: (merchant) => {
        return {
            merchantId: merchant?._id,
            isVerified: merchant?.isVerified,
            isAvailable: merchant?.isAvailable,
            city: merchant?.city,
            license: merchant?.license,
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

module.exports = { merchantTransformer, merchantListTransformer };