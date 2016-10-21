'use babel';

// import certificateView from './certificate-view';
import {CompositeDisposable} from 'atom';
import path from 'path';
import _ from 'underscore-plus';
import CertificateViwe from './certificate-view';
const certificatesExtensions = ['.pem', '.crt', '.rsa', '.ccr', 'pcm'];

export default {
  atomCertificateView : null,
  activate(state) {
    this.atomCertificateView = new CompositeDisposable();
    this.atomCertificateView.add(atom.workspace.addOpener((uriToOpen) => this.openCertificate(uriToOpen)));

  },
  addPreviewForEditor(uriToOpen) {
    return new CertificateViwe(uriToOpen);
  },
  openCertificate(uriToOpen) {
    const uriExtension = path.extname(uriToOpen).toLowerCase();
    const config_switch = atom.config.get('certificate-view.display') === undefined || atom.config.get('certificate-view.display');
    if (_.include(certificatesExtensions, uriExtension) && config_switch) {
      return this.addPreviewForEditor(uriToOpen);
    }
  },
  deactivate() {
    this.atomCertificateView.destroy();
  }
};

function isCertificateViwe(object) {
  return object instanceof CertificateViwe;
}
