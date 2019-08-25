import {Injectable} from '@angular/core';
import {Document} from "../model/document";
import {HttpClient} from "@angular/common/http";


const BASE_URI = 'data/';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data: {
    [documentName: string]: string
  } = {};

  constructor(private httpClient: HttpClient) {
  }

  async getDocumentBody(name: string): Promise<string> {

    if (!this.data.hasOwnProperty(name)) {
      return await this.httpClient.get<string>(
        BASE_URI + name + '/body.md', {
          // @ts-ignore
          responseType: 'text'
        }).toPromise();
    }
    return this.data[name];


  }
}
