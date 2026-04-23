# Aula 9 — JWT no mobile

Oi, turma do **5º semestre de ADS**. Esta aula é sobre autenticação com **JWT**: o app mobile fala com a API, guarda o token e manda nos headers como gente grande. Se algo der erro, respira, lê o log e lembra: até o professor já esqueceu um `npm install` alguma vez.

---

## O que tem nesta pasta?

| Pasta | O que é |
|--------|---------|
| `api-dog-ever-match` | API Node.js + Express + Sequelize + SQLite — login, JWT, rotas protegidas |
| `jwt-aula-app-unifecaf` | App **Expo** (React Native) — login, armazenamento do token, chamadas à API |

Ordem de batalha: **primeiro a API**, depois o app. O app espera a API em `http://localhost:3000/` (configurado em `jwt-aula-app-unifecaf/src/api/api.ts`).

---

## Clonar / baixar o material

```bash
git clone https://github.com/proGuilhermeCamargo/aula-9-jwt-[sua turma].git
cd aula-9-jwt
```

### Se vier um ZIP

Descompacte, abra a pasta no terminal e siga os passos abaixo — a ideia é a mesma, só sem o `git clone`.

---

## Rodar a API (`api-dog-ever-match`)

```bash
cd api-dog-ever-match
npm install
npm start
```

Você deve ver algo como **Server is running on port 3000**. Se a porta estiver ocupada, feche o outro processo ou ajuste (e lembre de alinhar o `baseURL` no app).

**SQLite na mão (opcional, nerd mode):**

```bash
sqlite3 databaseDogEverMatch.sqlite
.tables
select * from users;
```

(Se o nome do arquivo do banco for outro, o professor avisa — o README antigo da API citava `databaseDogEverMatch.sqlite`.)

---

## Rodar o app mobile (`jwt-aula-app-unifecaf`)

Na raiz do projeto Expo:

```bash
cd jwt-aula-app-unifecaf
npm install
npm run start
# equivalente: npx expo start
```

Depois escaneiem o QR no **Expo Go** ou usem emulador (**Android Studio** / **Xcode** no Mac).

### Dica de rede (isso aparece em prova de vida)

- **Emulador Android:** `localhost` do computador costuma ser acessível; se não for, pesquisem por `10.0.2.2` (é o “atalho” do emulador até a máquina host).
- **Celular físico na mesma Wi-Fi:** `localhost` no código aponta para o **próprio celular**. Troquem o `baseURL` para o **IP da máquina** onde a API roda (ex.: `http://192.168.0.42:3000/`).
- **iOS e HTTP:** Apple é chata com HTTP puro; em cenários reais entra HTTPS. Para aula, emulador + rede local costuma salvar.

---

## Documentação útil (para não reinventar a roda)

- [Expo Docs](https://docs.expo.dev/) — guias, Expo Router, build
- [Expo Router](https://docs.expo.dev/router/introduction/) — rotas por arquivos na pasta `app/`
- [React Native](https://reactnative.dev/docs/getting-started) — conceitos de layout, listas, etc.
- [Axios](https://axios-http.com/docs/intro) — interceptors (olhem o `src/api/api.ts`)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) — onde o token “dorme” no aparelho
- [JWT.io](https://jwt.io/) — decodificar payload (sem validar assinatura; é só para estudar o que veio dentro do token)

---

## Como estudar o código (e ficar melhor em mobile de verdade)

1. **Siga o fluxo do login:** tela → chamada HTTP → resposta → onde o token é salvo → próxima requisição já com header. Desenhem isso no caderno ou num quadro; vira mapa mental.
2. **Leiam o interceptor do Axios** em `jwt-aula-app-unifecaf/src/api/api.ts` — é pequeno, mas é o coração do “Bearer token” no app.
3. **Abram a API no VS Code/Cursor** ao mesmo tempo que o app: quando der 401, vejam **middleware** e rotas em `api-dog-ever-match/routes` e `middleware/`.
4. **Mudem uma coisa de cada vez:** por exemplo, logar o token no console após o login, ou mudar uma mensagem de erro. Assim vocês sabem *o que* quebrou.
5. **Quebrem de propósito (com backup):** comentem o interceptor, mandem token errado, vejam o status HTTP. Dor de cabeque hoje = menos susto no TCC.
6. **TypeScript:** não ignorem os “vermelhos” do editor; corrigir tipos cedo evita bug às 23h.
7. **Leiam erros de ponta a ponta:** mensagem do Metro, do Expo, do terminal da API e do Postman/Insomnia — cada um conta uma parte da história.

---

## Dicas rápidas de sobrevivência

- Node LTS instalado, emulador com HAXM/Hypervisor ok, e **mesma rede** se for testar no físico.
- Se o app “não acha” a API, 90% das vezes é **URL/porta** ou **API não está rodando**.
- `npm install` de novo não é feitiço, mas às vezes resolve cache estranho — combinado com apagar `node_modules` e reinstalar (com calma).
- Commits pequenos e mensagens honestas (`fix: token não persistia`) salvam amizades em trabalho em grupo.

---

## Checklist express (valide antes de chamar o professor)

- [ ] API sobe sem erro e escuta na **3000**
- [ ] `npm install` rodou nas **duas** pastas
- [ ] Expo abriu o bundler e o app carrega
- [ ] Se for celular físico, `baseURL` com **IP da máquina**, não `localhost`

---

Bons estudos. JWT não morde; quem morde é só o prazo do trabalho. Qualquer coisa, descrevam o erro **completo** (print ou texto) — isso já é metade do caminho para achar a solução.
