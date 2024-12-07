import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class RequestService {

  constructor(
   public http: HttpClient
  ) {}

  getAllAgents() {
    return new Promise<any>((resolve, reject) => {
      this.http.get(environment.urlCentralEventos + environment.endPointCentralEventosAgent)
      .subscribe(res => {
        resolve(res);
      }, err => {
        let errorMessage = 'Unknown error occurred';
        if (err.error && err.error.message) {
          errorMessage = err.error.message;
        } else if (err.statusText) {
          errorMessage = err.statusText;
        }
        reject({ message: errorMessage });
      });
    })
  }

  addNewAgent(agent: any) {
    return new Promise<any>((resolve, reject) => {
      this.http.post(environment.urlCentralEventos + environment.endPointCentralEventosAgent, agent)
      .subscribe(res => {
        resolve(res);
      }, err => {
        let errorMessage = 'Unknown error occurred';
        if (err.error && err.error.message) {
          errorMessage = err.error.message;
        } else if (err.statusText) {
          errorMessage = err.statusText;
        }
        reject({ message: errorMessage });
      });
    })
  }

  deleteAgent(id: any) {
    return new Promise<void>((resolve, reject) => {
      this.http.delete(environment.urlCentralEventos + environment.endPointCentralEventosAgent+`/${id}`)
      .subscribe(res => {
        resolve();
      }, err => {
        let errorMessage = 'Unknown error occurred';
        if (err.error && err.error.message) {
          errorMessage = err.error.message;
        } else if (err.statusText) {
          errorMessage = err.statusText;
        }
        reject({ message: errorMessage });
      });
    })
  }

  getAllEvents() {
    return new Promise<any>((resolve, reject) => {
      this.http.get(environment.urlCentralEventos + environment.endPointCentralEventosEvent)
      .subscribe(res => {
        resolve(res);
      }, err => {
        let errorMessage = 'Unknown error occurred';
        if (err.error && err.error.message) {
          errorMessage = err.error.message;
        } else if (err.statusText) {
          errorMessage = err.statusText;
        }
        reject({ message: errorMessage });
      });
    })
  }

  addNewEvent(event: any) {
    return new Promise<any>((resolve, reject) => {
      this.http.post(environment.urlCentralEventos + environment.endPointCentralEventosEvent, event)
      .subscribe(res => {
        resolve(res);
      }, err => {
        let errorMessage = 'Unknown error occurred';
        if (err.error && err.error.message) {
          errorMessage = err.error.message;
        } else if (err.statusText) {
          errorMessage = err.statusText;
        }
        reject({ message: errorMessage });
      });
    })
  }

  getEvent(eventId: number) {
    return new Promise<any>((resolve, reject) => {
      this.http.get(environment.urlCentralEventos + environment.endPointCentralEventosEvent + "/" + eventId)
      .subscribe(res => {
        resolve(res);
      }, err => {
        let errorMessage = 'Unknown error occurred';
        if (err.error && err.error.message) {
          errorMessage = err.error.message;
        } else if (err.statusText) {
          errorMessage = err.statusText;
        }
        reject({ message: errorMessage });
      });
    })
  }

}
