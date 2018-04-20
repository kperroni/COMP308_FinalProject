import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  message: any = {
    'type': '',
    'title': '',
    'body': '',
    'clear': '1'
  };

  constructor() { }

  setMessage(type, title, body) {
    this.message.type = type;
    this.message.title = title;
    this.message.body = body;
    this.message.clear = '0';
  }

  getMessage() {
    return this.message;
  }

  clearMessage() {
    this.message.type = '';
    this.message.title = '';
    this.message.body = '';
  }
}
