# Chat With LLM

A React-based conversational UI that allows users to interact with a Large Language Model (LLM). This project supports rendering bot responses, collapsible source document sections, and a smooth loading animation with bubbles.

## Features

- **User and Bot Messages**: Displays user inputs and bot responses in a clean, conversational format.
- **HTML Rendering**: Renders stringified HTML templates for bot responses using `html-react-parser`.
- **Collapsible Source Section**: Displays source documents in a collapsible section below bot responses.
- **Loading Animation**: Shows a "3 bubbles" loading animation while waiting for API responses.
- **API Integration**: Proxies API requests to avoid CORS issues.

## Demo

![Chat UI Demo](https://via.placeholder.com/800x400?text=Chat+With+LLM+Demo)  
*(Replace this with an actual screenshot or GIF of your application.)*

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/chat-with-llm.git
   cd chat-with-llm
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the app in your browser at `http://localhost:5173`.

## Configuration

### Proxy Setup
To avoid CORS issues, the project uses a proxy configuration in `vite.config.ts`. Update the `target` field with your API server URL:
```typescript
server: {
  proxy: {
    '/api': {
      target: 'https://your-server-url.com',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
},
```

### API Endpoint
Update the `URL` constant in `ChatWithLLM.tsx` with your API endpoint:
```typescript
const URL = "https://your-api-endpoint.com";
```

## Project Structure

```
src/
├── components/
│   └── ChatWithLLM.tsx   # Main chat component
├── styles/
│   └── ChatWithLLM.css   # Styles for the chat UI
├── App.tsx               # Root component
├── main.tsx              # Entry point
└── vite.config.ts        # Vite configuration
```

## Technologies Used

- **React**: Frontend framework for building the UI.
- **TypeScript**: For type safety and better developer experience.
- **Vite**: Fast build tool for modern web projects.
- **Axios**: For making API requests.
- **html-react-parser**: For rendering stringified HTML templates.
- **React Icons**: For icons like send, expand, and collapse.

## Features in Detail

### 1. User and Bot Messages
- User messages are displayed on the right.
- Bot messages are displayed on the left and can render HTML content.

### 2. Collapsible Source Section
- Each bot response can include a list of source documents.
- The source section is collapsible, with expand (`V`) and collapse (`^`) icons.

### 3. Loading Animation
- A "3 bubbles" animation is displayed while waiting for API responses.

### 4. API Integration
- The app sends user inputs to the API and displays the bot's response along with source documents.

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run preview`: Preview the production build.