import { TestBed } from '@angular/core/testing';

import { CompletedTasksService } from './completed-tasks.service';

describe('CompletedTasksService', () => {
  let service: CompletedTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompletedTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
