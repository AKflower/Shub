// pages/index.tsx (Next.js)
"use client"
import { useEffect, useState } from 'react';

interface FileData {
  name: string;
}

export default function Home() {
  const [files, setFiles] = useState<FileData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/files/path/to/your/folder');
        const data: FileData[] = await response.json();
        setFiles(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Files in the folder:</h1>
      <ul>
        {files.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
}
