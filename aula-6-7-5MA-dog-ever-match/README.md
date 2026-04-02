## Projeto da Aula 6 e 7 – Desenvolvimento Mobile com React Native e Expo

Este repositório é o resultado do que construímos juntos em sala nas aulas 6 e 7, explorando desenvolvimento mobile com **React Native**, **Expo** e **expo-router**. A ideia é que você use este projeto como um “guia de estudo”: para lembrar o que foi feito, entender como as coisas se encaixam e ter um ponto de partida para experimentar por conta própria.

---

## O que foi trabalhado em aula

- **Começando o projeto com Expo**
  - Vimos como criar um projeto usando a CLI do Expo.
  - Conversamos sobre a estrutura básica que o `expo-router` cria (pasta `app`, telas, navegação).
  - Entendemos na prática a diferença entre rodar no emulador e no celular usando o app Expo Go.

- **Navegação com expo-router e React Navigation**
  - Configuramos a navegação em pilha (Stack) usando o arquivo de layout principal.
  - Falamos sobre rotas baseadas em arquivos: cada arquivo dentro de `app` vira uma tela ou um agrupador de telas.
  - Ajustamos opções de tela, como esconder o cabeçalho padrão para ficar mais com a nossa cara.

- **Telas e estilos organizados**
  - Criamos uma tela de **Home** em `src/screens/home`.
  - Separarmos o que é estrutura/lógica (`home.tsx`) do que é visual (`styles.ts`), para deixar o código limpo e fácil de manter.
  - Usamos componentes básicos do React Native (views, textos, botões, etc.) para montar a interface.

- **Consumindo uma API externa (API de cachorros / “dogs”)**
  - Relembramos o que é uma **requisição HTTP** em apps mobile.
  - Utilizamos uma API externa (como a de imagens de cachorros) para trazer dados reais para o app.
  - Conversamos sobre o fluxo de dados: buscar na API, guardar no estado, mostrar na tela e tratar situações de erro.

- **Tema e aparência do app**
  - Vimos o uso de temas (`DefaultTheme`, `DarkTheme`) e do `ThemeProvider` do React Navigation.
  - Entendemos como o tema influencia as cores e o visual geral de navegação do app.

---

## Bibliotecas e ferramentas principais utilizadas

- **Expo**
  - É o “kit de ferramentas” que facilita a nossa vida no React Native.
  - Cuida da parte nativa, build, testes em dispositivos e ainda traz vários módulos prontos (câmera, sensores, etc.).

- **React Native**
  - É a base de tudo: a biblioteca que permite criar apps nativos usando JavaScript/TypeScript.
  - Com ela montamos a interface com componentes declarativos que funcionam em iOS e Android.

- **expo-router**
  - Sistema de rotas baseado em arquivos.
  - Em vez de ficar registrando rota em vários lugares, ele lê a pasta `app` e monta a navegação para você.

- **@react-navigation/native**
  - Biblioteca de navegação que trabalha junto com o `expo-router`.
  - Permite criar navegação em pilha, abas, drawer, e controlar headers, temas e muito mais.

- **react-native-reanimated**
  - Biblioteca para animações avançadas e performáticas.
  - Mesmo que não tenhamos ido a fundo nela ainda, ela é importante para a stack moderna de navegação.

---

## Conceitos de desenvolvimento mobile reforçados

- **Componentização**
  - Em vez de um arquivo gigante, quebrar a interface em pedaços reaproveitáveis.
  - Separar bem o que é lógica, o que é visual e o que são estilos, facilitando manutenção e evolução do projeto.

- **Estado e ciclo de vida**
  - Usar estado para guardar os dados vindos da API e decidir o que aparece na tela.
  - Entender em que momento buscar dados (por exemplo, quando a tela é carregada) e como reagir quando algo muda.

- **Responsividade e experiência do usuário**
  - Pensar em layouts que ficam bons em telas diferentes, sem quebrar no primeiro celular mais “diferentão”.
  - Dar feedback para o usuário: mostrar que está carregando, tratar erros e não deixar tudo vazio sem explicação.

---

## Como estudar a partir deste projeto

- **Dar uma olhada nas telas e estilos**
  - Abra os arquivos de tela (como a Home) e tente identificar:
    - Quais componentes do React Native estão sendo usados.
    - Onde o estado é criado e atualizado.
    - Como os estilos estão organizados e aplicados.

- **Seguir o fluxo de navegação**
  - Veja como a navegação foi configurada nos arquivos de layout.
  - Entenda qual é a primeira tela que o app abre e como ele muda de uma tela para outra.

- **Observar o consumo de API**
  - Descubra onde a requisição HTTP é feita.
  - Veja como a resposta da API vira informação na tela.

---

## Documentações recomendadas para aprofundar

- **Documentação oficial do React Native**  
  - Para entender bem os componentes, APIs nativas e boas práticas.

- **Documentação do Expo**  
  - Para aprender a criar projetos, rodar no celular, usar módulos prontos e gerar builds.

- **Documentação do expo-router**  
  - Para dominar rotas baseadas em arquivos, layouts aninhados e navegação mais avançada.

- **Documentação do React Navigation (@react-navigation/native)**  
  - Para explorar melhor Stack, Tabs, Drawer, headers personalizados, temas, parâmetros de rota, etc.

- **Documentação da API utilizada (ex.: API de cachorros)**  
  - Para ver quais endpoints existem, como são as respostas e como você pode ir além do que fizemos em aula.

---

## Próximos passos sugeridos para você

- Criar **novas telas** reaproveitando a estrutura que usamos em aula.
- Brincar com o layout e os estilos da Home para deixar o app com a sua identidade visual.
- Consumir **outro endpoint** da mesma API ou até testar uma API diferente.
- Melhorar os feedbacks visuais de carregamento e erro, deixando o app mais “profissional”.
- Ir abrindo as documentações indicadas enquanto mexe no projeto, para ligar teoria e prática.

Este README é um resumo do que rolou em aula e um ponto de partida para você continuar estudando. Volte aqui sempre que precisar relembrar os conceitos e use o projeto para experimentar sem medo.
