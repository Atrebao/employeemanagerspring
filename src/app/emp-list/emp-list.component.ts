import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CoreService } from '../core/core.service';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.scss']
})
export class EmpListComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'lastname',
    'firstname',
    'dob',
    'genre',
    'email',
    'jobTitle',
    'status',
    'adress',
    'phone',
    'employeeCode',
    'action'
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _dialog: MatDialog, private _empService: EmployeeService,private _coreService: CoreService){}
  ngOnInit(): void {
    this.getEmployeeList();
  }


    openEditForm(data : any){
      const dialogRef = this._dialog.open(EmpAddEditComponent, {
        data,
      });
      dialogRef.afterClosed().subscribe({
        next : (val) =>{
          this.getEmployeeList();
        },

      })
    }

  //affiche la liste des employes
  getEmployeeList(){
    this._empService.getEmployees().subscribe({
      next : (res) =>{
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort =this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error : (err)=>{
        console.log(err);
      },
    })
  }

  deleteEmployee(id : number){
    this._empService.deleteEmployee(id).subscribe({
      next : (res) =>{
        //console.log(res);
        //alert("L'employé a été supprimer");
        this._coreService.openSnackBar("L'employé a été supprimer", "done");
        this.getEmployeeList();
      },
      error : (err)=>{
        console.log(err);
      },
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
