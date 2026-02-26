# 📝 Aula 3 - To-Do List App

E aí, pessoal! 👋 

Este é o projeto da **Aula 3** onde criamos uma aplicação de lista de tarefas (To-Do List) usando React Native com Expo. É um app simples mas bem legal para aprender os conceitos básicos de estado, listas e componentes no React Native!

## 🎯 O que você vai encontrar aqui?

Uma aplicação mobile onde você pode:
- ✅ Adicionar tarefas na sua lista
- 📋 Ver todas as suas tarefas
- 🎨 Interface simples e direta

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

### 4. **Expo CLI** (opcional, mas recomendado)
   - Você pode instalar globalmente:
   ```bash
   npm install -g expo-cli
   ```
   - Ou usar o `npx` que já vem com o npm (não precisa instalar nada!)

### 5. **Expo Go** (no seu celular)
   - 📱 **Android**: [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - 🍎 **iOS**: [App Store](https://apps.apple.com/app/expo-go/id982107779)

## 🚀 Como começar?

### Passo 1: Clone o repositório

Abra o terminal na pasta onde você quer salvar o projeto e rode:

```bash
git clone <URL_DO_REPOSITORIO>
```

Depois, entre na pasta do projeto:

```bash
cd aula-3-to-do-list
```

### Passo 2: Instale as dependências

Agora é só instalar todas as bibliotecas que o projeto precisa:

```bash
npm install
```

Isso pode levar alguns minutinhos, então aproveite para tomar um café ☕ enquanto espera!

### Passo 3: Inicie o projeto

Depois que a instalação terminar, rode:

```bash
npx expo start
```

Ou se você instalou o Expo CLI globalmente:

```bash
expo start
```

### Passo 4: Abra no seu dispositivo

Quando o projeto iniciar, você verá um QR Code no terminal. Agora é só:

1. Abra o app **Expo Go** no seu celular
2. Escaneie o QR Code que apareceu no terminal
3. Pronto! O app vai abrir no seu celular 🎉

**Dica:** 
- Se estiver no **Android**, pode usar a câmera normal do celular
- Se estiver no **iOS**, use a câmera do app Expo Go

## 💻 Outras formas de rodar

Se você quiser testar em outros ambientes:

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

- ⚛️ **React Native** - Framework para apps mobile
- 🚀 **Expo** - Plataforma que facilita o desenvolvimento
- 📘 **TypeScript** - JavaScript com tipagem
- 🧭 **Expo Router** - Navegação entre telas

## 🤔 Problemas? Dúvidas?

Se algo não funcionar:

1. Verifique se todas as dependências foram instaladas corretamente
2. Tente deletar a pasta `node_modules` e rodar `npm install` novamente
3. Certifique-se de que está usando a versão correta do Node.js
4. Se o app não abrir no celular, verifique se você e seu computador estão na mesma rede Wi-Fi

## 🎓 Próximos passos

Depois de rodar o projeto, explore o código:
- Veja como funciona o estado com `useState`
- Entenda como o `FlatList` renderiza os itens
- Experimente adicionar novas funcionalidades (como deletar tarefas, por exemplo!)

---

**Bons estudos e divirta-se codando!** 🚀✨
