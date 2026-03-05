# 🌐 Aula 4 - API Simples

E aí, pessoal! 👋 

Este é o projeto da **Aula 4** onde aprendemos a criar uma API do zero e consumir essa API em uma aplicação mobile usando React Native com Expo. Vamos criar tanto o backend (API) quanto o frontend (app mobile)!

## 🎯 O que você vai encontrar aqui?

Este projeto é dividido em duas partes:

### 1. **API Backend** (pasta `api/`)
- 🚀 API simples criada com Express
- 🔌 Endpoint `/teste` que retorna "olá mundo"
- 🌐 Servidor rodando na porta 3000
- 🔓 Configurado com CORS para permitir requisições do mobile

### 2. **App Mobile** (pasta `consumindo-api-simples/`)
- 📱 App React Native criado com Expo
- 🔄 Faz requisições HTTP usando Axios
- ⏳ Mostra loading enquanto carrega os dados
- 📦 Exibe a resposta da API na tela

## 🛠️ O que você precisa ter na sua máquina?

Antes de começar, certifique-se de ter instalado:

### 1. **Node.js** (versão 18 ou superior)
   - Se você não tem, baixe em: [nodejs.org](https://nodejs.org/)
   - Para verificar se já está instalado, rode no terminal:
   ```bash
   node --version
   ```

### 2. **npm** (geralmente vem junto com o Node.js)
   - Para verificar:
   ```bash
   npm --version
   ```

### 3. **Git** (para clonar o repositório)
   - Baixe em: [git-scm.com](https://git-scm.com/)
   - Para verificar:
   ```bash
   git --version
   ```

### 4. **Expo Go** (no seu celular)
   - 📱 **Android**: [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - 🍎 **iOS**: [App Store](https://apps.apple.com/app/expo-go/id982107779)

## 📚 Como foi criado este projeto?

### Parte 1: Criando a API do Zero

#### Passo 1: Criar a pasta e inicializar o projeto
```bash
mkdir api
cd api
npm init -y
```

O comando `npm init -y` cria automaticamente um `package.json` com as configurações padrão.

#### Passo 2: Instalar as dependências da API
```bash
npm install express cors
```

- **express**: Framework web para Node.js que facilita criar APIs
- **cors**: Permite que o app mobile faça requisições para a API (resolve problemas de CORS)

#### Passo 3: Criar o arquivo da API
Crie o arquivo `api.js` com o seguinte conteúdo:

```javascript
const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

app.use(cors())

app.get('/teste', (req, res) => {
    res.send('olá mundo')
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})
```

#### Passo 4: Rodar a API
```bash
node api.js
```

A API estará rodando em: `http://localhost:3000/teste`

### Parte 2: Criando o App React Native

#### Passo 1: Criar o projeto com Expo
```bash
cd ..
npx create-expo-app@latest consumindo-api-simples
```

O comando `npx create-expo-app@latest` cria um novo projeto React Native com todas as configurações necessárias do Expo.

#### Passo 2: Entrar na pasta do projeto
```bash
cd consumindo-api-simples
```

#### Passo 3: Instalar o Axios
```bash
npm install axios
```

**O que é Axios?**
- 📦 Biblioteca JavaScript para fazer requisições HTTP
- 🚀 Mais fácil de usar que o `fetch()` nativo
- ✨ Suporta Promises automaticamente
- 🔧 Permite interceptors e configurações globais
- 📝 Melhor tratamento de erros

#### Passo 4: Modificar o arquivo `app/index.tsx`

O código implementado faz uma requisição GET para a API e exibe o resultado:

```typescript
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import axios from "axios";

export default function App() {
    const [value, setValue] = useState("")
    const [loading, setLoading] = useState(true)

    const requestApi = async () => {
        setTimeout(() => {
            axios.get("http://localhost:3000/teste").then((resp) => {
                console.log("RESPOSTA DA API", resp.data)
                setValue(resp.data)
            }).finally(() => {
                setLoading(false)
            })
        }, 3000)
    }

    useEffect(() => {
        requestApi()
    }, [])

    return(
        <View style={estilo.container}>
            {
                loading ? 
                <ActivityIndicator size={50}/> 
                    : 
                <Text>{value}</Text>
            }
        </View>
    )
}
```

**Explicação do código:**
- `useState`: Gerencia o estado do texto (`value`) e do loading (`loading`)
- `useEffect`: Executa a requisição quando o componente é montado
- `axios.get()`: Faz uma requisição GET para a API
- `ActivityIndicator`: Mostra um spinner de carregamento
- `setTimeout`: Simula um delay de 3 segundos (para ver o loading funcionando)

## 🚀 Como rodar o projeto completo?

### Passo 1: Iniciar a API

Abra um terminal e rode:

```bash
cd api
node api.js
```

Você deve ver a mensagem: `Servidor rodando na porta 3000`

**⚠️ IMPORTANTE:** Deixe este terminal aberto! A API precisa estar rodando para o app funcionar.

### Passo 2: Iniciar o App Mobile

Abra **outro terminal** (deixe o da API rodando) e rode:

```bash
cd consumindo-api-simples
npx expo start
```

### Passo 3: Abrir no dispositivo

Quando o projeto iniciar, você verá um QR Code no terminal. Agora é só:

1. Abra o app **Expo Go** no seu celular
2. Escaneie o QR Code que apareceu no terminal
3. Pronto! O app vai abrir no seu celular 🎉

**Dica:** 
- Se estiver no **Android**, pode usar a câmera normal do celular
- Se estiver no **iOS**, use a câmera do app Expo Go

## ⚠️ Problema comum: localhost no mobile

Quando você usa `http://localhost:3000` no app mobile, ele tenta acessar o localhost do **celular**, não do seu computador!

### Solução: Usar o IP da sua máquina

1. Descubra o IP do seu computador:
   - **Mac/Linux**: `ifconfig | grep "inet "` ou `ipconfig getifaddr en0`
   - **Windows**: `ipconfig` (procure por IPv4)

2. Substitua `localhost` pelo IP no código:
   ```typescript
   axios.get("http://SEU_IP_AQUI:3000/teste")
   ```
   
   Exemplo: `axios.get("http://192.168.1.100:3000/teste")`

3. Certifique-se de que seu celular e computador estão na **mesma rede Wi-Fi**

## 💻 Outras formas de rodar

### No emulador Android:
```bash
npm run android
```

### No simulador iOS (só funciona no Mac):
```bash
npm run ios
```

### No navegador (web):
```bash
npm run web
```

## 📚 Tecnologias usadas

### Backend (API):
- 🟢 **Node.js** - Runtime JavaScript
- 🚀 **Express** - Framework web para criar APIs
- 🔓 **CORS** - Permite requisições cross-origin

### Frontend (App Mobile):
- ⚛️ **React Native** - Framework para apps mobile
- 🚀 **Expo** - Plataforma que facilita o desenvolvimento
- 📘 **TypeScript** - JavaScript com tipagem
- 🧭 **Expo Router** - Navegação entre telas
- 📡 **Axios** - Biblioteca para requisições HTTP

## 🎓 Conceitos aprendidos nesta aula

### 1. **Criar uma API do zero**
   - Como inicializar um projeto Node.js com `npm init -y`
   - Como instalar e usar Express
   - Como criar endpoints (rotas)
   - Como configurar CORS

### 2. **Requisições HTTP com Axios**
   - Diferença entre `fetch()` e `axios`
   - Como fazer requisições GET
   - Como tratar respostas
   - Como usar Promises e `.then()`

### 3. **Estados assíncronos no React**
   - Como usar `useState` para gerenciar dados da API
   - Como usar `useEffect` para fazer requisições ao montar o componente
   - Como gerenciar estados de loading

### 4. **Componentes React Native**
   - `ActivityIndicator` - Mostrar loading
   - `Text` - Exibir texto
   - `View` - Container principal
   - `StyleSheet` - Estilização

## 📁 Estrutura do projeto

```
aula-4-api-simples/
├── api/                    # Backend - API Express
│   ├── api.js             # Arquivo principal da API
│   ├── package.json       # Dependências da API
│   └── node_modules/      # Bibliotecas instaladas
│
└── consumindo-api-simples/ # Frontend - App React Native
    ├── app/
    │   ├── index.tsx      # Tela principal que consome a API
    │   └── _layout.tsx    # Layout raiz
    ├── package.json       # Dependências do app
    └── node_modules/      # Bibliotecas instaladas
```

## 🤔 Problemas? Dúvidas?

Se algo não funcionar:

1. **API não inicia:**
   - Verifique se a porta 3000 não está sendo usada por outro processo
   - Certifique-se de ter instalado as dependências: `npm install` na pasta `api/`

2. **App não consegue conectar na API:**
   - Verifique se a API está rodando
   - Use o IP da sua máquina ao invés de `localhost`
   - Certifique-se de que celular e computador estão na mesma rede Wi-Fi

3. **Erro ao instalar dependências:**
   - Tente deletar a pasta `node_modules` e rodar `npm install` novamente
   - Certifique-se de que está usando a versão correta do Node.js (18+)

4. **App não abre no celular:**
   - Verifique se você e seu computador estão na mesma rede Wi-Fi
   - Tente fechar e abrir o Expo Go novamente

## 📝 Comandos úteis

### Para a API:
```bash
# Criar projeto
npm init -y

# Instalar dependências
npm install express cors

# Rodar a API
node api.js
```

### Para o App Mobile:
```bash
# Criar projeto
npx create-expo-app@latest consumindo-api-simples

# Instalar Axios
npm install axios

# Rodar o app
npx expo start
```

## 🎓 Próximos passos

Depois de rodar o projeto, experimente:

- ✅ Adicionar mais endpoints na API (POST, PUT, DELETE)
- ✅ Criar uma lista de itens retornados da API
- ✅ Adicionar tratamento de erros (try/catch)
- ✅ Implementar refresh (puxar para atualizar)
- ✅ Adicionar mais informações na resposta da API
- ✅ Criar uma tela de detalhes
- ✅ Usar outras APIs públicas

## 🔗 Recursos úteis

- [Documentação do Express](https://expressjs.com/)
- [Documentação do Axios](https://axios-http.com/docs/intro)
- [Documentação do React Native](https://reactnative.dev/)
- [Documentação do Expo](https://docs.expo.dev/)
- [HTTP Status Codes](https://httpstatuses.com/) - Referência de códigos HTTP

---

**Bons estudos e divirta-se codando!** 🚀✨
