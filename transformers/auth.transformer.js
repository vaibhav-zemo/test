const authTransformer = {
    transform: (data) => {
        return {
            userId: data?.userId,
            otp: data?.otp,
        }
    }
}

module.exports = { authTransformer };