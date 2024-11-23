import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LvAuthorirySetupComponent } from './lv-authoriry-setup.component';

describe('LvAuthorirySetupComponent', () => {
  let component: LvAuthorirySetupComponent;
  let fixture: ComponentFixture<LvAuthorirySetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LvAuthorirySetupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LvAuthorirySetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
