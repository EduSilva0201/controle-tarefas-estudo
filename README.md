# Estudaí — Controle de tarefas de estudo

Aplicação simples para organizar atividades por disciplina, acompanhar pendências e visualizar o progresso dos estudos. Projeto de prática complementar para portfólio, criado com auxílio de IA. Não é apresentado como trabalho realizado em uma disciplina.

## Tecnologias

HTML5, CSS3 e JavaScript puro (DOM, eventos, arrays, JSON e localStorage). Sem bibliotecas, dependências ou backend.

## Funcionalidades

- Adicionar tarefas com título e disciplina.
- Marcar como concluída ou retornar para pendente.
- Excluir tarefas.
- Filtrar todas, pendentes ou concluídas.
- Visualizar contadores e percentual de conclusão.
- Salvar os dados no navegador.
- Interface adaptada para celular e computador.

## Execução

Clone o repositório:

```bash
git clone https://github.com/EduSilva0201/controle-tarefas-estudo.git
cd controle-tarefas-estudo
```

Abra `index.html` no navegador. Os arquivos `style.css` e `app.js` devem ficar na mesma pasta.

Opcionalmente, com Python 3 instalado, abra o terminal na pasta do projeto e execute:

```bash
python -m http.server 8000
```

Acesse http://localhost:8000. Ao usar servidor local, utilize sempre o mesmo endereço e porta para acessar os dados salvos.

## Estrutura

| Arquivo | Responsabilidade |
| --- | --- |
| index.html | Estrutura e formulários acessíveis |
| style.css | Cores, componentes e adaptação de layout |
| app.js | Cadastro, filtros, atualização da tela e persistência |
| LICENSE | Licença MIT |

## Como funciona

Cada tarefa é um objeto com `id`, `title`, `subject` e `done`. O array de tarefas é convertido em JSON para armazenamento no localStorage. A função `render()` atualiza a lista e os indicadores. Os textos fornecidos pelo usuário são inseridos com `textContent`, evitando interpretação como HTML.

## Limitações

Os dados ficam apenas neste navegador e não são sincronizados com outros dispositivos. Limpar os dados do navegador apaga a lista. Navegação privada ou restrições de armazenamento podem impedir o salvamento; nesse caso, a página exibe um aviso. Não há login, notificações ou banco de dados. A exclusão é imediata.

## Licença

MIT. Veja [LICENSE](LICENSE).
