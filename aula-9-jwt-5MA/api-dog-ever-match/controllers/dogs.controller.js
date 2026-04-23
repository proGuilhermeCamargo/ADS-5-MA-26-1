const Dogs = require('../models/dogs.models');
const { Op } = require('sequelize');
const sequelize = require('../sequelize')


const getAllDogs = async (req, res) => {
    try {
    console.log('CHEGOU AQ')
        const dogs = await Dogs.findAll(); 
        res.status(200).json(dogs); 
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        res.status(500).json({ message: 'Erro ao buscar os dados dos cachorros' });
    }
};

const getAllDogsPerOrder = async (req, res) => {
    try {
        const { size, years, gender } = req.query;

        const where = {};
        if (size) {
            where.size = { [Op.like]: size };
        }
        if (gender) {
            where.gender = { [Op.like]: gender };
        }

        let dogs;
        if (years) {
            const parsedYears = parseFloat(years);
            
            const nearbyDogs = await Dogs.findAll({
                where: {
                    ...where,
                    years: {
                        [Op.between]: [parsedYears - 1, parsedYears + 1], 
                    },
                },
                order: [
                    [sequelize.literal(`ABS(years - ${parsedYears})`), 'ASC'],
                    ['size', 'DESC'],
                    ['gender', 'DESC']
                ]
            });

            const otherDogs = await Dogs.findAll({
                where: {
                    ...where,
                    years: {
                        [Op.notBetween]: [parsedYears - 1, parsedYears + 1],
                    },
                },
                order: [
                    ['size', 'DESC'],
                    ['gender', 'DESC']
                ]
            });

            dogs = [...nearbyDogs, ...otherDogs];
        } else {
            dogs = await Dogs.findAll({
                where,
                order: [
                    ['size', 'DESC'],
                    ['gender', 'DESC']
                ]
            });
        }

        const formattedDogs = dogs.map(dog => ({
            ...dog.toJSON(),  
            image: dog.image.map(img => `${img} Image preview`), 
        }));

        res.status(200).json(formattedDogs);
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        res.status(500).json({ message: 'Erro ao buscar os dados dos cachorros' });
    }
};

module.exports = { getAllDogs, getAllDogsPerOrder };
