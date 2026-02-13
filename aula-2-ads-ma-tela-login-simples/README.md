# Aula 2 - Tela de Login Simples

Este é um projeto [Expo](https://expo.dev) desenvolvido com React Native para criar uma tela de login simples.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Git](https://git-scm.com/)
- [Expo Go](https://expo.dev/go) no seu dispositivo móvel (opcional, para testar no celular)

## 🚀 Como rodar o projeto

### 1. Clonar o repositório

Primeiro, clone o repositório para o seu computador:

```bash
git clone <URL_DO_REPOSITORIO>
```

Depois, entre na pasta do projeto:

```bash
cd aula-1-tela-login-simples
```

### 2. Instalar dependências

Instale todas as dependências necessárias do projeto:

```bash
npm install
```

### 3. Iniciar o projeto

Para iniciar o servidor de desenvolvimento:

```bash
npm run start
```

Ou você pode usar:

```bash
npx expo start
```

### 4. Executar em diferentes plataformas

Após iniciar o projeto, você verá um QR code no terminal. Você pode:

- **Android**: Pressione `a` no terminal ou execute `npm run android` (requer Android Studio e emulador configurado)
- **iOS**: Pressione `i` no terminal ou execute `npm run ios` (requer Xcode e simulador configurado - apenas macOS)
- **Web**: Pressione `w` no terminal ou execute `npm run web`
- **Expo Go**: Escaneie o QR code com o app Expo Go no seu celular

## 📱 Testando no dispositivo móvel

1. Instale o app **Expo Go** na App Store (iOS) ou Google Play Store (Android)
2. Execute `npm run start` no terminal
3. Escaneie o QR code que aparece no terminal com o app Expo Go
4. O app será carregado no seu dispositivo

## 📁 Estrutura do projeto

```
aula-1-tela-login-simples/
├── app/                 # Rotas e páginas principais
├── src/
│   ├── components/      # Componentes reutilizáveis
│   ├── screens/         # Telas da aplicação
│   └── assets/          # Imagens e recursos
├── package.json         # Dependências do projeto
└── README.md           # Este arquivo
```

## 🛠️ Comandos disponíveis

- `npm run start` - Inicia o servidor de desenvolvimento
- `npm run android` - Inicia no emulador Android
- `npm run ios` - Inicia no simulador iOS
- `npm run web` - Inicia no navegador web
- `npm run lint` - Executa o linter para verificar erros de código

## 📚 Recursos úteis

- [Documentação do Expo](https://docs.expo.dev/)
- [Documentação do React Native](https://reactnative.dev/)
- [Tutorial do Expo](https://docs.expo.dev/tutorial/introduction/)

## 💡 Dicas

- Se encontrar erros, tente limpar o cache: `npx expo start -c`
- Certifique-se de que todas as dependências foram instaladas corretamente
- Para desenvolvimento, recomenda-se usar o Expo Go para testes rápidos
