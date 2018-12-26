import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostWaitingComponent } from './host-waiting.component';

describe('HostWaitingComponent', () => {
  let component: HostWaitingComponent;
  let fixture: ComponentFixture<HostWaitingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostWaitingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
