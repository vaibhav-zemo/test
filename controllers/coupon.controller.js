const {isValidForCreate, isValidForUpdate} = require('../validators/coupon.validator')
const couponService = require('../services/coupon.service')
const {couponTransformer, couponListTransformer} = require('../transformers/coupon.transformer')
const create = async (req, res) => {
    try {
        
        const {error, value} = isValidForCreate.validate(req.body)
        if(error) {
            return res.status(400).json({message: error.message})
        }

        return res.status(200).json(couponTransformer.transform(await couponService.create({ data: value, user: res.locals.user})))
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

const update = async (req, res) => {
    try{
        const {error, value} = isValidForUpdate.validate(req.body)
        if(error){
            return res.status(400).json({message: error.message})
        }

        return res.status(200).json(couponTransformer.transform(await couponService.update({id: req.params.id, data: value, user: res.locals.user})))
    }
    catch(err){
        return res.status(500).json({message: 'Internal Server Error'})
    }
}

const list = async (req, res) => {
    try{
        return res.status(200).json(couponListTransformer.transform(await couponService.list()))
    }
    catch(err){
        return res.status(500).json({message: 'Internal Server Error'})
    }
}

module.exports = {create, update, list}