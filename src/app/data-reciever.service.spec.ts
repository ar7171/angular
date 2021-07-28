import { TestBed } from '@angular/core/testing';
import { DataRecieverService } from './data-reciever.service';

describe('DataRecieverService', () => {
  let service: DataRecieverService;

  beforeEach(() => {
    TestBed.configureTestingModule({ });
    service = TestBed.inject(DataRecieverService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get json', () => {
    expect(service.getJsons("numfber")).toBeTruthy();
  });

});