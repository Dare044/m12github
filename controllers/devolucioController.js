const PDFDocument = require('pdfkit');

class DevolucioController {

  static create_get(req, res, next) {
    res.render('devolucions/devolucioForm');
  }

  static create_post(req, res) {
    const { proveidor, rao, producte } = req.body;

    const doc = new PDFDocument();
  
    doc.fontSize(20).text('Devolució de producte', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Proveidor: ${proveidor}`);
    doc.moveDown();
    doc.fontSize(14).text(`Rao per retornar: ${rao}`);
    doc.moveDown();
    doc.fontSize(14).text(`Producte amb problema: ${producte}`);
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
