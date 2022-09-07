# habi-bot

BUILD nya di taruh di direktori /Application.

untuk build frontend, ketik

```bash
npm run build
```

dan otomatis build nya akan menuju ke folder /Application/public/

command ini sama artinya dengan

```bash
npm run build && cp -r build/* ../Application/public/
```
