## Тестовое задание "Софтер" на должность "Junior frontend-developer".

### Задача:

Используя react реализовать компонент выбора и загрузки файлов в Яндекс.Диск. Нужно предусмотреть выбор от 1 до 100 файлов.

### Added functionality:

- Create a folder in Yandex Disk
- Uploading files in Yandex Disk
- Validation of data entry fields

## Run Locally

Clone the project

```bash
  git clone https://github.com/AlbShar/TestTaskSofter.git
```

Go to the project directory

```bash
  cd TestTaskSofter
```

Install dependencies

```bash
  npm install
```

Add the following environment variables to your .env file (in the root of your project’s directory). To get your own `API_TOKEN` go to the [link](https://yandex.ru/dev/direct/doc/start/token.html) and follow instructions.

```bash
  REACT_APP_API_TOKEN='...'

  REACT_APP_API_BASEURLFOLDER='https://cloud-api.yandex.net/v1/disk/resources?path='

  REACT_APP_API_BASEURLUPLOAD='https://cloud-api.yandex.net/v1/disk/resources/upload?path='
```

Start the development server

```bash
  npm run start
```

### Tech Stack:

- React
- TypeScript
- Styled-components
- Formik
- Prettier
