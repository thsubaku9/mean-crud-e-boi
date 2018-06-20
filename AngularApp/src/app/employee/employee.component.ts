import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms';
import {Employee} from '../shared/employee.model';

declare var  M:any;

//intialize packages and variables before this point
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.refreshEmployeeList();
    this.resetForm();
   
  }

  resetForm(form?: NgForm)
  {if(form){form.reset();
  this.employeeService.selectedEmployee={
    _id:"",
    name:"",
    position:"",
    contact:null,
    salary:null,
    office:""
  }
  }}

  onSubmit(form: NgForm)
  {if(form.value._id=="")
  {
    if(form.value.contact==null ||form.value.salary==null || form.value.name =="" || form.value.office ==""|| form.value.position ==""  )
    {M.toast({html:"Please ensure that all the values have been entered",classes:"rounded"});}
    else{
    this.employeeService.postEmployee(form.value).subscribe((res)=>{
    this.resetForm(form);
    this.refreshEmployeeList();
    M.toast({html:"Data saved",classes:"rounded"}) });}
  }
  else{
    if(form.value.contact==null ||form.value.salary==null || form.value.name =="" || form.value.office ==""|| form.value.position ==""  )
    {M.toast({html:"Please ensure that all the values have been entered",classes:"rounded"});}
    else
    {
    this.employeeService.postEmployee(form.value).subscribe((res)=>{
      this.resetForm(form);
      this.refreshEmployeeList();
      M.toast({html:"Values have been updated",classes:"rounded"}) });}
  }

}

  refreshEmployeeList()
   {
    this.employeeService.getEmployeeList().subscribe((res)=>{
      this.employeeService.employees=res as Employee[];
    });
  }

  onEdit(emp :Employee)
  {
    this.employeeService.selectedEmployee=emp;
  }

  onDelete(_id:string, form:NgForm)
  {    
    this.employeeService.deleteEmployee(_id).subscribe((res)=>
    {
      this.refreshEmployeeList();
      this.resetForm(form);
      M.toast({html:'Deleted successfully',classes:"rounded"});
    });
  
  }
}
