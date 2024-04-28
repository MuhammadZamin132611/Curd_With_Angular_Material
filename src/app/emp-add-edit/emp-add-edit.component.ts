import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {

  empForm: FormGroup
  constructor(private _fb: FormBuilder,
    private _employeeService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _core:CoreService
  ) {
    this.empForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      education: ['', Validators.required],
      company: ['', Validators.required],
      experience: ['', Validators.required],
      package: ['', Validators.required],

    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ]

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        console.log(this.empForm.value)
        this._employeeService.updateEmployee(this.data.id,this.empForm.value).subscribe({
          next: (val: any) => {
            this._core.openSnackBar('Employee Detail Updated', 'Updated')
            this._dialogRef.close(true);
          },
          // err:(err:any)=>{
          //   console.log(err)
          // }
        })

      } else {
        console.log(this.empForm.value)
        this._employeeService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._core.openSnackBar('Employee add successfully', 'Added')
            this._dialogRef.close(true);
          },
          // err:(err:any)=>{
          //   console.log(err)
          // }
        })
      }

    }
  }
}
