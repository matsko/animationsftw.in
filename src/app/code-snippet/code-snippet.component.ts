import { Input, ViewChild, Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import * as Prism from 'prismjs';

const DEFAULT_LANGUAGE = 'javascript';

function getFileNameExtension(fileName: string): string {
  const dotIndex = fileName.lastIndexOf('.');
  if (dotIndex <= 0) return '';

  const extName = fileName.substr(dotIndex + 1);
  return extName;
}

function resolveLanguageFromFileName(fileName: string) {
  fileName = fileName.replace('.example-', '.');
  const ext = getFileNameExtension(fileName).toLowerCase();
  switch (ext) {
    case 'js':
    case 'ts':
    case 'javascript':
      return 'javascript';
    case 'css':
      return 'css';
    case 'htm':
    case 'html':
      return 'html';
    default:
      return DEFAULT_LANGUAGE;
  }
}

@Component({
  selector: 'app-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss'],
})
export class CodeSnippetComponent implements OnInit {
  @ViewChild('code')
  public codeContainer;

  @Input('src')
  public src: string;

  @Input('language')
  public language: string;

  public status: 'default'|'ready'|'loading'|'error' = 'default';

  constructor(private _http: Http) {}

  ngOnInit() {
    let src = this.src;
    this.status = 'loading';
    if (src) {
      this._http.get(src).toPromise().then(response => {
        const language = resolveLanguageFromFileName(src);
        this._updateContent(response.text(), language);
      }).catch(e => {
        this.status = 'error';
      });
    } else {
      const language = this.language || DEFAULT_LANGUAGE;
      const element = this.codeContainer.nativeElement;
      const code = element.innerText;
      this._updateContent(code, language);
    }
  }

  private _updateContent(code: string, language: string) {
    this.status = 'ready';
    const text = Prism.highlight(code,  Prism.languages[language]);
    const element = this.codeContainer.nativeElement;
    element.innerHTML = text.trim();
  }
}
