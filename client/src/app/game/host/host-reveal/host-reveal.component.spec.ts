import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostRevealComponent } from './host-reveal.component';

describe('HostRevealComponent', () => {
  let component: HostRevealComponent;
  let fixture: ComponentFixture<HostRevealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostRevealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostRevealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
