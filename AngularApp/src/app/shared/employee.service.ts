import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
//for v 6 and above
import { map, filter, switchMap } from 'rxjs/operators';
//for v 5 and below
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/toPromise';

import {Employee} from './employee.model';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee:Employee;
  employees:Employee[];
  readonly URL="http://localhost:3000/employees";

  constructor(private http :HttpClient) { }

  postEmployee(emp :Employee)
  {
    return this.http.post(this.URL,emp);
  }

  getEmployeeList()
  {
    return this.http.get(this.URL);
  }

  putEmployee(emp :Employee)
  {
    return this.http.put(this.URL+`/${emp._id}`,emp);
  }

  deleteEmployee(_id: string)
  {return this.http.delete(this.URL+`/${_id}`);
  }
}
