import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../../../model';

@Component({
  selector: 'category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  @Input()
  category: Category = {
          name: '',
          active: true
  };

  constructor() { }

  ngOnInit() {
  }

}
