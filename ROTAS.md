```
    SSR => Server Side Rendering
    CSR => Client Side Rendering
    Static / SSG => Static Site Generation (Tenho html pronto no servidor) (Pode ser gerado por demanda ou pelo build)
    Dynamic => Não tenho nada pronto e precisa ser buscado
    ISR => Incremental Static Regenation (Static + Dynamic)
        Exp: Gerei uma página static na build e depois de 60s quero atualizar o conteúdo dela.
        Exp: Tenho uma página, depois que eu atualizar algum conteúdo (revalidate), ela atualiza outra página

    / (pública)
    /post/[slug] (pública)

    /admin/post (Privado - Dynamic) - Ler (R) Lista de posts / (D) Deletar posts
    /admin/post/[id] (Privado - Dynamic) - Atualizar Post (U)
    /admin/post/new (Privado - Dynamic) - Criar um Post (C)
    /admin/login (Pública - Dynamic) - Fazer o login do usuário

    Route (app)
    ┌ ○ /
    ├ ○ /_not-found
    └ ƒ /post/[slug]


    ○  (Static)   prerendered as static content
    ƒ  (Dynamic)  server-rendered on demand

```
