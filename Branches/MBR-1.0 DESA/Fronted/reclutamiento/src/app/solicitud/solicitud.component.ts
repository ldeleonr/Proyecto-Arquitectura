import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicioService } from '../servicio.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  formSolicitud: FormGroup;
  processDefinitionId = null;
  taskId: number;
  statusFile = false;
  fileId = null;
  areas = ['Informatica', 'Rercursos Humanos', 'Contabilidad'];

  constructor(private servicio: ServicioService) {

    this.formSolicitud = new FormGroup({
      nombre1: new FormControl('', Validators.required),
      nombre2: new FormControl(),
      apellido1: new FormControl('', Validators.required),
      apellido2: new FormControl(),
      telefono: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      dpi: new FormControl(),
      curriculumvitae: new FormControl('', Validators.required),
      message: new FormControl(),
      // area: new FormControl('', Validators.required)
    });

   }

  ngOnInit() {
    this.iniciar();
  }

  enviar(): void {
    let params = { values : this.formSolicitud.value };
    params.values.curriculumvitae = `${this.fileId}`;
    console.log(params);
    this.servicio.sendInfo(this.taskId, params)
      .subscribe(res => {
        console.log(res);
        this.formSolicitud.reset();
        this.iniciar();
      }, err => console.log(err));
    console.log(this.formSolicitud.value);
  }

  handleFileInput(files: FileList) {
    this.statusFile = true;
    console.log(files);
    this.servicio.uploadFile(files, `${this.servicio.api}/upload`)
      .subscribe(res => {
        if (res !== null) {
          this.fileId = res.id;
          this.statusFile = false;
          console.log(res);
        }
      }, err => console.log(err));
  }

  iniciar() {
    this.servicio.startApp().subscribe(res => {
      this.processDefinitionId = res.data[0].id;
      const obj = {
        appDefinitionId: this.servicio.appId,
        page: 0,
        size: 25
      };
      const params = {
        name: 'Procesar solicitud',
        processDefinitionId: res.data[0].id
      };
      this.servicio.sendProcess(params).subscribe(resP => {
        if (resP !== null) {
          this.servicio.getTask(obj).subscribe(result => {
            this.taskId = result.data[0].id as number;
            console.log(this.taskId);
          });
        }
      });
    });
  }

}
