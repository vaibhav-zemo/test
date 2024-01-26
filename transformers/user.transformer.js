const dayjs = require('dayjs');

const userTransformer = {
    transform: (data) => {
        return {
            userId: data.persona?.userId,
            id: data.persona?._id,
            token: data.token,
        }
    }
}

const getUserTransformer = {
    transform: (user) => {
        return {
            id: user?._id,
            userName: user?.userName,
            phoneNumber: user?.phoneNumber,
            email: user?.email,
            gender: user?.gender,
            address: user?.address.map((address) => {
                return {
                    street: address.street,
                    city: address.city,
                    state: address.state,
                    pinCode: address.pinCode,
                    id: address._id
                }
            }),
            role: user?.role,
            dob: dayjs(user?.dob).format('DD/MM/YYYY'),
        }
    }
}

const userListTransformer = {
    transform: (userList) => {
        const response = {}
        response.list = userList.map(user => {
            return getUserTransformer.transform(user)
        })
        return response
    }
}



module.exports = { userTransformer, getUserTransformer, userListTransformer };