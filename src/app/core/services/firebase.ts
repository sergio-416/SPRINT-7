import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../environments/environment.development';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class Firebase {
  readonly #app = initializeApp(firebaseConfig);
  readonly #auth = getAuth(this.#app);
  constructor() {
    setPersistence(this.#auth, browserLocalPersistence);
  }
  getAuth() {
    return this.#auth;
  }
}
