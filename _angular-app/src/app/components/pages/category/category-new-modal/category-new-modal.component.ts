import { Component, EventEmitter, OnInit, ViewChild, Output } from '@angular/core';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryHttpService } from '../../../../services/http/category-http.service';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';

@Component({
  selector: 'category-new-modal',
  templateUrl: './category-new-modal.component.html',
  styleUrls: ['./category-new-modal.component.css']
})

export class CategoryNewModalComponent implements OnInit {

  form: FormGroup;
  
  @ViewChild(ModalComponent) modal: ModalComponent;  
  
  //Events
  @Output() onSucess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();
    
  
  
  constructor(public categoryHttp: CategoryHttpService , private formBuilder: FormBuilder ) { 
      this.form = this.formBuilder.group({
          name: ['', [Validators.required, Validators.maxLength(255)]],
          active: true
      });
  }

  ngOnInit() {
  }
  
  submit(){
      this.categoryHttp.create(this.form.value)
          .subscribe((category) => {
              this.form.reset({
                  name: '',
                  active: true
              });
              this.onSucess.emit(category);
              this.modal.hide();
              //this.getCategories();
          }, error => this.onError.emit(error));
  }

  showModal(){
      this.modal.show();
  }
  
  hideModal($event: Event){
      //Fazer algo quando o modal for fechado
      console.log($event);
  }
  
}
