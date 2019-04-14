# Javascript - Prisma as a data access layer to mysql - starter kit

docker-compose up -d

prisma init --endpoint http://localhost:4466

prisma deploy
  http://localhost:4466/_admin.


  generate:
    - generator: javascript-client
      output: ./generated/prisma-client/

prisma generate

npm init -y
npm install --save prisma-client-lib

Change Datamodel
prisma deploy
prisma generate 

or
prisma.yml
  hooks:
    post-deploy:
      - prisma generate