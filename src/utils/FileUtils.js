import { readdirSync, readFileSync, statSync } from 'fs';
import path from 'path';
import filesize from 'filesize';
import _ from 'lodash';

export default class FileUtils {
    static scanPath(path, presetActiveRecord, showHiddenFiles) {
        let records = [];
        const pathSeparator = this.separator();

        if (path != pathSeparator) {
            let upDir = '..';
            records.push({
                key: 0,
                title: upDir,
                dir: true,
                size: '⇧',
                isSelected: false,
                isActive: presetActiveRecord ? false : true
            });
        }

        let files = readdirSync(path);

        let i = 1;
        for (let file of files) {
            const full_path = path + pathSeparator + file;
            const isHiddenFile = file.startsWith('.');
            let addFileToList = true;

            let isActive = path === pathSeparator && i === 1;
            if(presetActiveRecord) {
                isActive = file === presetActiveRecord;
            }

            if (isHiddenFile && !showHiddenFiles) {
                addFileToList = false;
            }

            if (addFileToList) {
                const stat = statSync(full_path);
                const isDirectory = stat.isDirectory();

                records.push({
                    key: i,
                    title: file,
                    dir: isDirectory,
                    size: isDirectory ? 'DIR' : filesize(stat.size),
                    isSelected: false,
                    isActive
                });

                i++;
            }
        }

        const _directories = _.filter(records, (record) => record.dir === true );
        const _files = _.filter(records, (record) => record.dir === false );
        const _sorted_direcotries = _.sortBy(_directories, (record) => record.title);
        const _sorted_files = _.sortBy(_files, (record) => record.title);

        return _.concat(_sorted_direcotries, _sorted_files);
    }

    static isDirectory(path) {
        return statSync(path).isDirectory();
    }

    static isFile(path) {
        return statSync(path).isFile();
    }

    static readFile(filename, encoding='utf-8') {
        return readFileSync(filename, encoding);
    }

    /** Returns platform independent path separator. (unix: '/', win: '\') */
    static separator() {
        return path.sep;
    }
}