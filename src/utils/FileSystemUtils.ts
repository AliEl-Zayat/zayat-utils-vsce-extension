import fs from "fs/promises";

/**
 * This file contains utility functions for working with the file system.
 * It provides methods for creating directories, appending to files, and creating files with content.
 */
export class FileSystemUtils {
    static async createDirectory(directoryPath: string): Promise<void> {
        await fs.mkdir(directoryPath, { recursive: true });
    }

    static async appendToFile(filePath: string, content: string): Promise<void> {
        await fs.appendFile(filePath, content);
    }

    static async createFileWithContent(filePath: string, content: string): Promise<void> {
        await fs.writeFile(filePath, content);
    }
}
