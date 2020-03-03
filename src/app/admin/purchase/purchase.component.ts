import { Component, OnInit } from '@angular/core';
import { PurchaseOrder, Purchase, DeliveryNote, DeliveryDetail, RemisionGuide, GuideDetail, Invoice, InvoiceDetail } from 'src/app/models/purchase';
import { wizardPurchase } from '../../../assets/util/js/wizard';
import { datatableDeliveryNote, addTableDeliveryNote, datatableGuiaRemision, addTableGuiaRemision, datatableFactura, addTableFactura } from '../../../assets/util/js/datatable';
import { PurchaseService } from '../../services/purchase.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { CategoryService } from 'src/app/services/category.service';
import { sweetAlert } from '../../../assets/util/js/alert';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  purchaseOrder: PurchaseOrder;
  purchase: Purchase;
  
  deliveryNote: DeliveryNote;
  deliveryDetail: DeliveryDetail;
  deliveryDetailArr: Array<DeliveryDetail> = [];

  remisionGuide: RemisionGuide;
  guideDetail: GuideDetail;
  guideDetailArr: Array<GuideDetail> = [];

  invoice: Invoice;
  invoiceDetail: InvoiceDetail;
  invoiceDetailArr: Array<InvoiceDetail> = [];

  suppliers = [];
  firstView = true;
  secondView = false;
  thirdView = false;

  ruc: string = '';
  address: string = '';
  supplier: string = '';

  categories = [];

  constructor(
    private purchaseService: PurchaseService,
    private supplierService: SupplierService,
    private categoryService: CategoryService
  ) { 

    this.purchase = new Purchase('','','', '', '', '');

    this.deliveryDetail = new DeliveryDetail('', '', '', '', '', '', '', '', '', '', '');
    this.deliveryNote = new DeliveryNote('', '', '', this.deliveryDetailArr);
    
    this.guideDetail = new GuideDetail('', '', '', '');
    this.remisionGuide = new RemisionGuide('', '', '', '', '', '', '', '', '', '', this.guideDetailArr);

    this.invoiceDetail = new InvoiceDetail('', '','', '');
    this.invoice = new Invoice('', '', '', '', '', '0', '0', '', '', '', '', '', '0', this.invoiceDetailArr);

    this.purchaseOrder = new PurchaseOrder(this.purchase, this.deliveryNote, this.invoice);
    
  }

  ngOnInit() {
    wizardPurchase();
    datatableDeliveryNote();
    datatableFactura();
    this.obtenerProveedores();
    this.obtenerCategorias();
  }

  agregarDetalleDelivery() {
    addTableDeliveryNote(this.deliveryDetail);
    console.log('Delivery detail', this.deliveryDetail)
    console.log('Delivery detail', typeof this.deliveryDetail)
    this.deliveryDetailArr.push(this.deliveryDetail)
    this.deliveryDetail = new DeliveryDetail('', '', '', '', '', '', '', '', '', '', '');
  }

  agregarDetalleGuiaRemision() {
    addTableGuiaRemision(this.guideDetail);
    this.guideDetailArr.push(this.guideDetail)
    console.log('Guia detail', this.guideDetail)
    this.guideDetail = new GuideDetail('', '', '', '');
  }

  agregarDetalleFactura() {
    addTableFactura(this.invoiceDetail);
    this.invoiceDetailArr.push(this.invoiceDetail);

    console.log('suma', parseInt(this.invoice.subtotal));
    console.log('suma', parseInt(this.invoice.subtotal) + this.invoiceDetail.subtotal);
    this.invoice.subtotal = (parseInt(this.invoice.subtotal) + this.invoiceDetail.subtotal).toString();
    this.invoice.igv = (parseInt(this.invoice.subtotal) * 0.18).toString();
    this.invoice.total = ((parseFloat(this.invoice.subtotal) + parseFloat(this.invoice.igv)) - parseFloat(this.invoice.discount)).toString()
    this.invoice.payment = ((parseFloat(this.invoice.subtotal) + parseFloat(this.invoice.igv)) - parseFloat(this.invoice.discount)).toString()
    this.invoice.rounding = (Math.round(parseFloat(this.invoice.payment))).toString();
    this.invoice.total_pay = this.invoice.rounding;    console.log('discount', this.invoice.discount);
    console.log('discount', parseFloat(this.invoice.discount));
    console.log('invoice total', this.invoice.total)
    console.log('Factura detail', this.invoiceDetail)
    this.invoiceDetail = new InvoiceDetail('', '', '', '');
  }

  changeDiscount() {
    console.log('value',this.invoice.discount)
    if(this.invoice.discount == '' || this.invoice.discount == null || this.invoice.discount == undefined) {
      this.invoice.total = ((parseFloat(this.invoice.subtotal) + parseFloat(this.invoice.igv)) - parseFloat('0')).toString()

    }else {
      this.invoice.total = ((parseFloat(this.invoice.subtotal) + parseFloat(this.invoice.igv)) - parseFloat(this.invoice.discount)).toString()
    }
  }

  changePayment() {
    if(this.invoice.payment != '' && this.invoice.payment != null) {
      this.invoice.rounding = (Math.round(parseFloat(this.invoice.payment))).toString();
      this.invoice.total_pay = this.invoice.rounding;

    }
  }

  registrarCompra() {
    console.log('asdf')


    this.deliveryNote.quantity = this.deliveryDetailArr.length.toString();
    this.deliveryNote.total = "120";
    this.deliveryNote.url_document = "";
    this.deliveryNote.delivery_detail = this.deliveryDetailArr;

    this.remisionGuide.guide_detail = this.guideDetailArr;

    this.invoice.invoice_detail = this.invoiceDetailArr;

    this.purchaseOrder.purchase = this.purchase;
    this.purchaseOrder.delivery_note = this.deliveryNote;
    // this.purchaseOrder.remision_guide = null;
    this.purchaseOrder.Invoice = this.invoice;

    console.log('compra', this.purchaseOrder)
    this.purchase.discount = this.invoice.discount;
    this.purchase.igv = this.invoice.igv;
    this.purchase.subtotal = this.invoice.subtotal;
    this.purchase.total = this.invoice.total;

    this.purchaseService.savePurchase(this.purchaseOrder).subscribe(
      response => {
        console.log('response', response)
        sweetAlert('Exito', 'Compra Registrada', 'success')

      },
      error => {
        console.log('error', error);
      }
    )
  

  }

  obtenerProveedores() {

    this.supplierService.getSuppliers().subscribe(
      response => {
        console.log('rresponse', response)
        response.forEach(element => {
          if(element.active == 1) {
            this.suppliers.push(element);
          }
        });
      },
      error => {
        console.log('error', error)
      }
    )

  }

  cambio(id) {
    this.supplierService.getSupplier(id.value).subscribe(
      response => {
        console.log('response', response)
        this.ruc = response.ruc;
        this.address = response.address;
        this.purchase.supplier_id = response.id;
        this.supplier = response.name;
      },
      error => {
        console.log('error', error)
      }
    )

  }

  primeraVista() {
    this.firstView = true;
    this.secondView = false;
    this.thirdView = false
    datatableDeliveryNote();
  }

  segundaVista() {
    this.firstView = false;
    this.secondView = true;
    this.thirdView = false;
    datatableGuiaRemision();
  }

  terceraVista() {
    if(
      this.purchase.supplier_id == "", this.purchase.supplier_id == null, this.purchase.supplier_id == undefined ||
      this.purchase.register_date == "", this.purchase.register_date == null, this.purchase.register_date == undefined ||
      this.deliveryDetailArr.length == 0
    ) {
      sweetAlert('Informativo', 'Seleccionar Proveedor, establecer fecha y agregar productos', 'info');
    } else {
      this.firstView = false;
      this.secondView = false;
      this.thirdView = true;
      datatableFactura();
    }
  }

  obtenerCategorias() {
    
    this.categoryService.getCategories().subscribe(
      response => {
        response.forEach(element => {
          if(element.active == 1) {
            this.categories.push(element);
          }
        });
        console.log('categorias', this.categories)
      },
      error => {
        console.log('error', error)
      }
    )

  }

  calcularSubtotal() {
    this.deliveryDetail.subtotal = parseFloat(this.deliveryDetail.quantity) * parseFloat(this.deliveryDetail.price)
  }
}
