const form = document.querySelector('#story-form');
const savedList = document.querySelector('#saved-list');
const dateInput = document.querySelector('#date');
dateInput.value = new Date().toISOString().slice(0, 10);

function getPosts() { return JSON.parse(localStorage.getItem('heWritesPosts') || '[]'); }
function displayDate(value) { return new Date(`${value}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase(); }
function renderPosts() {
  const posts = getPosts();
  savedList.replaceChildren();
  if (!posts.length) { savedList.textContent = 'Nothing published yet.'; return; }
  posts.slice().reverse().forEach((post) => {
    const item = document.createElement('article'); item.className = 'saved-piece';
    const details = document.createElement('div');
    const meta = document.createElement('p'); meta.textContent = `${post.category} · ${post.date}`;
    const title = document.createElement('h3'); title.textContent = post.title;
    details.append(meta, title);
    const remove = document.createElement('button'); remove.className = 'delete-piece'; remove.textContent = 'Delete';
    remove.addEventListener('click', () => { localStorage.setItem('heWritesPosts', JSON.stringify(getPosts().filter((item) => item.id !== post.id))); renderPosts(); });
    item.append(details, remove); savedList.append(item);
  });
}
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const post = { id: Date.now(), category: document.querySelector('#category').value, date: displayDate(dateInput.value), title: document.querySelector('#title').value.trim(), excerpt: document.querySelector('#excerpt').value.trim(), body: document.querySelector('#body').value.trim() };
  localStorage.setItem('heWritesPosts', JSON.stringify([...getPosts(), post]));
  form.reset(); dateInput.value = new Date().toISOString().slice(0, 10);
  document.querySelector('#save-state').textContent = 'Published'; renderPosts();
});
document.querySelector('#clear').addEventListener('click', () => { form.reset(); dateInput.value = new Date().toISOString().slice(0, 10); });
renderPosts();
