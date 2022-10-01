export class Transaccion {
  id: number;
  id_apostador: number;
  tipo_transaccion: string;
  valor_transacion: number;
  fecha_transaccion: Date;

  constructor(
    id: number,
    id_apostador: number,
    tipo_transaccion: string,
    valor_transacion: number,
    fecha_transaccion: Date
  ) {
    this.id = id;
    this.id_apostador = id_apostador;
    this.tipo_transaccion = tipo_transaccion;
    this.valor_transacion = valor_transacion;
    this.fecha_transaccion = fecha_transaccion;
  }
}
