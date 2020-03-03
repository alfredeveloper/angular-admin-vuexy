class PurchaseOrder {
    constructor(
        public purchase: Purchase,
        public delivery_note: DeliveryNote,
        // public remision_guide: RemisionGuide,
        public Invoice: Invoice
    ) {}
}

class Purchase {
    constructor(
        public supplier_id: string,
        public register_date: string,
        public discount: string,
        public subtotal: string,
        public igv: string,
        public total: string
    ) {}
}

class DeliveryNote {
    constructor(
        public quantity: string,
        public total: string,
        public url_document: string,
        public delivery_detail: Array<DeliveryDetail>
    ){}
}

class DeliveryDetail {
    constructor(
        public category_id: string,
        public brand: string,
        public type: string,
        public code: string,
        public capacity: string,
        public color: string,
        public imei_from: string,
        public imei_until: string,
        public price: string,
        public quantity: string,
        public subtotal: any,
    ) {}
}

class RemisionGuide {
    constructor(
        public serie: string,
        public correlative: string,
        public emission_date: string,
        public transfer_date: string,
        public origin: string,
        public destination: string,
        public vehicle: string,
        public registration_certificate: string,
        public driver_license: string,
        public transfer_reason: string,
        public guide_detail: Array<GuideDetail>
    ) {}
}

class GuideDetail {
    constructor(
        public code: string,
        public measure_unit: string,
        public quantity: string,
        public description: string
    ) {}
}

class Invoice {
    constructor(
        public serie: string,
        public correlative: string,
        public number: string,
        public seller: string,
        public invoice_date: string,
        public subtotal: string,
        public discount: string,
        public igv: string,
        public total: string,
        public payment: string,
        public rounding: string,
        public total_pay: string,
        public change: string,
        public invoice_detail: Array<InvoiceDetail>
    ) {}
}

class InvoiceDetail {
    constructor(
        public type: string,
        public quantity: string,
        public description: string,
        public subtotal: string
    ) {}
}

export {
    PurchaseOrder,
    Purchase,
    DeliveryNote,
    DeliveryDetail,
    RemisionGuide,
    GuideDetail,
    Invoice,
    InvoiceDetail
}