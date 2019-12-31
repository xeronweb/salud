import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { Profesional } from 'src/app/models/profesional';
import * as $ from 'jquery';
import { ProfesionalService } from 'src/app/services/profesional.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TipoProfesional } from 'src/app/models/tipo-profesional';

@Component({
  selector: 'app-crear-editar-profesional',
  templateUrl: './crear-editar-profesional.component.html',
  styleUrls: ['./crear-editar-profesional.component.scss'],
  providers: [
    ProfesionalService,
    UsuarioService
  ]
})
export class CrearEditarProfesionalComponent implements OnInit {
  //atributos
  public profesional: Profesional;
  public tipos: Array<TipoProfesional>;
  public errores: Array<String>;
  public success: String;

  constructor(
    public _profesionalService: ProfesionalService,
    public _usuarioService: UsuarioService

  ) { 
  }

  ngOnInit() {
    this.profesional = new Profesional(0,0,null,"","",null,"",null,"","",null,null);
    this.getTipos();
  }


  getTipos(){
    //verifico si hay una en cache
    const tipos = localStorage.getItem('tipos_profesionales'); 
    if (tipos !== null)
      this.tipos = JSON.parse(tipos);

    //busco una actualizacion en la base de datos
    this._profesionalService.getTipos().subscribe(
      response => {
          if (response.status === 'success') {
            //guardamos resultado
            this.tipos = response.tipos_profesionales;

            //guardamos resultado en cache
            localStorage.setItem('tipos_profesionales',JSON.stringify(this.tipos));
          } else {
            this.errores = response.errores;  
          }
      },
      error => {
        this.errores = [error.message,"Error al cargar los tipos, recargue la pantalla y verifique su conexión a internet"];
      }
    );
  }

  /**
   * Sube el formulario usando la api
   * @param profesionalForm Formulario
   */
  onSubmitProfesional(profesionalForm: Form){

    // recupero el token
    const token:string = this._usuarioService.getToken();

    this._profesionalService.insert(this.profesional, token).subscribe(
      response => {
          if (response.status === 'success') {
            this.success = response.message;
          } else {
            this.errores = response.errores;  
          }
      },
      error => {
        this.errores = [error.message, "Error al subir el profesional, recargue la pantalla y verifique su conexión a internet"];
      }
    );
  }

  /**
   * Agregar la imagen al objeto profesional
   * @param e evento en el cual cambia la imagen
   */
	imagenChanged(e) {
    this.profesional.imagen_file = e.target.files[0] !== undefined ? e.target.files[0] : undefined;
    if(this.profesional.imagen_file !== undefined)
      $('.imagen-lavel').text(this.profesional.imagen_file.name);
    else
      $('.imagen-lavel').text("Elegir archivo");

  }
  /**
   * Agregar el cv al objeto profesional
   * @param e evento en el cual cambia la imagen
   */
	cvChanged(e) {
		this.profesional.cv_file = e.target.files[0] !== undefined ? e.target.files[0] : undefined;
    if(this.profesional.cv_file !== undefined)
      $('.cv-lavel').text(this.profesional.cv_file.name);
    else
      $('.cv-lavel').text("Elegir archivo");
	}

}
