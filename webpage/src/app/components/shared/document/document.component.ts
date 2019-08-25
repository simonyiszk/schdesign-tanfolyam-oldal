import {Component, Input} from '@angular/core';
import {ParserService} from "../../../services/parser.service";
import {DataService} from "../../../services/data.service";
import {Document} from "../../../model/document";

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent {
  html: string;

  @Input() set documentName(value: string) {
    this.loadDocumentBody(value);
  }

  constructor(private parserService: ParserService,
              private dataService: DataService) {
  }

  private async loadDocumentBody(name: string) {
    const documentBody = await this.dataService.getDocumentBody(name);
    this.html = this.parserService.parse(documentBody);
  }

}
