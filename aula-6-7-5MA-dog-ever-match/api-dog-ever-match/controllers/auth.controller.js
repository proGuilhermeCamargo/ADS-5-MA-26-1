// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');
const { Sequelize } = require('sequelize');

// Função para criar um novo usuário
const register = async (req, res) => {
  const { username, password, email } = req.body;

  // Verifica se todos os campos obrigatórios foram fornecidos
  if (!username || !password || !email) {
    return res.status(400).json({ error: 'Usuário, senha e e-mail são obrigatórios' });
  }

  try {
    // Verifica se o username ou email já existe
    const existingUser = await User.findOne({ 
      where: {
        [Sequelize.Op.or]: [
          { username },
          { email }
        ]
      } 
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Nome de usuário ou e-mail já existente' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o novo usuário
    const user = await User.create({ username, password: hashedPassword, email });

    // Retorna a resposta com o novo usuário (omitindo a senha)
    res.status(201).json({ message: 'Usuário criado com sucesso', user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Função para autenticar um usuário
const login = async (req, res) => {
  const { email, password } = req.body;

  // Verifica se todos os campos obrigatórios foram fornecidos
  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  try {
    // Busca o usuário pelo email
    const user = await User.findOne({ where: { email } });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Gera um token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'default_jwt_secret',
      { expiresIn: '5h' }
    );
    console.log('######################', token)
    // Retorna a resposta com o token JWT
    res.json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Função de teste
const getTeste = async (req, res) => {
  res.json({ message: 'OLÁ MUNDO' });
};

module.exports = { register, login, getTeste };
