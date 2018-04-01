import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Document} from './../interfaces/document';
import {DocumentService} from './../services/document.service';

@Component({
  selector: 'tldl-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  public id: string;
  private sub;
  public editor;
  public toolbarOptions = [
    ['voice'], ['bold', 'italic', 'underline', 'strike'],  // toggled buttons
    ['blockquote', 'code-block'],

    [{'header': 1}, {'header': 2}],  // custom button values
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],  // superscript/subscript
    [{'indent': '-1'}, {'indent': '+1'}],      // outdent/indent
    [{'direction': 'rtl'}],                    // text direction

    [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
    [{'header': [1, 2, 3, 4, 5, 6, false]}],

    [{'color': []}, {'background': []}],  // dropdown with defaults from theme
    [{'font': []}], [{'align': []}],

    ['clean'],
    ['formula']  // remove formatting button
  ];
  public editorConfig = {
    placeholder: 'Let\'s begin...',
    modules: {
      formula: true,  // Include formula module
      toolbar: {
        container: this.toolbarOptions,
        handlers: {
          'voice': (val) => {
            console.log('voice!')
          }
        }
      }
    }
  };

  public editorContent = '';
  private doc;


  public title = ' ';

  constructor(
      private _router: ActivatedRoute, private _docService: DocumentService) {}

  ngOnInit() {
    this.sub = this._router.params.subscribe(res => {
      this.id = res['id'];
      this._docService.getDocument(this.id).subscribe(result => {
        this.doc = result;
        this.title = result.name;
        this.editorContent = this.doc.html;
      });
    })
  }

  ngOnDestroy() {}

  onEditorBlured(quill) {
    console.log('editor blur!', quill);
  }

  onEditorFocused(quill) {
    console.log('editor focus!', quill);
  }

  onEditorCreated(quill) {
    this.editor = quill;
    let el = document.getElementsByClassName('ql-voice')[0];
    el.innerHTML = '<i class="material-icons" style="font-size: 20px">mic</i>';
  }

  onContentChanged({quill, html, text}) {
    let doc: Document = {
      html: html,
      text: text,
      date: new Date().toISOString(),
      name: this.title
    };

    this._docService.saveDocument(this.id, doc);
  }
}
