# Link Shortener

Simple link shortener using latest technologies. This project has no UI yet to register new URLs, but you can test it here (you should be redirected back to my Github):

https://utzigui-link-shortener.vercel.app/github

To see the database data of the registered slug, you can access:

https://utzigui-link-shortener.vercel.app/api/get-url/github

## Prisma

By using Prisma to structure the models, we save the links with the current structure:

| ID  | Created at              | URL                               | Slug   |
| --- | ----------------------- | --------------------------------- | ------ |
| 1   | 2022-12-08 13:59:31.216 | https://github.com/guilhermeutzig | github |

- `URL`: Link to be shortened
- `Slug`: Slug used in the URL to be redirected to the URL

e.g. `https://utzigui-link-shortener.vercel.app/{slug}`

## Todo

- Create UI to register URL
