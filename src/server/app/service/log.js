import { pathExists, mkdirs, appendFile } from 'fs-extra';
import { join } from 'path';

class FileLog {
    constructor(pathname, filename) {
        this._pathname = pathname;
        this._filename = filename;
        this._fullfilename = join(this._pathname, this._filename);
        this._init = null;
        this._lines = [];
        this._writting = false;
        this.init();
    }

    init() {
        if (this._init === null) {
            this._init = pathExists(this._pathname)
                .then((exists)=>{
                    if (exists) {
                        return;
                    } else {
                        return mkdirs(this._pathname);
                    }
                });
        }
        return this._init;
    }

    write(message) {
        this._lines.push(message);
        if (! this._writting) {
            this._writting = true;
            this._init = this.init().then(() => {
                let lines = this._lines.splice(0);
                this._writting = false;
                return appendFile(this._fullfilename, lines.join(''), {mode: 0o600});
            });
        }
    }
}

export default class Log {
    constructor(params) {
        let { pathname, filename, filelog, current_user } = params || {};
        if (filelog !== undefined) {
            this._filelog = filelog;
        } else if (pathname !== undefined && filename !== undefined) {
            this._filelog = new FileLog(pathname, filename);
        }
        this._current_user = null;
        if (current_user !== undefined) {
            this._current_user = current_user;
        }
    }

    set current_user(value) {
        this._current_user = value;
    }

    get current_user() {
        return this._current_user || '-';
    }

    getSubLogger(user) {
        return new Log({filelog: this._filelog, current_user: user});
    }

    add(level, line) {
        let message = `${(new Date()).toISOString().replace('T',' ').replace('Z','')} ${level.padEnd(6,' ')} ${this.current_user.padEnd(12,' ')} ${line}`;
        // this is not a debug line, it's the official way to output the logs in the console.
        console.log(message);
        if (this._filelog !== undefined) {
            this._filelog.write(message+'\n');
        }
    }

    debug(line) { this.add('DEBUG', line); }
    info(line) { this.add('INFO', line); }
    warn(line) { this.add('WARN', line); }
    error(line) { this.add('ERROR', line); }
    fatal(line) { this.add('FATAL', line); }
}
