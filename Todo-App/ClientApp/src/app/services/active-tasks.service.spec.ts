import { TestBed } from '@angular/core/testing';

import { ActiveTasksService } from './active-tasks.service';

describe('ActiveTasksService', () => {
  let service: ActiveTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
