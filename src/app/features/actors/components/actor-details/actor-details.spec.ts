import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ActorDetails } from './actor-details';

const mockActivatedRoute = {
  snapshot: {
    params: {
      id: '123',
    },
  },
};
describe('ActorDetails', () => {
  let fixture: ComponentFixture<ActorDetails>;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActorDetails],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ActorDetails);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should display actor name and biography', () => {
    const mockActor = {
      id: 123,
      name: 'Test Actor',
      biography: 'A talented actor',
      profile_path: '/test.jpg',
      birthday: '1990-01-01',
      place_of_birth: 'Los Angeles',
      popularity: 50,
      known_for_department: 'Acting',
    };
    fixture.detectChanges();
    const req = httpTestingController.expectOne('https://api.themoviedb.org/3/person/123');
    req.flush(mockActor);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Test Actor');
    expect(compiled.textContent).toContain('A talented actor');
  });
  
  it('should display filmography using MovieCard components', () => {
    const mockActor = {
      id: 123,
      name: 'Test Actor',
      biography: 'Bio',
      profile_path: null,
      birthday: null,
      place_of_birth: null,
      popularity: 50,
      known_for_department: 'Acting',
    };
    const mockCredits = {
      id: 123,
      cast: [
        { id: 1, title: 'Movie 1', poster_path: '/p1.jpg', release_date: '2023-01-01', vote_average: 7.5 },
        { id: 2, title: 'Movie 2', poster_path: '/p2.jpg', release_date: '2023-02-01', vote_average: 8.0 },
      ],
    };
    fixture.detectChanges();
    const actorReq = httpTestingController.expectOne('https://api.themoviedb.org/3/person/123');
    actorReq.flush(mockActor);
    const creditsReq = httpTestingController.expectOne('https://api.themoviedb.org/3/person/123/movie_credits');
    creditsReq.flush(mockCredits);
    fixture.detectChanges();
    const movieCards = fixture.nativeElement.querySelectorAll('app-movie-card');
    expect(movieCards.length).toBe(2);
  });
});
