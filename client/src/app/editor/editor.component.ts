import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'tldl-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  public editor;
  public toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],  // toggled buttons
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
      toolbar: this.toolbarOptions
    }
  };

  constructor() {}

  ngOnInit() {}

  onEditorBlured(quill) {
    console.log('editor blur!', quill);
  }

  onEditorFocused(quill) {
    console.log('editor focus!', quill);
  }

  onEditorCreated(quill) {
    this.editor = quill;
    console.log('quill is ready! this is current quill instance object', quill);
  }

  onContentChanged({quill, html, text}) {
    console.log('quill content is changed!', quill, html, text);
  }
}
