# CTR Web

A presentation website for a youth organization built with Next.js, TypeScript, and Tailwind CSS.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/components`: Reusable UI components
- `src/pages`: Next.js pages
- `src/styles`: Global styles and Tailwind configuration
- `public`: Static assets

## Deployment

The project is configured for production deployment. To build for production:

```bash
npm run build
```

Then, start the production server:

```bash
npm run start
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

## License

This project is licensed under the MIT License. 