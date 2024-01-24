# C28_FRD_PRJ_team3
This Project aims to create an English learning platform that includes flashcards and AI-generated articles for users to learn English.

To run this program:
1. Clone the repo:

  `git@github.com:benjiz1942/C28_FRD_PRJ_team3.git`

2. In flash-cs-app:

 Input the following command in the terminal
  ```
  yarn install
  yarn start
  ```
 Input the following command
  `
  REACT_APP_API_SERVER = http://localhost:8080
  `

3. In flash-cs-api:

  Input the following command in the terminal
  ```
  yarn install
  yarn prisma init
  yarn ts-node prisma/seed.ts
  yarn start
  ```

  Input the command in .env (The following code is the sample for your reference) 
  ```
  DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
  FRONTEND_ORIGIN=http://localhost:3000
  JWT_SECRET=
  ```
