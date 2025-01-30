/// <reference types="vite/client" />

declare module '*.html?raw' {
  const content: string;
  export default content;
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_TECH_STACK: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
