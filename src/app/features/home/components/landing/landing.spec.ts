import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Landing } from './landing';
import { provideRouter } from '@angular/router';

describe('Landing', () => {
  let component: Landing;
  let fixture: ComponentFixture<Landing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Landing],
      providers: [provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Landing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display welcome message', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('MDB7');
  });

  it('should have Browse Movies button', () => {
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('a');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('Browse Movies');
  });

  it('should route to /movies when Browse Movies button is clicked', () => {
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector('a');
    expect(link.getAttribute('href')).toBe('/movies');
  });
});
