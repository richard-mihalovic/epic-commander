export const COMMAND_CREATE_DIRECTORY = 'COMMAND_CREATE_DIRECTORY';

export function commandCreateDirectory(path, directory) {
    return {
        type: COMMAND_CREATE_DIRECTORY, path, directory
    };
}