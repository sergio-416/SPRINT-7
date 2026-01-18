import { inject, Injectable, signal } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { Supabase } from '../../../core/services/supabase';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  readonly #supabase = inject(Supabase);
  currentUser = signal<User | null>(null);
  readonly #authSubscription = this.#initAuthListener();

  #initAuthListener() {
    return this.#supabase.getClient().auth.onAuthStateChange((event, session) => {
      this.currentUser.set(session?.user ?? null);
    });
  }
  
  async signIn(email: string, password: string) {
    return this.#supabase.getClient().auth.signInWithPassword({ email, password });
  }

  async signUp(email: string, password: string) {
    return this.#supabase.getClient().auth.signUp({ email, password });
  }

  async signOut() {
    return this.#supabase.getClient().auth.signOut();
  }
}
