import { ViewChild, Component, OnInit } from '@angular/core';
import * as Prism from 'prismjs';

@Component({
  selector: 'app-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss']
})
export class CodeSnippetComponent implements OnInit {
  @ViewChild('code')
  public codeContainer;

  public language = 'javascript';

  constructor() {}

  ngOnInit() {
    const element = this.codeContainer.nativeElement;
    const text = Prism.highlight(element.innerText,  Prism.languages[this.language]);
    element.innerHTML = text.trim();
  }

}
