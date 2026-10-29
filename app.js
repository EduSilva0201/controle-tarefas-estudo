'use strict';
// Os dados pertencem a este navegador; não há servidor ou conta de usuário.
const STORAGE_KEY = 'estudai.tasks.v1';
const form = document.querySelector('#task-form');
const list = document.querySelector('#tasks');
const message = document.querySelector('#message');
let tasks = [];
let currentFilter = 'all';
let storageAvailable = true;
try {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  if (!Array.isArray(saved)) throw new Error('Formato inválido');
  tasks = saved.filter(task => task && typeof task.id === 'string' &&
    typeof task.title === 'string' && typeof task.subject === 'string' &&
    typeof task.done === 'boolean');
} catch {
  message.textContent = 'Não foi possível ler os dados salvos. Você pode começar uma nova lista.';
}
function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); storageAvailable = true; }
  catch { storageAvailable = false; }
}
function announce(text) {
  message.textContent = storageAvailable ? text : text + ' Não foi possível salvar neste navegador; mantenha a página aberta.';
}
function render() {
  const completed = tasks.filter(task => task.done).length;
  const percent = tasks.length ? Math.round(completed / tasks.length * 100) : 0;
  document.querySelector('#total').textContent = tasks.length;
  document.querySelector('#pending').textContent = tasks.length - completed;
  document.querySelector('#done').textContent = completed;
  document.querySelector('#progress').textContent = percent + '% concluído';
  document.querySelector('#bar').style.width = percent + '%';
  list.replaceChildren();
  const visible = tasks.filter(task => currentFilter === 'all' ||
    (currentFilter === 'done' ? task.done : !task.done));
  visible.forEach(task => {
    const item = document.createElement('li');
    item.classList.toggle('completed', task.done);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox'; checkbox.checked = task.done;
    checkbox.setAttribute('aria-label', 'Marcar ' + task.title + ' como ' + (task.done ? 'pendente' : 'concluída'));
    checkbox.addEventListener('change', () => {
      task.done = checkbox.checked; save(); render(); announce('Status da tarefa atualizado.');
    });
    const info = document.createElement('div'); info.className = 'task-info';
    const title = document.createElement('strong'); title.textContent = task.title;
    const subject = document.createElement('small'); subject.textContent = task.subject;
    info.append(title, subject);
    const remove = document.createElement('button'); remove.className = 'delete';
    remove.type = 'button'; remove.textContent = '×';
    remove.setAttribute('aria-label', 'Excluir ' + task.title);
    remove.addEventListener('click', () => {
      tasks = tasks.filter(entry => entry.id !== task.id); save(); render(); announce('Tarefa excluída.');
    });
    item.append(checkbox, info, remove); list.append(item);
  });
  const empty = document.querySelector('#empty'); empty.hidden = visible.length > 0;
  empty.querySelector('h3').textContent = tasks.length ? 'Nenhuma tarefa neste filtro' : 'Um novo começo por aqui';
  empty.querySelector('p').textContent = tasks.length ? 'Experimente outra opção para ver suas atividades.' : 'Adicione sua primeira tarefa e comece no seu ritmo.';
}
form.addEventListener('submit', event => {
  event.preventDefault();
  const title = form.elements.title.value.trim();
  const subject = form.elements.subject.value.trim();
  if (!title || !subject) { announce('Preencha a tarefa e a disciplina.'); return; }
  tasks.unshift({id: Date.now().toString(36) + Math.random().toString(36).slice(2), title, subject, done: false});
  save(); form.reset(); render(); form.elements.title.focus(); announce('Tarefa adicionada.');
});
document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(option => option.setAttribute('aria-pressed', String(option === button)));
    render();
  });
});
render();
