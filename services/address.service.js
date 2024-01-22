const User = require('../models/user.model')
const Address = require('../models/address.model')

const create = async ({ data }) => {
    try {
        const user = await User.findById(data.userId);
        if (!user) throw new Error("User not found");

        const address = new Address(data);
        await address.save();

        user.address.push(address);
        await user.save();
        
        return address;
    }
    catch (err) {
        throw new Error(err)
    }
}

const update = async ({ addressId, data }) => {
    try {
        const address = await Address.findByIdAndUpdate(
            addressId,
            { $set: data },
            { new: true }
        )
        if(!address) throw new Error("Address not found");

        return address;
    }
    catch (err) {
        throw new Error(err)
    }
}

const remove = async ({addressId}) => {
    try {
        const address = await Address.findById(addressId)
        if(!address) throw new Error("Address not found");

        const user = await User.findById(address.userId);
        if(!user) throw new Error("User not found");

        for(let addressId of user.address) {
            if(addressId.toString() === address._id.toString()) {
                user.address.pull(addressId);
                break;
            }
        }

        await user.save();
        await Address.findByIdAndDelete(addressId);
        return {message: "Address deleted successfully"};
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { create, update, remove }

