const Category = require('../models/category.model');
const City = require('../models/city.model');

const show = async ({ city, categoryName }) => {
    try {
        const searchCity = await City.findOne({ name: city });
        if (!searchCity) {
            throw new Error('City not found');
        }
        const category = await Category.findOne({ city: searchCity._id, name: categoryName });
        if (!category) {
            throw new Error('Category not found');
        }

        return category;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { show }