import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RyordenComponent } from './ryorden.component';

describe('RyordenComponent', () => {
  let component: RyordenComponent;
  let fixture: ComponentFixture<RyordenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RyordenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RyordenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
