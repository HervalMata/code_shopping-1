import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from '../../../bootstrap/modal/modal.component';
import { UserNewModalComponent } from '../user-new-modal/user-new-modal.component';
import { UserEditModalComponent } from '../user-edit-modal/user-edit-modal.component';
import { UserDeleteModalComponent } from '../user-delete-modal/user-delete-modal.component';
import { UserHttpService } from '../../../../services/http/user-http.service';
import { User } from '../../../../model';
import { NotifyMessageService } from '../../../../services/notify-message.service';
import { UserInsertService } from './user-insert.service';
import { UserEditService } from './user-edit.service';
import { UserDeleteService } from './user-delete.service';

declare let $;

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    users: Array<User> = [];

    pagination = {
        page: 1,
        totalItems: 0,
        itemsPerPage: 15
    }
    
    sortColumn = {column: 'id', sort: 'asc'};
    
    @ViewChild(UserNewModalComponent)
    userNewModal: UserNewModalComponent;
    
    @ViewChild(UserEditModalComponent)
    userEditModal: UserEditModalComponent;
    
    @ViewChild(UserDeleteModalComponent)
    userDeleteModal: UserDeleteModalComponent;
    
    userId: number;
    
    constructor(private userHttp: UserHttpService, 
                private notifyMessage: NotifyMessageService,
                protected userInsertService: UserInsertService,
                protected userEditService: UserEditService,
                protected userDeleteService: UserDeleteService 
                ) { 
        this.userInsertService.userListComponent = this;
        this.userEditService.userListComponent = this;
        this.userDeleteService.userListComponent = this;
    }
    
    searchText: string;
    
    ngOnInit() {
        console.log('ngOnInit');
        this.getUsers();
    }
    
    getUsers(){
        this.userHttp.list({
                page: this.pagination.page,
                sort: this.sortColumn.column === '' ? null : this.sortColumn,
                search: this.searchText
            })
            .subscribe(response => {
                console.log(response);
                //response.data[0].active = false;
                this.users = response.data;
                this.pagination.totalItems = response.meta.total;
                this.pagination.itemsPerPage = response.meta.per_page;
            })
    }
    
    pageChanged(page){
        this.pagination.page = page;
        this.getUsers();
    }
    
    sort(sortColumn){
        this.getUsers();
    }
    
    search(search){
        console.log(search);
        this.searchText = search;
        this.getUsers();
    }

}
