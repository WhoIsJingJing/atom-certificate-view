'use babel';

import process from 'child_process';
import fs from 'fs';

export default class getCertificate {
  constructor(filePath) {
    this.fileText = fs.readFileSync(filePath, {
      flag: 'r',
      encoding: 'utf-8'
    });
    const spawn = process.spawnSync;
    const text = spawn('echo', [this.fileText], {encoding: 'utf-8'});
    let openssl_cmd = atom.config.get('certificate-view.openssl') || "openssl";
    const openssl = spawn(openssl_cmd, [
      'x509',
      '-nameopt',
      'sep_semi_plus_space',
      '-certopt',
      'ext_dump',
      '-text',
      '-noout'
    ], {
      encoding: 'utf-8',
      input: text.stdout
    });
    this.certificate = openssl.stdout;
    this.certificateErr = openssl.stderr;
  }
  getDatas() {
    return this.certificate;
  }
  getErrDatas() {
    return this.certificateErr;
  }
}
