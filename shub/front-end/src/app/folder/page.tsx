"use client"
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import { useShub } from '../Provider/Provider';

const DirectoryPicker = () => {
  const [directories, setDirectories] = useState<string[]>([]);
  const [files, setFiles] = useState<{file: File, path: string, buffer: ArrayBuffer}[]>([]);
  const userId = Cookies.get('userId');
  const pathname = usePathname()
  const accessToken = Cookies.get('accessToken');
  const {  toggleShowUpload, handleChange } = useShub();


  

  const handleDirectorySelection = async () => {
    if ('showDirectoryPicker' in window) {
      try {
        const directoryHandle = await (window as any).showDirectoryPicker();
        const directories = await getDirectoriesInDirectory(directoryHandle, '/'+directoryHandle.name);
        directories.push('/'+directoryHandle.name);
        setDirectories(directories);
        const files = await getFilesInDirectory(directoryHandle, '/'+directoryHandle.name);
        setFiles(files);
      } catch (err) {
        console.error(err);
      }
    } else {
      alert('Your browser does not support the showDirectoryPicker API');
    }
  };

  const getDirectoriesInDirectory = async (directoryHandle: any, path: string): Promise<string[]> => {
    const directories: string[] = [];

    for await (const entry of directoryHandle.values()) {
      const newPath = `${path}/${entry.name}`;
      if (entry.kind === 'directory') {
        directories.push(newPath);
        const subDirectoryDirectories = await getDirectoriesInDirectory(entry, newPath);
        directories.push(...subDirectoryDirectories);
      }
    }
    return directories;
  };

  const getFilesInDirectory = async (directoryHandle: any, path: string): Promise<{file: File, path: string, buffer: ArrayBuffer}[]> => {
    const files: {file: File, path: string, buffer: ArrayBuffer}[] = [];
    for await (const entry of directoryHandle.values()) {
      const newPath = `${path}/${entry.name}`;
      if (entry.kind === 'file') {
        const file = await entry.getFile();
        const buffer = await file.arrayBuffer();
        files.push({file, path: newPath, buffer});
      } else if (entry.kind === 'directory') {
        const subDirectoryFiles = await getFilesInDirectory(entry, newPath);
        files.push(...subDirectoryFiles);
      }
    }
    return files;
  };

  return (
    <div>
      <button onClick={handleDirectorySelection}>Select Directory</button>
      {directories.length > 0 && (
        <ul>
          {directories.map((directory, index) => (
            <li key={index}>
              {directory}
            </li>
          ))}
        </ul>
      )}
      
      {files.length > 0 && (
        <ul>
          {files.map(({file, path, buffer}, index) => {
      
            return (<li key={index}>
              {path} 
            </li>)
          })}
        </ul>
      )}
    </div>
  );
};

export default DirectoryPicker;
