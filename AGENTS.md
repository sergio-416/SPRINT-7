# AGENTS.md - Coding Agent Guidelines

This document provides essential information for AI coding agents working in this Angular 21 project, reflecting current best practices and learned priorities.

## Project Overview

- **Framework**: Angular 21.0.6 (standalone components, **signals-based for state management, RxJS interop with `toSignal()`**)
- **Package Manager**: Bun 1.3.5
- **Testing**: Vitest with @angular/build unit-test builder (**ALWAYS use `ng test` command for running tests**)
- **Linting**: ESLint 9.39.2 with Angular ESLint 21.1.0, TypeScript ESLint 8.51.0
- **Styling**: TailwindCSS 4.1.18
- **TypeScript**: 5.9.3 with strict mode enabled
- **Current Project Context**: SPRINT-7, Exercise 1 - TMDB Movie List Application. Progressing through component TDD to display movie list.

## Build, Lint, and Test Commands

### Development

```bash
bun start              # Start dev server (default: development config)
bun run watch          # Build with watch mode
```

### Building

```bash
bun run build          # Production build (default)
bun run build -- --configuration development  # Development build
```

### Linting

```bash
bun run lint           # Run ESLint on all TypeScript and HTML files
```

### Testing

```bash
ng test                # **ALWAYS use this to run all tests with Vitest (preferred)**
# Custom alias usage:
# test:s <file-pattern> # Run single test file (e.g., test:s movies.spec)
# test:sui <file-pattern> # Run single test file with Vitest UI (e.g., test:sui movies.spec)
```

## Code Style Guidelines

### ESLint Configuration

**Enabled Rules**:

- ESLint recommended + TypeScript ESLint recommended & stylistic
- Angular ESLint recommended for TS and templates
- Template accessibility rules enabled
- Inline template processing enabled

**Enforced Rules**:

- Component selectors: `app-` prefix, kebab-case (e.g., `app-user-card`)
- Directive selectors: `app` prefix, camelCase (e.g., `appHighlight`)
- Lints both TypeScript (`.ts`) and HTML (`.html`) files

### Formatting (Prettier + EditorConfig)

- **Indentation**: 2 spaces (enforced by EditorConfig)
- **Quotes**: Single quotes for TypeScript/JavaScript
- **Line Width**: 100 characters (Prettier)
- **Charset**: UTF-8
- **Line Endings**: Insert final newline, trim trailing whitespace
- **HTML Parser**: Angular-specific parser for templates

### TypeScript Configuration

**Strict Mode Enabled** - All strict compiler options are active:

- `strict: true`
- `noImplicitOverride: true`
- `noPropertyAccessFromIndexSignature: true`
- `noImplicitReturns: true`
- `noFallthroughCasesInSwitch: true`
- `strictInjectionParameters: true`
- `strictInputAccessModifiers: true`
- `strictTemplates: true`

**Target**: ES2022, **Module**: preserve

### Imports Organization

Order imports as follows:

1. Angular core imports (`@angular/core`, `@angular/common`, etc.)
2. Third-party libraries
3. Local application imports (relative paths)

Example:

```typescript
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MyService } from './services/my-service';
```

### Naming Conventions

- **Components**: PascalCase, no `Component` suffix (e.g., `App`, `UserProfile`)
- **Services**: PascalCase with descriptive names (e.g., `DataService`, `AuthService`)
- **Files**:
  - Component: `component-name.ts`
  - Template: `component-name.html`
  - Styles: `component-name.css`
  - Tests: `component-name.spec.ts`
- **Variables/Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Signals**: Descriptive names (e.g., `count`, `userName`, `isLoading`)

### Angular Component Guidelines

**Default Component Structure** (enforced by angular.json schematics):

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-component-name',
  imports: [],
  templateUrl: './component-name.html',
  styleUrl: './component-name.css',
  changeDetection: ChangeDetectionStrategy.OnPush, // Auto-added by schematic
})
export class ComponentName {
  // Component logic
}
```

**CRITICAL RULES**:

- DO NOT add `standalone: true` (it's the default in Angular 21+)
- ALWAYS use `changeDetection: ChangeDetectionStrategy.OnPush` (project default)
- Use `input()` and `output()` functions instead of `@Input/@Output` decorators
- Use `signal()` for reactive state
- Use `computed()` for derived state
- Avoid `@HostBinding` and `@HostListener` - use `host` object instead

Example:

```typescript
import { Component, input, output, signal, computed } from '@angular/core';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.html',
  host: {
    '[class.active]': 'isActive()',
    '(click)': 'handleClick()',
  },
})
export class UserCard {
  // Modern APIs
  readonly name = input.required<string>();
  readonly userClicked = output<string>();

  protected readonly count = signal(0);
  protected readonly doubleCount = computed(() => this.count() * 2);
}
```

### Template Guidelines

- Use **native control flow**: `@if`, `@for`, `@switch` (NOT `*ngIf`, `*ngFor`, `*ngSwitch`)
- Use **class/style bindings** instead of `ngClass`/`ngStyle`
- Prefer Reactive Forms over Template-driven forms
- Use `async` pipe for observables

Example:

```html
@if (isLoading()) {
<p>Loading...</p>
} @else { @for (item of items(); track item.id) {
<div [class.selected]="item.selected" [style.color]="item.color">{{ item.name }}</div>
} }
```

### Services

- Use `inject()` function instead of constructor injection
- Provide services with `providedIn: 'root'` for singletons
- Follow single responsibility principle

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly http = inject(HttpClient);

  getData() {
    return this.http.get('/api/data');
  }
}
```

### Error Handling

- Always type errors properly
- Use RxJS operators for observable error handling
- Provide meaningful error messages
- Log errors appropriately (consider structured logging)

### Testing Guidelines

- **Framework**: Vitest with Angular Testing Library integration
- **File naming**: `*.spec.ts`
- **Location**: Co-located with source files
- Use `TestBed.configureTestingModule` with `imports: [ComponentUnderTest]`
- Test component behavior, not implementation details
- Use `beforeEach` for setup
- Write descriptive test names

Example:

```typescript
import { TestBed } from '@angular/core/testing';
import { MyComponent } from './my-component';

describe('MyComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComponent],
    }).compileComponents();
  });

  it('should render title signal', () => {
    const fixture = TestBed.createComponent(MyComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Expected Title');
  });
});
```

## Project-Specific Notes

- Component selector prefix: `app-` (configured in angular.json)
- Bundle size limits: 500kB warning, 1MB error (initial); 4kB warning, 8kB error (component styles)
- Global error listeners are provided via `provideBrowserGlobalErrorListeners()`
