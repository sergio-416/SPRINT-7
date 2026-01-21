import { inject, Injectable, signal } from '@angular/core';
import { Firebase } from '../../../core/services/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  readonly #firebase = inject(Firebase);
  readonly #auth = this.#firebase.getAuth();
  readonly #currentUser = signal<FirebaseUser | null>(null);
  readonly currentUser = this.#currentUser.asReadonly();

  constructor() {
    this.#initAuthListener();
  }

  #initAuthListener() {
    return onAuthStateChanged(this.#auth, (user) => {
      this.#currentUser.set(user);
    });
  }

  async signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.#auth, email, password);
  }

  async signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.#auth, email, password);
  }

  async signOut() {
    return firebaseSignOut(this.#auth);
  }
}
