import { Component, ViewChild } from '@angular/core';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from './employee.service';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myemployeemanagerspring';

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
  constructor(
    private _dialog: MatDialog,
    private _empService : EmployeeService,
    private _coreService : CoreService
    ){}


  ngOnInit(): void {
    this.getEmployeeList();
  }


  //Permet d'afficher le contenu de emp-add-edit.component.html lorsqu'on clique sur le botton ADD Employer
  openAddEdditEmpForm(){
    const dialogRef = this._dialog.open(EmpAddEditComponent);

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
        //console.log(res);
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



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
