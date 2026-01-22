import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MovieCard } from './movie-card';
import { TmdbMovie } from '../../interfaces/movie';

describe('MovieCard', () => {
  let component: MovieCard;
  let fixture: ComponentFixture<MovieCard>;

  const mockMovie: TmdbMovie = {
    id: 123,
    title: 'Test Movie',
    poster_path: '/test-poster.jpg',
    release_date: '2024-01-15',
    vote_average: 7.5,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCard);
    component = fixture.componentInstance;
  });

  it('should display movie title', () => {
    fixture.componentRef.setInput('movie', mockMovie);
    fixture.detectChanges();

    const titleElement = fixture.nativeElement.querySelector('h3');
    expect(titleElement.textContent).toContain('Test Movie');
  });

  it('should display movie release date', () => {
    fixture.componentRef.setInput('movie', mockMovie);
    fixture.detectChanges();

    const dateElement = fixture.nativeElement.querySelector('p');
    expect(dateElement.textContent).toContain('2024-01-15');
  });

  it('should display movie poster image with tmdb-image pipe', () => {
    fixture.componentRef.setInput('movie', mockMovie);
    fixture.detectChanges();

    const imgElement = fixture.nativeElement.querySelector('img');
    expect(imgElement).toBeTruthy();
    expect(imgElement.src).toContain('image.tmdb.org');
    expect(imgElement.src).toContain('/test-poster.jpg');
    expect(imgElement.alt).toContain('Test Movie');
  });

  it('should display vote average as percentage badge', () => {
    fixture.componentRef.setInput('movie', mockMovie);
    fixture.detectChanges();

    const badgeElement = fixture.nativeElement.querySelector('.rounded-full');
    expect(badgeElement).toBeTruthy();
    expect(badgeElement.textContent).toContain('75%');
  });

  it('should have routerLink pointing to movie details', () => {
    fixture.componentRef.setInput('movie', mockMovie);
    fixture.detectChanges();

    const linkElement = fixture.nativeElement.querySelector('a');
    expect(linkElement).toBeTruthy();
    expect(linkElement.getAttribute('href')).toBe('/movie/123');
  });
});
