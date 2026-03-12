# Aula 5 – Introdução ao Redux (Redux Toolkit)

E aí! 👋  
Nesta aula a gente coloca **estado global** no jogo: um mesmo dado (um contador) que aparece em duas telas e continua igual quando você navega entre elas. Tudo isso usando **Redux Toolkit** e **React-Redux** em um app React Native com Expo.

Se você já se perguntou “como faço pra uma tela saber o que a outra está mostrando?” ou “como evito ficar passando props pra cima e pra baixo?”, o Redux é uma das respostas. Aqui a gente monta o fluxo do zero: store, slice, Provider e uso nas telas.

---

## 📚 Documentação que a gente usou na aula

Antes de mergulhar no código, vale ter esses links à mão (e até dar uma olhada rápida):

- **Redux Toolkit (visão geral)** – [redux-toolkit.js.org](https://redux-toolkit.js.org/)  
  Entender o que é o RTK e por que ele simplifica o Redux.

- **Redux Toolkit – Quick Start** – [redux-toolkit.js.org/tutorials/quick-start](https://redux-toolkit.js.org/tutorials/quick-start)  
  Passo a passo oficial: store, slice, Provider e uso em componentes. O nosso projeto segue essa mesma lógica.

- **React Native – Environment setup** – [reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup)  
  Se o seu ambiente (Node, npm, emulador, Expo Go) ainda não estiver pronto, esse é o lugar.

---

## 📦 Bibliotecas que entram no jogo

Tudo que você precisa já está no `package.json`. Resumindo:

| Biblioteca | Pra que serve |
|------------|----------------|
| `@reduxjs/toolkit` | Cria o store, os slices (pedaços de estado + ações) e já vem com boas práticas (tipo Immer) embutidas. |
| `react-redux` | Faz a ponte React ↔ Redux: `Provider` (entrega o store pra árvore) e os hooks `useSelector` e `useDispatch` (ler estado e disparar ações). |

O projeto também usa **Expo** e **expo-router** pra roteamento. Não precisa instalar nada além do que já está lá: depois de clonar o repositório, é só rodar `npm install` e seguir os comandos abaixo.

---

## 🖥️ Comandos de terminal (coloque a mão na massa)

### Passo 1 – Instalar dependências

Na pasta do projeto:

```bash
npm install
```

Se aparecer algum erro de permissão ou de rede, tente fechar e abrir o terminal de novo ou rodar com `npm install --legacy-peer-deps` (só se o professor ou a documentação sugerir).

---

### Passo 2 – Subir o app

```bash
npx expo start
```

Vai abrir o Metro Bundler. A partir daí você pode:

- **No celular:** instalar o app **Expo Go**, escanear o QR code e abrir o projeto.
- **No emulador:** teclar `i` (iOS) ou `a` (Android) no terminal, ou rodar direto.
- **No navegador (web):** teclar `w` no terminal ou rodar com `--web`.

```bash
# Abre no simulador iOS (só no Mac)
npx expo start --ios

# Abre no emulador Android
npx expo start --android

# Abre no navegador (web)
npx expo start --web
```

---

### Passo 3 – (Opcional) Rodar o lint

Se quiser checar se o código está seguindo as regras do ESLint:

```bash
npm run lint
```

Não é obrigatório pra aula, mas ajuda a pegar detalhes de estilo e alguns possíveis erros.

---

## 🗺️ Roteiro de estudo – por onde olhar no código

A ideia é seguir a **ordem em que as coisas são usadas**: primeiro a gente cria o store e o slice, depois “conecta” o app com o Provider e, por fim, usa o estado nas telas. Assim fica mais fácil entender o fluxo.

---

### 1. A “caixa forte” do estado – Store

**Arquivo:** `src/store/store.ts`

Aqui a gente **configura o store** do Redux. Pensa no store como uma caixa forte: dentro dela fica todo o estado global da aplicação. Ninguém mexe direto nessa caixa; a única forma de mudar é através das **ações** que os **reducers** sabem tratar.

- Usamos `configureStore` do Redux Toolkit (ele já deixa o store pronto com boas configurações e até suporte ao Redux DevTools).
- Registramos o reducer do contador com a chave `counter`. Ou seja: o estado global passa a ter um “pedaço” chamado `counter`, e quem cuida dele é o reducer que a gente criou no slice.
- Exportamos os tipos **`RootState`** e **`AppDispatch`** – eles vão ser úteis nos componentes com TypeScript (autocomplete e tipo certo no `useSelector` e `useDispatch`).

**Por que importa:** Sem o store, não existe estado global. Tudo que vier depois (slice, Provider, telas) depende dele.

---

### 2. O “pedaço” do contador – Slice

**Arquivo:** `src/store/slices/counter.ts`

O **slice** é um pedaço do estado + as regras de como esse pedaço pode mudar. Em vez de escrever reducer e actions à mão, a gente usa `createSlice`: informamos o nome, o estado inicial e as funções que alteram esse estado (os **reducers**). O Redux Toolkit gera as **actions** pra gente.

- **name:** `"counter"` – é o nome desse pedaço no store (por isso no estado a gente acessa `state.counter`).
- **initialState:** `{ value: 0 }` – o contador começa em zero.
- **reducers:**  
  - `increment` e `decrement` – somam e subtraem 1.  
  - `incrementByAmount` – soma o valor que vier em `action.payload` (no nosso exemplo usamos 100 na Home).

No final do arquivo a gente exporta as **actions** (`increment`, `decrement`, `incrementByAmount`) e o **reducer** do slice (que é registrado no store).

**Detalhe legal:** Dentro dos reducers a gente pode escrever `state.value += 1` como se fosse mutação. Por baixo dos panos o Redux Toolkit usa o **Immer**, que transforma isso em atualização imutável. Menos boilerplate e menos chance de errar.

---

### 3. Conectando o app ao store – Provider

**Arquivo:** `app/_layout.tsx`

O store existe, mas os componentes React precisam de um “caminho” até ele. Esse caminho é o **Provider** do `react-redux`: ele recebe o `store` e envolve toda a árvore de componentes. Assim, qualquer tela ou componente filho pode usar `useSelector` (pra ler) e `useDispatch` (pra disparar ações).

- Importamos o `store` que criamos e o `Provider` do `react-redux`.
- Envolvemos o conteúdo do layout com `<Provider store={store}>`. No nosso projeto isso está no **layout raiz** do Expo Router, então todas as rotas (Home, Details, etc.) já nascem dentro do Provider.

**Por que importa:** Sem o Provider, os hooks do React-Redux não sabem de qual store pegar o estado. Colocar no _layout garante que não importa a tela, o store está disponível.

---

### 4. Tela Home – lendo e alterando o contador

**Arquivo:** `src/screens/home/home.tsx`

Aqui a gente **usa** o estado global na prática.

- **useSelector:** pegamos o valor do contador com `state.counter.value`. O tipo `RootState` (importado do store) deixa o TypeScript feliz e dá autocomplete.
- **useDispatch:** retorna a função `dispatch`. Toda vez que a gente quer mudar o estado, chamamos `dispatch(nomeDaAction())`.
- Os botões disparam:  
  - `increment()` e `decrement()` – +1 e -1.  
  - `incrementByAmount(100)` – soma 100 de uma vez.  
- Tem também um botão que navega para a tela Details com `router.push('/details')`.

Sempre que o valor no store mudar, o React-Redux avisa o componente e ele re-renderiza com o número atualizado. Ou seja: você clica, o dispatch roda, o reducer atualiza o estado, e a tela reflete isso sozinha.

---

### 5. Rota inicial – onde a Home aparece

**Arquivo:** `app/index.tsx`

No Expo Router, o arquivo `app/index.tsx` é a rota **/** (tela inicial). Aqui a gente só importa o componente `Home` e renderiza. Nada de Redux nesse arquivo – ele só decide qual componente mostrar na primeira tela.

---

### 6. Tela Details – só leitura do mesmo estado

**Arquivo:** `src/screens/details/details.tsx`

Essa tela **não tem botões**; ela só **lê** o valor do contador com `useSelector` e mostra na tela. O objetivo é mostrar que o estado é **compartilhado**: você altera na Home, navega para Details, e o número que aparece aqui é exatamente o mesmo, porque as duas telas leem `state.counter.value` do mesmo store.

Se você incrementar várias vezes na Home e depois abrir Details, vai ver o valor já atualizado. Esse é o poder do estado global.

---

### 7. Rota da tela Details

**Arquivo:** `app/details.tsx`

No Expo Router, `app/details.tsx` vira a rota **/details**. O arquivo só importa e renderiza o componente `Details`. A navegação até ela é feita pela Home com `router.push('/details')`.

---

## 📁 Estrutura de pastas – mapa do projeto

Pra você se localizar rápido:

```
aula-5-intro-redux/
├── app/
│   ├── _layout.tsx     → Provider + Stack (Expo Router); store disponível pra todo mundo
│   ├── index.tsx       → Rota "/" → componente Home
│   └── details.tsx     → Rota "/details" → componente Details
├── src/
│   ├── store/
│   │   ├── store.ts              → configureStore + tipos RootState e AppDispatch
│   │   └── slices/
│   │       └── counter.ts        → createSlice do contador (estado + ações)
│   └── screens/
│       ├── home/
│       │   └── home.tsx          → Contador + botões + navegação pra Details
│       └── details/
│           └── details.tsx       → Só exibe o valor do contador (leitura)
├── package.json
└── README.md
```

---

## 💡 Dicas pra fixar o conteúdo

1. **Ordem de leitura:** Se for a primeira vez com Redux, siga nessa ordem: `store.ts` → `counter.ts` → `_layout.tsx` → `home.tsx` → `details.tsx`. Assim você acompanha o fluxo “criar store → definir slice → conectar app → usar nas telas”.

2. **TypeScript:** Use `RootState` no `useSelector` e, se precisar tipar o `dispatch`, use `AppDispatch` no `useDispatch`. Isso evita erro de tipo e ainda dá autocomplete no `state.counter.value` e nas actions.

3. **Redux DevTools:** Em ambiente web (ou com extensão no navegador), o Redux Toolkit já deixa o DevTools ligado. Você consegue ver cada ação disparada e como o estado muda – ótimo pra debugar e entender o fluxo.

4. **Expo Router:** As rotas são definidas pelos arquivos dentro de `app/`. `index.tsx` = rota `/`, `details.tsx` = rota `/details`. Não precisa configurar roteador à mão; o Expo Router faz isso pelo nome do arquivo.

---

## 🌍 Ambiente – React Native e Expo

Se você ainda não configurou o ambiente (Node, npm, emulador ou Expo Go), vale seguir os guias oficiais:

- [Get Started with React Native](https://reactnative.dev/docs/environment-setup)  
- [Expo – Get Started](https://docs.expo.dev/get-started/introduction/)

Com **Node.js**, **npm** e o **Expo Go** no celular (ou um emulador Android/iOS), você já consegue rodar e estudar este projeto tranquilo.

---

## 🎯 Resumindo o fluxo Redux nesta aula

Em sequência, o que a gente fez:

1. **Store** (`src/store/store.ts`) – Criamos a “caixa forte” e registramos o reducer do contador.
2. **Slice** (`src/store/slices/counter.ts`) – Definimos o pedaço `counter` do estado (valor inicial 0) e as ações: increment, decrement, incrementByAmount.
3. **Provider** (`app/_layout.tsx`) – Envolvemos o app com `<Provider store={store}>` pra todo mundo poder usar `useSelector` e `useDispatch`.
4. **Telas** – Na Home a gente lê e altera o contador; na Details a gente só lê. As duas usam o mesmo `state.counter.value`, então o número é compartilhado entre as telas.

Quando você muda o contador na Home e vai pra Details, o valor que aparece é o mesmo porque as duas telas leem do **mesmo store**. Esse é o conceito de estado global que a gente praticou nesta aula.

Se tiver dúvida em algum passo, volta no arquivo indicado, lê o código e compara com esse roteiro. Boa aula! 🚀
