## Get started

```
npm run webpack:dev
```

## CHANGELOG

[09.10]
* добавлены три типа компонетов ( три папки ), чтобы избежать зацикливания  import
  - components -  простые компоненты
  - app -  корневые компоненты 
  - pages -  компоненты страниц
* расширены функции для создания простых элкментов ``createElement  createDiv createFullsizeDiv``
* добавлены утилиты для  redux
* разрешено использовать jest snapshots
* React 16
[11.09]
* удален postcheckout хук
