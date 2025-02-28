# Heiccough - HEIC to JPEG Converter

A simple web application that allows users to convert HEIC images to JPEG format through a drag-and-drop interface.

## Features

- Drag and drop multiple HEIC images at once
- Automatic conversion to JPEG format
- Automatic download of converted images
- Real-time conversion status updates
- Simple and intuitive user interface

## Technologies Used

- React
- TypeScript
- Vite
- heic2any library

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or pnpm

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/heiccough.git
cd heiccough
```

2. Install dependencies

```bash
npm install
# or
pnpm install
```

3. Start the development server

```bash
npm run dev
# or
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Open the application in your web browser
2. Drag and drop HEIC images into the drop zone
3. The application will automatically convert the images to JPEG format
4. Converted images will be downloaded automatically
5. You can see the conversion status for each file in the list below the drop zone

## License

MIT

## Acknowledgements

- [heic2any](https://github.com/alexcorvi/heic2any) - Library used for HEIC to JPEG conversion
