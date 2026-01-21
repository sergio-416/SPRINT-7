import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Actors } from './actors';
describe('Actors', () => {
  let service: Actors;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(Actors);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  it('should fetch actor details from TMDB API', () => {
    const mockActor = {
      id: 123,
      name: 'Test Actor',
      biography: 'Test Bio',
      profile_path: '/test.jpg',
      birthday: '1990-01-01',
      place_of_birth: 'Los Angeles',
      popularity: 50,
      known_for_department: 'Acting',
    };
    service.getActor(123).subscribe((actor) => {
      expect(actor).toEqual(mockActor);
    });
    const req = httpTestingController.expectOne('https://api.themoviedb.org/3/person/123');
    expect(req.request.method).toBe('GET');
    req.flush(mockActor);
  });
  it('should fetch actor movie credits from TMDB API', () => {
    const mockCredits = {
      id: 123,
      cast: [
        {
          id: 1,
          title: 'Test Movie',
          poster_path: '/poster.jpg',
          release_date: '2023-01-01',
          vote_average: 7.5,
        },
      ],
    };
    service.getActorCredits(123).subscribe((credits) => {
      expect(credits).toEqual(mockCredits);
    });
    const req = httpTestingController.expectOne('https://api.themoviedb.org/3/person/123/movie_credits');
    expect(req.request.method).toBe('GET');
    req.flush(mockCredits);
  });
});
