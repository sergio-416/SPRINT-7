import { TestBed } from '@angular/core/testing';

import { Supabase } from './supabase';

describe('Supabase', () => {
  let service: Supabase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Supabase);
  });

  it('should return a SupabaseClient instance', () => {
    const client = service.getClient();
    expect(client).toBeDefined();
    expect(client.auth).toBeDefined();
  });

});
