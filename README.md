# Link Shortener

Simple link shortener using latest technologies. This project contains an UI to create a new shortened link, you can access it here:

https://utzigui-link-shortener.vercel.app

To test an already created URL, just add the slug at the end of the root URL:

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
