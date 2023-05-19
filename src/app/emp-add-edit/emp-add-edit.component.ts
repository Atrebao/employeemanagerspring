import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from '../employee.service';


@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent {
  empForm : FormGroup;

  education : string[] =[
    'Diploma',
    'Intermediare',
    'Graduate',
    'Post graduate'
  ]

  constructor(
    private _fb : FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,

    @Inject(MAT_DIALOG_DATA) public data : any,
    private _coreService : CoreService
    ){

    this.empForm = this._fb.group({
    lastname :'',
    firstname : '',
    dob :'',
    genre : '',
    email :'',
    jobTitle :'',
    status : '',
    adress :'',
    phone : '',
    employeeCode:''


    })
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }
  //Permet de recuperer les donnes du formulaire et l'afficher dans db.json

  onFormSubmit(){
    if(this.empForm.valid){
      if(this.data){
        console.log(this.empForm.value);
        this._empService.updateEmployee(this.data.id ,this.empForm.value).subscribe({
          next :(val: any) =>{
            //alert("Mise a jour reussie");
            this._coreService.openSnackBar("Mise a jour reussie");
            this._dialogRef.close(true);

          },
          error:(err : any) =>{
            console.log(err);
          }
        });
      }
      else{
        console.log(this.empForm.value);
        this._empService.addEmployee(this.empForm.value).subscribe({
          next :(val: any) =>{
            //alert("L'employe a été enregistré avec succes");
            this._coreService.openSnackBar("L'employe a été enregistré avec succes");
            this._dialogRef.close(true);

          },
          error:(err : any) =>{
            console.log(err);
          }
        });
      }

    }
  }
}
