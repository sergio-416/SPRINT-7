import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetails } from './movie-details';
import { ActivatedRoute } from '@angular/router';
import { HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

const mockActivatedRoute = {
  snapshot: {
    params: {
      id: '123',
    },
  },
};

describe('MovieDetails', () => {
  let component: MovieDetails;
  let fixture: ComponentFixture<MovieDetails>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetails],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(MovieDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should read movie ID from route parameters', () => {
    expect(component.movieId()).toBe('123');
  });

  it('should render movie details when data is loaded', () => {
    const mockMovieDetails = {
      id: 123,
      title: 'Test Movie Title',
      overview: 'This is a test movie overview',
      release_date: '2024-01-15',
      genres: [
        { id: 28, name: 'Action' },
        { id: 12, name: 'Adventure' },
      ],
      vote_average: 7.5,
      runtime: 120,
    };
    fixture.detectChanges();
    const req = httpTestingController.expectOne('https://api.themoviedb.org/3/movie/123');
    req.flush(mockMovieDetails);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Test Movie Title');
    expect(compiled.textContent).toContain('This is a test movie overview');
    expect(compiled.textContent).toContain('2024-01-15');
    expect(compiled.textContent).toContain('Action');
    expect(compiled.textContent).toContain('Adventure');
    expect(compiled.textContent).toContain('75');
    expect(compiled.textContent).toContain('120');
  });
});
