// Aquesta línia importa el model de MongoDB per al llistat de proveïdors.
var LlistatProveidor = require("../models/llistatProveidor");

// Aquesta línia importa el model de MongoDB per als elements del llistat.
var Element = require("../models/element");

// Aquesta línia importa el mòdul PDFKit per generar un document PDF.
const PDFDocument = require('pdfkit');

class DevolucioController {

  // Aquesta funció controladora és responsable de mostrar el formulari per a crear una nova devolució.
  static async create_get(req, res, next) {
    try {
      var list_proveidor = await LlistatProveidor.find();
      var list_element = await Element.find();
      res.render('devolucions/devolucioForm',{list_proveidor:list_proveidor, list_element:list_element});
    } catch(e) {
      res.send('Error!');
    } 
  }

  // Aquesta funció controladora és responsable de crear un nou formulari de devolució i generar un document PDF.
  static create_post(req, res) {
    const { proveidor, rao, element } = req.body;

    // S'inicialitza un nou document PDF.
    const doc = new PDFDocument();
  
    // Es defineix el títol del document i es posa el contingut del formulari en el PDF.
    doc.fontSize(20).text('Devolució de producte', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Proveidor: ${proveidor}`);
    doc.moveDown();
    doc.fontSize(14).text(`Rao per retornar: ${rao}`);
    doc.moveDown();
    doc.fontSize(14).text(`Producte amb problema: ${element}`);
    doc.moveDown();
    doc.fontSize(14).text(`Retira la mercaderia objecte de devolució, i signa el present formulari, posant de manifest haver-la rebut correctament.`)
    doc.moveDown();
    doc.fontSize(14).text(`Signa proveïdor:`)

    // Es defineix el nom del fitxer PDF i el seu tipus MIME.
    res.setHeader('Content-Disposition', 'attachment; filename=devolucio.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    
    // Es vincula el document PDF amb la resposta HTTP i s'envia a l'usuari.
    doc.pipe(res);
    doc.end();
  }
  
}

module.exports = DevolucioController;