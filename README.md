# BankApp Angular

Aplicação web de exemplo para um internet banking, construída com **Angular 21** e **Angular Material**, usando **standalone components**, rotas protegidas e formulários reativos.

## Tecnologias principais

- Angular 21 (standalone, `bootstrapApplication`)
- Angular Router
- Angular Material
- Reactive Forms
- RxJS

## Pré-requisitos

- Node.js (versão recomendada LTS)
- npm (já vem com o Node)

Confira a versão usada pelo projeto em `package.json` (campo `packageManager`).

## Instalação

Na pasta do projeto (`bankAppAngular`):

```bash
npm install
```

## Scripts disponíveis

Todos definidos em `package.json`:

- `npm start` – sobe a aplicação em modo desenvolvimento (`ng serve`)
- `npm run build` – build de produção (`ng build`)
- `npm test` – roda os testes (`ng test`)
- `npm run watch` – build em watch mode

## Como rodar o projeto

```bash
npm start
```

Por padrão, a aplicação ficará disponível em:

- http://localhost:4200

## Estrutura geral

Principais arquivos/pastas:

- `src/main.ts` – bootstrap da aplicação com `bootstrapApplication(App, appConfig)`
- `src/app/app.ts` – componente raiz da aplicação
- `src/app/app.config.ts` – configuração global (routers, providers, etc.)
- `src/app/app.routes.ts` – definição das rotas
- `src/app/components/login` – tela de login
- `src/app/components/register` – tela de registro
- `src/app/components/home` – tela inicial (dashboard) protegida por autenticação
- `src/app/security` – guardas de rota e interceptors de segurança (por exemplo, `AuthGuard`, `AuthInterceptor`)
- `src/app/services` – services para comunicação com a API (ex.: `login`, `register`, `dashboard`, etc.)
- `src/app/dtos` – tipos/DTOs usados na comunicação com a API

## Rotas

Definidas em `src/app/app.routes.ts`:

- `/login` – tela de login
- `/register` – tela de cadastro
- `/home` – tela principal (dashboard do usuário), protegida por `AuthGuard`
- `''` – redireciona para `/login`

Exemplo (resumido):

```ts
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'home', component: Home, canActivate: [AuthGuard] },
  { path: 'register', component: Register },
];
```

## Fluxo de autenticação (conceito)

1. Usuário acessa `/login` e envia email/senha.
2. O componente de login chama um service de autenticação (por exemplo, `LoginService` ou `UserService.login`).
3. A API responde com um token (e opcionalmente dados do usuário).
4. O token (e o usuário) são salvos pelo `AuthService` (por exemplo, em `localStorage`).
5. Após login bem-sucedido, o app redireciona o usuário para `/home`.
6. A rota `/home` é protegida por `AuthGuard`, que verifica se o usuário está autenticado antes de permitir o acesso.

### AuthGuard

O `AuthGuard` é usado em `app.routes.ts` para bloquear o acesso a `/home` quando o usuário não está autenticado. Em caso de não autenticação, o usuário é redirecionado para `/login`.


## Formulários (Login e Register)

As telas de **Login** e **Register** utilizam **Reactive Forms** e **Angular Material** (`mat-form-field`, `mat-input`, `mat-select`, `mat-error`, etc.), com validações de campos direto no componente TypeScript.

- `login` – recebe `email` e `password`
- `register` – recebe, por exemplo: `username`, `password`, `phoneNumber`, `address`, `email`, `age`, `userType` (TEST/NORMAL)

## Home (Dashboard do usuário)

A home page é pensada como um **dashboard bancário**, com seções como:

- Informações do usuário (nome, email, número da conta, saldo, etc.)
- Cartões vinculados
- Últimas transações

Esses dados normalmente são obtidos via um service (ex.: `DashboardService`) que chama um endpoint da API (`/dashboard`, `/me`, etc.), já autenticado com o token do usuário.

## Configuração de API (URL base)

É recomendado centralizar a URL base da API em um arquivo de configuração, por exemplo `src/environments/environment.ts`:

```ts
export const environment = {
  apiUrl: 'http://localhost:8080/api',
};
```

E usar essa constante nos services:

```ts
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly baseUrl = environment.apiUrl;
  // ...chamadas HTTP usando `${this.baseUrl}/algum-endpoint`
}
```

## Convenções de código

- Uso de **interfaces/DTOs** para tipar requisições e respostas da API (em vez de `any`).
- Components standalone (sem módulos) registrados diretamente em `app.routes.ts`.
- Angular Material para inputs, botões e layout dos formulários.

## Próximos passos sugeridos

- Implementar completamente os services de `login`, `register` e `dashboard` integrados à sua API real.
- Implementar e registrar um interceptor de autenticação para anexar o token em todas as requisições.
- Adicionar testes unitários para os components e services principais.
- Melhorar o layout da `home` como um dashboard bancário completo (cards, gráficos, filtros, etc.).

---

Este README é um ponto de partida. Ajuste o texto conforme a evolução das rotas, services e endpoints reais da sua API.

