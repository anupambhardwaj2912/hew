document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector('button');
  button.innerHTML = 'You’re on the list <span>✓</span>';
  event.currentTarget.querySelector('input').value = '';
});

document.querySelector('.instagram-share').addEventListener('click', async (event) => {
  const button = event.currentTarget;
  const caption = `“${button.dataset.title}” — ${button.dataset.excerpt}\n\nRead more at he writes.\n\n#amwriting #shortstory #writersofinstagram`;
  try {
    await navigator.clipboard.writeText(caption);
    button.innerHTML = 'Caption copied <span>✓</span>';
  } catch {
    button.innerHTML = 'Open Instagram <span>↗</span>';
  }
  window.open('https://www.instagram.com/anupam___b/', '_blank', 'noopener,noreferrer');
});

document.querySelector('#author-photo').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const preview = document.querySelector('#author-preview');
  preview.src = URL.createObjectURL(file);
  preview.hidden = false;
  document.querySelector('.photo-placeholder').hidden = true;
  document.querySelector('.photo-label').textContent = 'Change photo';
});

const savedPosts = JSON.parse(localStorage.getItem('heWritesPosts') || '[]');
const postList = document.querySelector('#post-list');
savedPosts.slice().reverse().forEach((post) => {
  const article = document.createElement('article');
  article.className = 'post local-post';
  const meta = document.createElement('div');
  meta.className = 'post-meta';
  meta.innerHTML = `<span>${post.category}</span><span>${post.date}</span>`;
  const title = document.createElement('h3');
  title.textContent = post.title;
  const excerpt = document.createElement('p');
  excerpt.textContent = post.excerpt;
  const link = document.createElement('a');
  link.href = `story.html?id=${post.id}`;
  link.setAttribute('aria-label', `Read ${post.title}`);
  link.textContent = '↗';
  article.append(meta, title, excerpt, link);
  postList.prepend(article);
});
