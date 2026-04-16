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

## 6. Como rodar

1. **API** (pasta `api-dog-ever-match`): instalar dependências, configurar `.env` se necessário e subir o servidor na porta usada pelo app (ex.: 3000).

2. **Mobile** (pasta `mobile`):

   ```bash
   npm install
   npx expo start
   ```

Garanta que o endereço da API no código (`axios.get(...)`) corresponda ao host acessível pelo emulador ou pelo dispositivo.

---

## Referências rápidas

- [Expo Router — navegação](https://docs.expo.dev/router/introduction/)
- [Expo Router — parâmetros de rota](https://docs.expo.dev/router/reference/url-parameters/)
- [Redux Toolkit — `configureStore` e `createSlice`](https://redux-toolkit.js.org/introduction/getting-started)

---

*Disciplina / contexto: ADS — foco em navegação Expo, parâmetros, Redux e integração com API REST.*
