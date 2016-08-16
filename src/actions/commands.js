export const COMMAND_CREATE_DIRECTORY = 'COMMAND_CREATE_DIRECTORY';
export const COMMAND_DELETE_FILES = 'COMMAND_DELETE_FILES';

export function commandCreateDirectory(path, directory) {
    return {
        type: COMMAND_CREATE_DIRECTORY, path, directory
    };
}

export function commandDeleteFiles(path, records) {
    return {
        type: COMMAND_DELETE_FILES, path, records
    };
}