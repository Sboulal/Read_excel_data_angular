import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInscriptComponent } from './list-inscript.component';

describe('ListInscriptComponent', () => {
  let component: ListInscriptComponent;
  let fixture: ComponentFixture<ListInscriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInscriptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListInscriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
