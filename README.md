# eko-koa
A Koa starter pack based on Objection, Knex and EJS. This is a sane alternative for frameworks such as Sails and Adonis. PR and forking are welcome!


### Requirements and installation:

**Requirements**: Node 8+

**Installation**: ``git clone https://github.com/ilja903/eko-koa.git && cd eko-koa && npm install``

**Migrating and seeding the database**: ``npm run knex -- migrate:latest && npm run knex -- seed:run``

**Running**: ``npm start``

**Testing**: ``npm test``


### Features:
- Koa (Routing)
- EJS (Templating engine)
- Knex (Query builder, DB migrating and seeding)
- ObjectionJS (ORM based on Knex)
- Ava (Testing Framework)
- nyc (Testing coverage)
- i18n and locales (Both in EJS templates and server)
- Sane error reporting (Youch and Pretty error) 
- Compressing and security (helmet)
- Logging (koa-logger)
- Session management via cookies
- Flash messages
- Cron job support
- Drivers for pg/mysql/maria/sqlite
- Hot reload for development (nodemon)
- Formatting tool (prettier)
- Config files for development, testing/staging and production!
- Uses sqlite for initial setup (could be reconfigured, only needed for demo purposes)

### Rationale:
- Do not create an own framework, use all available node packages of node community.
- Ship a battaries included app, where the glue code is already written for you.
- Provide basic folder structure for an app.
- Ship with a small example app which could show most of the features.
- Community/PR/Forking/Issues welcome!

### Todo:
- Lots of documentation (PRs welcome!)
- Mailers (PRs welcome!)
- Basic auth capabilities (PRs welcome!)


