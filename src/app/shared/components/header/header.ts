import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../../features/auth/services/auth';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  readonly #auth = inject(Auth);
  readonly #router = inject(Router);
  protected readonly currentUser = this.#auth.currentUser;

  async signOut() {
    await this.#auth.signOut();
    this.#router.navigate(['/login']);
  }
}
