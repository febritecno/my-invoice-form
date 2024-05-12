
# My Invoice Form

This project uses the SPA backend and frontend separately.

## Backend
- express
- bcryptjs
- cors
- mongoose

## Frontend
- reactjs
- redux
- framer animation
- datepicker
- yup validation
- formik
- tailwind framework

## List of command

```bash
  // install all packages
  npm run setup

  // install packages for frontend only
  npm run setup:frontend

  // install packages for frontend only
  npm run setup:backend

  // run the project
  npm run dev

  // run frontend projects only
  npm run dev:frontend

  // run backend projects only
  npm run dev:backend
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/febritecno/my-invoice-form.git
```

Go to the project directory

```bash
  cd my-invoice-form
```

Install dependencies

```bash
  npm install && npm run setup
```

Start the application

```bash
  npm run dev
```


## Environment Variables

Please change variable :

`MONGODB_URL` -> /backend/db.js for database mongodb

`BASE_API_URL` -> /frontend/src/context/context.js for the url backend