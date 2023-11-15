# LogoHub: AI-Powered Logo Generator

**LogoHub** is an innovative project leveraging AI technology to create unique
logos. Built using Next.js and integrating OpenAI's advanced API, it offers an
intuitive platform for users to generate logos powered by artificial
intelligence.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 12 or later)
- Git
- A code editor (like VSCode)

## Getting Started

Follow these steps to set up the project locally:

### Clone the Repository:

```bash
git clone https://github.com/your-username/LogoHub.git
cd LogoHub
```

### Install Dependencies:

```bash
npm install
```

### Set Up Environment Variables:

You need to set up the following environment variables:

- OPENAI_API_KEY: Your OpenAI API key for AI functionalities.
- NEXT_PUBLIC_SUPABASE_URL: The URL to your Supabase project.
- NEXT_PUBLIC_SUPABASE_PUBLIC_KEY: The public API key for your Supabase project.
- GOOGLE_CLIENT_SECRET: The client secret key for Google OAuth.

Create a `.env.local` file in the root of the project and add the above
variables:

`OPENAI_API_KEY=your_openai_api_key`
`NEXT_PUBLIC_SUPABASE_URL=your_supabase_url`
`NEXT_PUBLIC_SUPABASE_PUBLIC_KEY=your_supabase_public_key`
`GOOGLE_CLIENT_SECRET=your_google_client_secret`

### Run the Development Server:

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` with your browser to see the result.

## Additional Information

- The project is structured using the standard Next.js framework.
- Supabase is used for authentication and database services.
- The OpenAI API is used for generating AI-based logos.

## Contributing

Contributions are welcome! If you're a student working on this project, feel
free to fork the repository, make changes, and create a pull request.
