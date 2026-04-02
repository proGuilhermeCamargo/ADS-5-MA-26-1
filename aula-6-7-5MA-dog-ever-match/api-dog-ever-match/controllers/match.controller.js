const Match = require('../models/match.model');

const getMatch = async (req, res) => {
    try {
    console.log('CHEGOU AQ')
        const dogs = await Match.findAll(); 
        res.status(200).json(dogs); 
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        res.status(500).json({ message: 'Erro ao buscar os dados dos match' });
    }
};


const postMatch = async (req, res) => {
  try {
    const {
      name,
      description,
      years,
      contact,
      address,
      gender,
      image,
      size
    } = req.body;

    console.log('req.body', req.body);

    if (!name || !description || !years || !contact || !address || !gender || !image || !size) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    // Verificar se já existe um registro com os mesmos dados
    const existingMatch = await Match.findOne({
      where: {
        name,
        description,
        years,
        contact,
        address,
        gender,
        size,
        image: JSON.stringify(image)
      }
    });

    if (existingMatch) {
      return res.status(400).json({ error: 'Registro já existe' });
    }

    // Criar o novo registro
    const match = await Match.create({
      name,
      description,
      years,
      contact,
      address,
      gender,
      image,
      size
    });

    // Retorna o registro criado
    console.log('match', match);
    res.status(201).json(match);
  } catch (error) {
    console.error('Erro ao criar registro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = { getMatch, postMatch };

