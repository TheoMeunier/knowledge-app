<div align="center">
<a href="https://github.com/TheoMeunier/knowledge_app">
<img src="docs/images/logo.png" alt="Logo" width="150" height="150">
</a>

<h2 align="center">Uptime Kotlin</h3>
  <p align="center">
    <a href="https://github.com/TheoMeunier/knowledge-app/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/TheoMeunier/knowledge-app/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

## About The Project

A simple, lightweight, and self-hostable knowledge management and documentation platform designed for teams and
communities.

It provides an intuitive way to create, organize, and share documentation using a clean Markdown editor.
Built for collaboration, the platform allows users to structure content in folders, manage access through
authentication, and easily share knowledge with others.

Ideal for internal documentation, technical guides, project notes, or community knowledge bases.

### Key Features

- Secure user authentication and login system
- Folder-based organization for structured documentation
- Powerful Markdown editor for writing and formatting content
- Easy document sharing across teams or communities
- Clean and intuitive interface for fast documentation
- Self**-hostable and lightweight deployment**
- Designed for collaborative documentation

### Built With

- [Adonis](https://docs.adonisjs.com/)
- [React](https://reactjs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

## Getting Started

1. Create file `.env`:

```bash
cp .env.example .env
```

2. Create a `compose.yaml` file

```yml
services:
  knowledge_app:
    image: ghcr.io/theomeunier/knowledge_app:latest
    container_name: knowledge_app
    restart: unless-stopped
    ports:
      - '3333:3333'
    environment:
      TZ: Europe/Paris
      APP_URL: ${APP_URL}
      APP_KEY: ${APP_KEY}
      DB_HOST: postgres
      DB_PORT: 5432
      DB_USER: knowledge_app
      DB_PASSWORD: knowledge_app
      DB_DATABASE: knowledge_app
    networks:
      - app_network

  postgres:
    image: postgres:17.8-alpine
    container_name: knowledge_app_database
    restart: unless-stopped
    ports:
      - '5432:5432'
    environment:
      POSTGRES_DB: knowledge_app
      POSTGRES_USER: knowledge_app
      POSTGRES_PASSWORD: knowledge_app
      PGDATA: /var/lib/postgresql/data/pgdata
    volumes:
      - ./storage-db:/var/lib/postgresql/data
    depends_on:
      - knowledge_app
    networks:
      - app_network

networks:
  app_network:
    driver: bridge
```

3. Configure the `variable environnement` file

3.1 App variables:

- `APP_URL` : The URL of your application
- `APP_KEY` : The encryption key used to encrypt sensitive data in the application. It should be a random string of at
  least 32 characters.

  3.2 PostgreSQL Configuration:

- `DB_HOST` : The host of your PostgreSQL database
- `DB_PORT` : The port of your PostgreSQL database
- `DB_USER` : The username of your PostgreSQL database
- `DB_PASSWORD` : The password of your PostgreSQL database
- `DB_DATABASE` : The name of your PostgreSQL database

4. Start the application with docker-compose

```bash
   docker compose up -d
```

5. Access the application

```bash
   http://localhost:3333
```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any
contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also
simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
