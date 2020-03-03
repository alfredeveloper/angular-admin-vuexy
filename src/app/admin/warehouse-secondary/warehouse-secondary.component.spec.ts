import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseSecondaryComponent } from './warehouse-secondary.component';

describe('WarehouseSecondaryComponent', () => {
  let component: WarehouseSecondaryComponent;
  let fixture: ComponentFixture<WarehouseSecondaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseSecondaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
