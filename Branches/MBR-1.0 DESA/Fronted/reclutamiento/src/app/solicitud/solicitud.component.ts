import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  formSolicitud: FormGroup;
  constructor() {

    this.formSolicitud = new FormGroup({
      nombre1: new FormControl('', Validators.required),
      nombre2: new FormControl(),
      apellido1: new FormControl('', Validators.required),
      apellido2: new FormControl(),
      telefono: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      dpi: new FormControl(),
      cv: new FormControl('', Validators.required),
      message: new FormControl()
    });

   }

  ngOnInit() {
  }

  enviar(): void {
    console.log(this.formSolicitud.value);
  }

}
