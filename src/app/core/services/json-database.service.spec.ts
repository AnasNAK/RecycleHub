import { TestBed } from '@angular/core/testing';

import { JsonDatabaseService } from './json-database.service';

describe('JsonDatabaseService', () => {
  let service: JsonDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
