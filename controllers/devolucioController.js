var LlistatProveidor = require("../models/llistatProveidor");
var Element = require("../models/element");

const PDFDocument = require('pdfkit');

class DevolucioController {

  static async create_get(req, res, next) {
    try {
      var list_proveidor = await LlistatProveidor.find();
      var list_element = await Element.find();
      res.render('devolucions/devolucioForm',{list_proveidor:list_proveidor, list_element:list_element});
    } catch(e) {
      res.send('Error!');
    } 
  }

  static create_post(req, res) {
    const { proveidor, rao, element } = req.body;

    const doc = new PDFDocument();
  
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

  
    res.setHeader('Content-Disposition', 'attachment; filename=devolucio.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    
    doc.pipe(res);
    doc.end();
  }
  
}

module.exports = DevolucioController;
