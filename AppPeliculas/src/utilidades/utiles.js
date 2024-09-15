export const transformarFecha = (fechaAnglosajona) => {
    // Dividir la fecha en partes (mes, día, año)
    const partes = fechaAnglosajona.split('-');
    const mes = partes[1];
    const dia = partes[2];
    const año = partes[0];

    // Reorganizar las partes en el orden español (día, mes, año)
    const fechaEspanola = `${dia}-${mes}-${año}`;

    // Devolver la fecha en formato español
    return fechaEspanola;
}