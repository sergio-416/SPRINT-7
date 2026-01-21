import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../environments/environment.development';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class Firebase {
  readonly #app = initializeApp(firebaseConfig);
  readonly #auth = getAuth(this.#app);

  getAuth() {
    return this.#auth;
  }
}
