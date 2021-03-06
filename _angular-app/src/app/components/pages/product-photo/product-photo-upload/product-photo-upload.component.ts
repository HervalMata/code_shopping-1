import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductPhotoHttpService } from '../../../../services/http/product-photo-http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    
  selector: 'product-photo-upload',
  templateUrl: './product-photo-upload.component.html',
  styleUrls: ['./product-photo-upload.component.css']
})
export class ProductPhotoUploadComponent implements OnInit {

  errors = {};
  
  //Events
  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();
  productId: number;
  
  constructor(public productPhotoHttp: ProductPhotoHttpService, private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.params.subscribe(params => {
         this.productId = params.product;
      });
      
  }
  
  uploadPhotos(files: FileList){
      if(!files.length){
          return;
      }
      
      this.productPhotoHttp
          .create(this.productId, files)
          .subscribe(
              (data) => this.onSuccess.emit(data),
              (responseError) => {
                  if(responseError.status === 422){
                      this.errors = responseError.error.errors;
                  }
                  this.onError.emit(responseError);
              }
          );
  }

  showErrors(){
      return Object.keys(this.errors).length != 0;
  }
}
