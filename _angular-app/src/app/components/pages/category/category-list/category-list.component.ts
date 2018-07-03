import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare let $;

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
    
  categories: Array<{id: number, name: string, active: boolean, created_at: {date: string}}> = [];

  category = {
          name: ''
  };
  
  constructor(private http:HttpClient) { 
//      console.log('construtor');
  }

  ngOnInit() {
      console.log('ngOnInit');
      this.getCategories();
  }
  
  submit(){
      const token = window.localStorage.getItem('token');// Pega o token da API.
      this.http
          .post('http://localhost:8000/api/categories', this.category, {
              headers: {
                  'Authorization' : `Bearer ${token}`
              }
          })
          .subscribe((category) => {
              console.log(category);
              this.getCategories();
              $('#exampleModal').modal('hide');
          });
  }
  
  getCategories(){
      const token = window.localStorage.getItem('token');// Pega o token da API.
      this.http.get<{data: Array<{id: number, name: string, active: boolean, created_at: {date: string}}>}>
      ('http://localhost:8000/api/categories', {
          headers: {
              'Authorization' : `Bearer ${token}`
          }
      }).subscribe(response => {
//          response.data[0].active = false;
          this.categories = response.data
      });
  }

}
