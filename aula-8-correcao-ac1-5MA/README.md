# Aula 8 — Dog Ever Match (mobile)

Esta aula parte do projeto **Dog Ever Match** (stack Expo + API Node) e consolida o que foi acrescentado **após o clone** da base das aulas anteriores: **navegação entre telas**, **passagem de parâmetros**, **Redux (Redux Toolkit)** e **consumo de API** com Axios.

---

## Objetivos da aula 8

- Configurar **Expo Router** com **Stack** para mais de uma rota (`index` e `details`).
- Navegar programaticamente com **`router.push`** e enviar dados na **URL (search params)**.
- Na tela de destino, ler parâmetros com **`useLocalSearchParams`** e tratar objetos com **`JSON.stringify` / `JSON.parse`**.
- Integrar **Redux** na raiz do app com **`Provider`** e um **store** criado com **Redux Toolkit** (`configureStore`, `createSlice`).
- Manter a listagem de cães vinda da **API** com **Axios** e estado local (`useState` + `useEffect`).

---

## 1. Navegação com Expo Router

No Expo Router, as rotas vêm da pasta **`app/`**:

| Arquivo        | Rota      | Uso |
|----------------|-----------|-----|
| `app/index.tsx`   | `/`       | Tela inicial (home), que renderiza o componente `Home`. |
| `app/details.tsx` | `/details` | Tela de detalhes, que renderiza o componente `Details`. |

O **layout raiz** (`app/_layout.tsx`) define um **`Stack`** do Expo Router e registra as telas:

- `index` — sem cabeçalho (`headerShown: false`).
- `details` — com cabeçalho padrão (`headerShown: true`).

Assim, a pilha de navegação fica explícita e cada arquivo em `app/` corresponde a um segmento da URL.

**Orientação:** em projetos Expo Router, prefira manter **uma pasta `app/`** só para rotas e layouts, e mover telas reais para algo como `src/screens/`, importando-as nos arquivos de rota (como em `index.tsx` e `details.tsx`). Isso separa **roteamento** de **UI e lógica**.

---

## 2. Passagem de parâmetros (prioridade)

Os **search params** do Expo Router são **strings**. Para enviar um **objeto** (por exemplo, o cão atual da lista), o fluxo usado no projeto é:

1. Na origem (`Home`), ao tocar na imagem, usar **`router.push`** com **`pathname`** e **`params`**:

   - `params: { data: JSON.stringify(valueApi[0]) }`

2. No destino (`Details`), usar **`useLocalSearchParams`** para obter `data` e fazer **`JSON.parse(data as string)`** para reconstruir o objeto.

**Por que serializar?** Parâmetros de rota não transportam objetos JavaScript diretamente; serializar em JSON garante que a navegação funcione de forma previsível.

**Cuidados:**

- Tratar o caso em que `data` ainda não existe ou a string é inválida (em produção, use validação ou estado de carregamento).
- Objetos muito grandes podem ser problemáticos em URLs; para dados pesados, prefira **identificador na URL** + **busca na API** ou **estado global (Redux)**.

---

## 3. Redux (Redux Toolkit) — prioridade

O app envolve a árvore de componentes com **`Provider`** do `react-redux`, apontando para o **`store`** definido em `src/store/store.ts`.

- **`configureStore`** registra o reducer `counter` (nome do slice).
- O slice em `src/store/slices/counter-slice.ts` expõe, entre outros, a action **`dataDogs`** para guardar um payload em **`state.data`** — útil como **alternativa** à passagem só por parâmetros quando o dado precisa ser **global** ou **reutilizado** em várias telas.

Na tela de detalhes, o exemplo com **`useSelector`** para ler `state.counter.data` pode ficar **comentado** a favor dos **params** da rota; na prática, você escolhe:

- **Params** — bom para “abrir esta tela já com este objeto”.
- **Redux** — bom para estado compartilhado, cache ou fluxos que não dependem da URL.

**Dependências:** `@reduxjs/toolkit` e `react-redux` (já referenciadas no `package.json` do mobile).

---

## 4. Chamadas de API (Axios)

A home busca os cães com **GET** em:

`http://localhost:3000/dogs/getAllDogs`

(Endpoint exposto pela API em `api-dog-ever-match`, rota `getAllDogs`.)

- O resultado é guardado em estado com **`useState`**.
- A requisição roda no **`useEffect`** na montagem do componente.

**Nota:** em **dispositivo físico** ou emulador, `localhost` aponta para o próprio aparelho. Use o IP da máquina na rede (por exemplo `http://192.168.x.x:3000/...`) ou ferramentas como o ngrok, conforme o ambiente.

---

## 5. O que mudou em relação à base (após o clone)

Em síntese, em relação ao estado “só aula 6/7” clonado:

| Área | Alteração |
|------|-----------|
| **Layout** | `Provider` do Redux em volta do `Stack`; import do `store`. |
| **Home** | Navegação com **`router.push`** + **`params`** com JSON do item atual (em vez de só `navigate('/details')` sem dados). |
| **Details** | UI completa: foto, nome, descrição, idade, contato, endereço, gênero, tamanho; leitura de params com **`useLocalSearchParams`**. |
| **Estilos** | Arquivo dedicado `src/screens/details/styles.ts` para a tela de detalhes. |
| **Redux** | Pasta `src/store/` com `store.ts` e `slices/counter-slice.ts`. |
| **Dependências** | Redux Toolkit e React Redux no projeto mobile. |

---

## 6. Como rodar os dois projetos (passo a passo)

Este repositório tem **dois projetos separados** que precisam rodar **ao mesmo tempo** em terminais diferentes:

1. **API** (backend Node.js) — pasta `api-dog-ever-match`
2. **Mobile** (app Expo) — pasta `mobile`

A API precisa estar **ligada primeiro**, porque o app chama `http://.../dogs/getAllDogs` ao abrir a tela inicial. Se a API não estiver no ar, a lista de cães não carrega.

### 6.1. O que instalar no computador (antes de tudo)

- **Node.js** (versão LTS recomendada), que já traz o **npm**.  
  - Verifique no terminal: `node -v` e `npm -v` (deve aparecer um número de versão em cada um).
- **Git** (se ainda for clonar o repositório).
- Para testar no **celular físico**: instale o app **Expo Go** (Android ou iOS) pela loja de aplicativos.
- Para **emulador Android**: Android Studio; para **simulador iOS** (só em Mac): Xcode.

Se algum comando abaixo falhar com “comando não encontrado”, o Node provavelmente não está instalado ou não está no PATH.

### 6.2. Abrir o terminal na pasta certa

1. No explorador de arquivos (Finder no Mac, Explorer no Windows), entre na pasta raiz do projeto (onde existem as pastas `api-dog-ever-match` e `mobile`).
2. Abra um terminal **nessa pasta** (no VS Code/Cursor: menu *Terminal → New Terminal* costuma já abrir na raiz do projeto).

Daqui em diante, os caminhos assumem que você está na **raiz** do repositório (a pasta que contém `api-dog-ever-match` e `mobile`).

### 6.3. Projeto 1 — API (Terminal 1)

Abra **um** terminal e execute **na ordem**:

```bash
cd api-dog-ever-match
npm install
npm start
```

- **`cd api-dog-ever-match`** — entra na pasta da API.
- **`npm install`** — baixa as dependências listadas no `package.json` (só precisa rodar de novo se mudar dependências ou apagar `node_modules`).
- **`npm start`** — sobe o servidor com **nodemon** na **porta 3000** (definida em `server.js`).

**Sinal de que deu certo:** no terminal deve aparecer algo como `Server is running on port 3000`. **Deixe esse terminal aberto**; fechar interrompe a API.

**Teste rápido no navegador:** abra `http://localhost:3000/dogs/getAllDogs`  
Se aparecer JSON (lista de cães ou `[]`), a API está respondendo.

**Se der erro ao instalar (especialmente `sqlite3`):** às vezes é necessário ferramentas de compilação no sistema. Em Mac costuma instalar Xcode Command Line Tools; em Windows, as “build tools” do Visual Studio. Peça ajuda ao professor se a mensagem de erro citar `node-gyp` ou `sqlite3`.

### 6.4. Projeto 2 — Mobile (Terminal 2)

Abra **outro** terminal (novo), deixando o da API **rodando**, e execute:

```bash
cd mobile
npm install
npx expo start
```

- **`cd mobile`** — entra na pasta do app Expo.
- **`npm install`** — dependências do React Native / Expo (pode demorar na primeira vez).
- **`npx expo start`** — inicia o **Metro Bundler** e mostra um **QR Code** no terminal e, em geral, uma página no navegador.

**Sinal de que deu certo:** o terminal mostra o QR Code e opções como pressionar `a` (Android), `i` (iOS), `w` (web).

**Como abrir o app:**

| Onde você testa | O que fazer |
|-----------------|-------------|
| **Celular com Expo Go** | Celular e PC na **mesma rede Wi‑Fi**. Escaneie o QR Code com a câmera (iOS) ou com o app Expo Go (Android). |
| **Emulador Android** | Com o emulador aberto, no terminal do Expo pressione **`a`**. |
| **Simulador iOS (Mac)** | Pressione **`i`** (requer Xcode). |
| **Navegador (web)** | Pressione **`w`** — útil para ver layout, mas alguns comportamentos são diferentes do celular. |

Na primeira vez, o Expo pode pedir para criar conta ou usar offline; siga as opções na tela ou use o modo tunnel se a rede bloquear conexão entre celular e PC.

### 6.5. `localhost` no celular e em emuladores (importante)

No código da home, a URL está assim:

`http://localhost:3000/dogs/getAllDogs`

- **`localhost`** no app significa “o próprio aparelho onde o app roda”, **não** o seu computador.
- Por isso:
  - **No computador (Expo web `w`)** — `localhost:3000` costuma funcionar se a API está na mesma máquina.
  - **No emulador Android** — use o IP especial do host: troque no código para `http://10.0.2.2:3000/dogs/getAllDogs` (é o jeito padrão do emulador Android falar com o `localhost` do PC).
  - **No celular físico na mesma rede** — descubra o IP do seu PC na rede Wi‑Fi (ex.: `192.168.0.15`) e use `http://192.168.0.15:3000/dogs/getAllDogs` no código (o número muda de rede para rede).
  - **No simulador iOS** — muitas vezes `localhost` funciona para falar com o servidor no Mac; se não funcionar, use o IP da máquina como no celular.

**Como achar o IP no Mac:** *Preferências do Sistema → Rede → Wi‑Fi → Detalhes → TCP/IP* (IPv4).  
**No Windows:** `ipconfig` no CMD/PowerShell e procure “IPv4” da rede Wi‑Fi/Ethernet.

Depois de alterar a URL no arquivo `mobile/src/screens/home/home.tsx`, salve o arquivo; o Expo costuma recarregar sozinho (**Fast Refresh**).

### 6.6. Ordem e resumo

1. Terminal 1: `cd api-dog-ever-match` → `npm install` → `npm start` → esperar mensagem na porta **3000**.
2. Terminal 2: `cd mobile` → `npm install` → `npx expo start` → abrir no dispositivo/emulador conforme a tabela acima.
3. Ajustar a URL da API no mobile se não estiver usando web nem `localhost` compatível com seu ambiente.

### 6.7. Problemas comuns

- **“Cannot connect” / lista vazia / erro de rede no app** — API não está rodando, porta errada ou URL com `localhost` onde deveria ser IP ou `10.0.2.2`.
- **“Port 3000 already in use”** — outro programa usa a porta; feche o outro processo ou altere a porta na API (e no `axios` do mobile) com orientação do professor.
- **`npm install` muito lento ou erros** — tente de novo com internet estável; em redes da faculdade, proxy pode atrapalhar.

---

## Referências rápidas

- [Expo Router — navegação](https://docs.expo.dev/router/introduction/)
- [Expo Router — parâmetros de rota](https://docs.expo.dev/router/reference/url-parameters/)
- [Redux Toolkit — `configureStore` e `createSlice`](https://redux-toolkit.js.org/introduction/getting-started)

---

*Disciplina / contexto: ADS — foco em navegação Expo, parâmetros, Redux e integração com API REST.*
