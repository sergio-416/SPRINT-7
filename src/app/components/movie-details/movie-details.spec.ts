import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetails } from './movie-details';
import { ActivatedRoute } from '@angular/router';

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetails],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read movie ID from route parameters', () => {
    expect(component.movieId()).toBe('123');
  });

it('it should have movieDetails signal', () => {
  expect(component.movieDetails).toBeDefined();
});

});
