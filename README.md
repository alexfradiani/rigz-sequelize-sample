# Sample App Prototype: Node.js

- Runs with Firebase cloud functions `(index.js)`
- MVC pattern:
  - Models: `src/database/models`
  - Controllers: `src/controllers`
  - Services: `src/services`
- Models with [Sequelize](https://sequelize.org/master/manual/)
  - Demostrates basic associations:
    - `(1:1 association)`: see `Products` and `Specs`.
    - `(1:N association)`: see `Catalogs` and `Products`.
    - `(M:N association)`: see `Products` and `Promos`.
  - Each controllers includes basic CRUD operations within the models.
