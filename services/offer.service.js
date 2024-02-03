const Offer = require('../models/offer.model');
const City = require('../models/city.model');
const csv = require('csvtojson');

const create = async ({ data }) => {
    try {
        const city = await City.findOne({ name: data.city });
        if (!city) {
            throw new Error('City not found');
        }

        const offer = new Offer({
            title: data.title,
            description: data.description,
            imageUrl: data.imageUrl,
            city: city._id,
        });
        await offer.save();

        return offer;
    } catch (error) {
        throw new Error(error.message);
    }
}

const list = async ({ city }) => {
    try {
        const searchCity = await City.findOne({ name: city });
        if (!searchCity) {
            throw new Error('City not found');
        }

        const offers = await Offer.find({ city: searchCity._id });
        return offers;
    } catch (error) {
        throw new Error(error.message);
    }
}

const bulkUpload = async ({ file }) => {
    try {
        csv()
            .fromString(file.buffer.toString())
            .then(async (json) => {
                for (let offer of json) {
                    const city = await City.findOne({ name: offer.city });
                    if (!city) {
                        throw new Error('City not found');
                    }
                }

                for (let offer of json) {
                    const city = await City.findOne({ name: offer.city });
                    const newOffer = new Offer({
                        title: offer.title,
                        description: offer.description,
                        imageUrl: offer.imageUrl,
                        city: city._id,
                    });
                    await newOffer.save();
                }
            })
            .catch((err) => {
                throw new Error(err.message);
            });

        return { message: 'Offers created' };
    }
    catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    create,
    list,
    bulkUpload
}