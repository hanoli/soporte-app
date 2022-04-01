import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders,HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';

import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Folio } from '../interface/Folio';
import { TipoEquipo } from '../interface/TipoEquipo';
import { FolioModel } from '../interface/FolioModel';
import { FileModel } from '../interface/FileModel';
import { FolioAprobadosModel } from '../interface/FoliosAprobadosModel';


@Injectable({
  providedIn: 'root'
})
export class FolioService {

private httpHeaders = new HttpHeaders({
'Content-Type': 'application/json',
'Accept': 'application/json',
'Access-Control-Allow-Origin': 'http://localhost:8080/'
})

  constructor(private http: HttpClient) {
  }

  getFolios(): Observable<Folio[]> {
    return this.http.get('api/listaFolios').pipe(
      map(response => response as Folio[])
    );
  }


  getFoliosAprobados(): Observable<FolioAprobadosModel[]> {
    return this.http.get('api/listaFoliosAprobados').pipe(
      map(response => response as FolioAprobadosModel[])
    );
  }
  

  creaFolio(folio:Folio):Observable<Folio>{
  console.log("JsonFolio: " + folio)
    return this.http.post<Folio>('api/guardarFolio',folio,{headers:this.httpHeaders})
  }

  exportPdf(elementPDF:FolioModel):Observable<Blob>{
    console.log("elementPDF: " + elementPDF.folio)
    return this.http.post('api/exportPdf',elementPDF,{responseType:'blob'});
  }

  //Metodo que envia los archivos al endpoint /upload 
  upload(file: FileModel): Observable<any>{
    //console.log("JsonFile: " + file.base64)
    return this.http.post<FolioModel>('api/upload',file,{headers:this.httpHeaders})
  }

  //Metodo para Obtener los archivos
  getFiles(){
    return this.http.get('api/files');
  }

  //Metodo para borrar los archivos
  deleteFile(filename: string){
    return this.http.get('api/delete/${filename}');
  }

  getFolioByMarca(marca:String): Observable<Folio[]> {
    return this.http.get<Folio[]>('api/getFolioByMarca/'+marca,{headers:this.httpHeaders}).pipe(
      map(response => response as Folio[])
    );
  }


 
  getEndFolio(): Observable<number> {
    return this.http.get('api/getEndFolio').pipe(
      map(response => response as number)
    );
  }


  getByFiltros(filtros:FolioModel): Observable<Folio[]> {
    return this.http.post<Folio[]>('api/folios/getFiltros',filtros,{headers:this.httpHeaders})
  }


  sendFolio(array:FolioAprobadosModel[]):Observable<any>{ 
    console.log("JsonFolio: " + array[0])
    
      return this.http.post<Folio>('api/foliosSelect',array,{headers:this.httpHeaders})
    }


}