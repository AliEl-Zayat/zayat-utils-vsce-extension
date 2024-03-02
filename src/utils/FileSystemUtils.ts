import fs from "fs/promises";

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