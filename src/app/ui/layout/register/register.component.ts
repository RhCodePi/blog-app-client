import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/common/models/user.service';
import {
  AbstractControl,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { User } from '../../../entities/user';
import { CreateUser } from '../../../contracts/users/create-user';
import { CommonModule, NgClass } from '@angular/common';
import {
  CustomToastrService,
  ToastrMessagePositon,
  ToastrMessageType,
} from '../../../services/common/custom-toastr.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, NgClass, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  constructor(
    private userService: UserService,
    private formBuilder: UntypedFormBuilder,
    private toastr: CustomToastrService
  ) {}

  frm: UntypedFormGroup;
  ngOnInit(): void {
    this.frm = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
        ],
        email: [
          '',
          [Validators.required, Validators.email, Validators.maxLength(250)],
        ],
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required],
      },
      {
        validators: (group: AbstractControl): ValidationErrors | null => {
          let password = group.get('password').value;
          let passwordConfirm = group.get('passwordConfirm').value;

          return password === passwordConfirm ? null : { notsame: true };
        },
      }
    );
  }

  get component() {
    return this.frm.controls;
  }

  submitted: boolean = false;
  async onSubmit(user: User) {
    this.submitted = true;

    if (this.frm.invalid) return;

    const result: CreateUser = await this.userService.create(user);

    if(result === undefined) return

    if (result.succeeded) {
      this.toastr.alert(result.message, 'Success', ToastrMessageType.SUCCESS, {
        progressBar: true,
      });
    } else {
      this.toastr.alert(result.message, 'Error', ToastrMessageType.ERROR, {
        position: ToastrMessagePositon.BOTTOM_RIGHT,
      });
    }
  }
}
