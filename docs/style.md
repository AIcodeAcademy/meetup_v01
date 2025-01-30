# Style with PicoCSS

```bash
# Install PicoCSS
bun i @picocss/pico
# Install fonts
bun i @fontsource/fira-mono
bun i @fontsource/major-mono-display
bun i @fontsource/tomorrow
```
## Global style
```css
@import "@picocss/pico";
@import "@fontsource/tomorrow";
@import "@fontsource/major-mono-display";
@import "@fontsource/fira-mono";

@import "@picocss/pico";
@import "@fontsource/tomorrow";
@import "@fontsource/major-mono-display";
@import "@fontsource/fira-mono";

:root {
	--pico-font-family: "Fira Mono", Consolas, monospace;
	--pico-font-family-emoji: "Major Mono Display", Consolas, monospace;
	--pico-font-family-sans-serif: Tomorrow, Roboto, Helvetica, Arial, sans-serif;
	--pico-font-family-monospace: "Fira Mono", Consolas, monospace;
	--pico-border-radius: 0rem;
	--ab-lime: #00FF00;
	--ab-cyan: #00FFFF;
	--ab-blue: #00BFFF;
  --ab-green: #32CD32;
	--ab-dark-blue: #000080;
	--ab-dark-green: #006400;
	--ab-white: #fff;
}

[data-theme=light],
:root:not([data-theme=dark]) {
	--pico-primary: var(--ab-green);
  --pico-primary-underline: var(--ab-green);
  --pico-primary-hover: var(--ab-blue);
  --pico-primary-background: var(--ab-lime);
  --pico-primary-hover-background: var(--ab-cyan);
  --pico-secondary: var(--ab-blue);

}
[data-theme=dark]{
  --pico-primary: var(--ab-lime);
  --pico-primary-underline: var(--ab-lime);
  --pico-primary-hover: var(--ab-cyan);
  --pico-primary-background: var(--ab-green);
  --pico-primary-hover-background: var(--ab-blue);
  --pico-secondary: var(--ab-cyan);
}
```
