const authorName = import.meta.env.VITE_AUTHOR_NAME;
const authorUrl = import.meta.env.VITE_AUTHOR_URL;
const repoUrl = import.meta.env.VITE_REPO_URL;

export function Footer() {
	const currentYear = new Date().getFullYear();
	const html = String.raw;

	return html`
    <footer class="container-fluid">
      <small>
        © ${currentYear} • Built with ♥ by 
        <a href="${authorUrl}" target="_blank" >${authorName}</a>
        <a href="${repoUrl}" target="_blank" >Code repository</a>
      </small>
    </footer>
  `;
}
