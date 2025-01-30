# Init project

```bash
## Install bun

```bash
npm install -g bun # the last `npm` command you'll ever need
```

## Create project

```bash
bun create vite BunViteBlueprint --template vanilla-ts
cd BunViteBlueprint
git init
git add .
git commit -m "chore: init project"
```

## Install dev dependencies

```bash
bun i -D @biomejs/biome
```