import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {


  formInicioSesion: FormGroup;

  constructor() {

    this.formInicioSesion = new FormGroup({
      correo: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.formInicioSesion);
  }

}
