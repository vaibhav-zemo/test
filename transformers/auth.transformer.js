const authTransformer = {
    transform: (data) => {
        return {
            userId: data?.userId,
            otp: data?.otp,
            message: data?.message
        }
    }
}

module.exports = { authTransformer };