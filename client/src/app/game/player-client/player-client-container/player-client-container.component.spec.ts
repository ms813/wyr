import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerClientContainerComponent } from './player-client-container.component';

describe('PlayerClientContainerComponent', () => {
  let component: PlayerClientContainerComponent;
  let fixture: ComponentFixture<PlayerClientContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerClientContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerClientContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
