import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenonlineComponent } from './ordenonline.component';

describe('OrdenonlineComponent', () => {
  let component: OrdenonlineComponent;
  let fixture: ComponentFixture<OrdenonlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenonlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenonlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
