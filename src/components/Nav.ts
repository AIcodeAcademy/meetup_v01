const appTitle = import.meta.env.VITE_APP_TITLE;
const repoUrl = import.meta.env.VITE_REPO_URL;

export function Nav() {
	const html = String.raw;
	return html`
    <nav class="container-fluid">
      <ul>
        <li>
          <a href="/" class="logo" >
            ${appTitle}
          </a>
        </li>
      </ul>
      <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
        <li>
          <a href="${repoUrl}" role="button">GitHub</a>
        </li>
      </ul>
    </nav>
  `;
}
