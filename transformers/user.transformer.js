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
            address: {
                houseNumber: user?.address?.houseNumber,
                area: user?.address?.area,
                city: user?.address?.city,
                state: user?.address?.state,
                pinCode: user?.address?.pinCode,
            },
            role: user?.role,
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