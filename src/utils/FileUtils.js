import { readdirSync, statSync } from 'fs';
import { resolve } from 'path';
import filesize from 'filesize';
import _ from 'lodash';

export default class FileUtils {
    static scanPath(path, presetActiveRecord, showHiddenFiles) {
        let records = [];

        if (path != '/') {
            let upDir = '..';
            records.push({
                key: 0,
                title: upDir,
                dir: true,
                size: '⇧',
                isSelected: presetActiveRecord ? false : true
            });
        }

        let files = readdirSync(path);

        let i = 1;
        for (let file of files) {
            const full_path = path + '/' + file;
            const isHiddenFile = file.startsWith('.');
            let addFileToList = true;

            let isSelected = path === '/' && i === 1;
            if(presetActiveRecord) {
                isSelected = file === presetActiveRecord;
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
                    isSelected
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
}