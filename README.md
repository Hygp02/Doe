# Mapa Solidário Maceió

Protótipo web para visualização e gerenciamento simulado de pontos de coleta de doações em Maceió.

## Escopo

- Frontend em Vue.js 3 + TypeScript com Vite.
- UI baseada em shadcn-vue + Tailwind CSS.
- Backend em Node.js + TypeScript com Express.
- Dados mockados em memória, sem banco de dados real.
- Área administrativa simulada, sem autenticação real.

## Estrutura

```text
backend/
├── src/
│   ├── controllers/
│   ├── mocks/
│   ├── routes/
│   ├── services/
│   └── types/
└── tests/
    ├── contract/
    └── unit/

frontend/
├── src/
│   ├── components/
│   │   ├── ui/          (shadcn-vue)
│   │   ├── AppLoading.vue
│   │   ├── AppError.vue
│   │   ├── AppEmpty.vue
│   │   ├── AppFeedback.vue
│   │   ├── ExternalActions.vue
│   │   ├── PontoCard.vue
│   │   ├── PontoFilters.vue
│   │   └── PontoForm.vue
│   ├── composables/     (lógica reutilizável de estado e filtros)
│   ├── constants/       (constantes como tipos de doação)
│   ├── lib/             (helpers utilitários)
│   ├── mocks/
│   ├── pages/
│   ├── router/
│   ├── services/
│   └── types/
└── tests/
    ├── component/
    └── unit/

specs/001-mapa-solidario-maceio/
specs/002-melhorias-frontend/
```

## Pré-requisitos

- Node.js >= 20.19.0
- npm (gerenciador de pacotes)

## Instalação

```bash
npm install
```

## Execução

Iniciar backend e frontend em paralelo:

```bash
npm run dev
```

Ou separadamente:

```bash
npm run dev:backend   # API em http://localhost:3000
npm run dev:frontend  # UI em http://localhost:5173
```

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia backend e frontend em paralelo |
| `npm run dev:backend` | Inicia apenas o backend |
| `npm run dev:frontend` | Inicia apenas o frontend |
| `npm run build` | Compila backend e frontend |
| `npm run lint` | Executa lint nos dois projetos |
| `npm run format` | Formata com Prettier |
| `npm run test` | Executa testes (raiz) |

### Testes

Backend (51 testes em 7 suites):

```bash
npm run test --workspace @mapa-solidario/backend
```

Frontend (25 testes em 5 suites):

```bash
npm run test --workspace @mapa-solidario/frontend
```

**Total: 76 testes, todos passando.**

| Suite | Tipo | Testes |
|-------|------|--------|
| `pontos-list.test.ts` | Unitário backend | 6 |
| `pontos-search-filter.test.ts` | Unitário backend | 10 |
| `pontos-admin.test.ts` | Unitário backend | 10 |
| `get-pontos.test.ts` | Contrato backend | 5 |
| `get-pontos-query.test.ts` | Contrato backend | 7 |
| `get-ponto-by-id.test.ts` | Contrato backend | 5 |
| `pontos-admin.test.ts` | Contrato backend | 8 |
| `PontoCard.test.ts` | Componente frontend | 5 |
| `PontoFilters.test.ts` | Componente frontend | 7 |
| `PontoDetailsView.test.ts` | Componente frontend | 2 |
| `PontoForm.test.ts` | Componente frontend | 7 |
| `useQueryFilters.test.ts` | Unitário frontend | 4 |

## Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/pontos` | Lista pontos ativos. `?incluirInativos=true` para admin. `?busca=` e `?tipo=` para filtro. |
| `GET` | `/pontos/:id` | Detalhes de um ponto |
| `POST` | `/pontos` | Cria ponto (body JSON conforme `PontoColetaInput`) |
| `PUT` | `/pontos/:id` | Atualiza ponto |
| `DELETE` | `/pontos/:id` | Remove ponto |
| `GET` | `/resumo` | Resumo do sistema (total ativos, tipos) |
| `GET` | `/health` | Status da API |

## Rotas do Frontend

| Rota | Descrição |
|------|-----------|
| `/` | Home com resumo e destaques |
| `/pontos` | Listagem pública com busca e filtros (filtros sincronizados com URL) |
| `/pontos/:id` | Detalhes do ponto de coleta com ações práticas |
| `/admin` | Administração (tabela/cards com CRUD) |
| `/admin/novo` | Formulário de cadastro |
| `/admin/editar/:id` | Formulário de edição |
| `/*` | Página 404 |

## Melhorias do Frontend

- Estados de carregamento, erro e vazio padronizados em todas as telas.
- Filtros de busca sincronizados com a URL, permitindo compartilhamento.
- Ações práticas na tela de detalhes: copiar endereço, ligar e abrir no mapa externo.
- Layout administrativo adaptado para mobile com cards e confirmação de remoção.
- Componentes visuais padronizados com shadcn-vue.
- Skip link e melhorias de acessibilidade.
- Mapa simulado de Maceió com pins por bairro na home, listagem e detalhes.
- Animações contextuais de entrada e micro-interações nos cards e seções.

## Limitações do Protótipo

- **Dados mockados**: Os dados são carregados em memória ao iniciar o servidor backend. Alterações feitas via área administrativa são perdidas ao reiniciar o servidor.
- **Sem autenticação**: A área administrativa é acessível sem login.
- **Sem banco de dados**: Não há persistência em disco ou banco de dados.
- **Mapa simulado**: O mapa exibido é uma ilustração SVG estilizada, sem geolocalização real ou integração com serviços de mapas.
- **Sem integrações externas**: Não há envio de emails, notificações ou validação externa.
- **Escopo Maceió**: A cidade padrão é fixa como "Maceio".
- **Dados fictícios**: Os pontos de coleta são exemplos fictícios para demonstração.

## Validação Rápida

Consulte os guias de validação em:

- `specs/001-mapa-solidario-maceio/quickstart.md`
- `specs/002-melhorias-frontend/quickstart.md`
