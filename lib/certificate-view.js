'use babel';

import path from 'path';
import {Emitter, Disposable, CompositeDisposable, File} from 'atom';
import {$, $$$, View} from 'atom-space-pen-views';
import getCertificate from './certificate';

export default class CertificateViwe extends View {

  static deserialize(state) {
    return new CertificateViwe(state);
  }

  static content() {
    this.div({
      outlet: 'container',
      class: 'CertificateViwe native-key-bindings',
      tabindex: -1
    }, () => {
      this.div({
        outlet: 'certificate',
        class: 'certificate'
      }, () => {
        this.div({
          outlet: 'detail',
          class: 'detail'
        }, () => {})
      })
    });
  }

  constructor(filePath) {
    super();
    this.filePath = filePath;
    this.emitter = new Emitter();
    this.disposables = new CompositeDisposable();

    if (this.filePath) {
      if (atom.workspace) {
        const cert = new getCertificate(this.filePath, this);
        let datas = cert.getDatas() || cert.getErrDatas();
        datas = datas.replace(/\r?\n/g, '</br>').replace(/\ \ /g, '&nbsp;&nbsp;');
        let html = '<hr>';
        html += `<div class="cert-detil-item">${datas}</div>`;
        html += '<hr>';
        this.detail.html(html);
      }
    }
  }

  destroy() {
    this.disposables.dispose();
  }

  onDidChangeTitle(callback) {
    return this.emitter.on('did-change-title', callback);
  }

  onDidChangeModified(callback) {
    // No op to suppress deprecation warning
    return new Disposable();
  }

  getTitle() {
    return path.basename(this.filePath);
  }
}

// atom.deserializers.add(CertificateViwe);
