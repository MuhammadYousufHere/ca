### Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (version 20 or above)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Getting Started

First, Clone the project:

```bash
git clone https://github.com/MuhammadYousufHere/ca.git

```

Go into the project directory:

```bash
cd ca
```

Next up, Install the required dependencies (perfer yarn):

```bash
yarn install
```

Open/Run Docker Desktop

```bash
docker-compose up -d
```

Run the backend server :

```bash
npm run server
# or
yarn server
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.
