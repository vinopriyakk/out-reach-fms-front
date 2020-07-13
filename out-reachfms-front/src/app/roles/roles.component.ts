import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../service/data/user.service';
import { User } from '../interface-module/user';
import * as fileSaver from 'file-saver';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  email: string;
  role: any;
  userService: any;
  page: any;
  users: any;
  excelFileName = 'User_details';

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }
  onAddPMO(form: NgForm){
    const value = form.value;
    const inEmail = value.email;
    const pwd = value.pwd;
    console.log('inEmail---' + inEmail);
    console.log('pwd---' + pwd);

  }

  addUser(){
    const user: User = {
      email: this.email,
      role: this.role,
    };

    this.service.addUser(user).subscribe(
      (data: any) => {
        if (data.status === 'SUCCESS'){
          this.email = '';
        }
        alert(data.message);
      },
      error => {
        console.log(error.error.message);
      }
    );
}
  getUsers(){
    this.service.getUser().subscribe(
      (data: any) => {
        this.users = data;
      },
      error => {
        console.log(error.error.message);
      }
    );
  }
  deleteUsers(){
    this.service.deleteUser(this.email).subscribe(
      (data: any) => {
        this.users = data;
      },
      error => {
        console.log(error.error.message);
      }
    );
  }


  downloadFileExcel() {
    this.service.downloadFileExcel(this.excelFileName)
      .subscribe(response => {
        const filename = response.headers.get('filename');

        this.saveFile(response.body, filename);
      });
  }

  saveFile(data: any, filename?: string) {
    const blob = new Blob([data], { type: 'application/ms-excel; charset=utf-8' });
    fileSaver.saveAs(blob, filename);
  }



}
