// CONFIG
let columnDefs = [
  {
    orderable: true,
    targets: 0,
    checkboxes: { selectRow: true }
  }
];

let dom = '<"top"<"actions action-btns"B><"action-filters"lf>><"clear">rt<"bottom"<"actions">p>';

let oLanguage = {
  sLengthMenu: "_MENU_",
  sSearch: "",
  oPaginate: {
    "sFirst":    "Primero",
    "sLast":     "Último",
    "sNext":     "Siguiente",
    "sPrevious": "Anterior"
  },
  sZeroRecords: "No se encontraron resultados",
}

export function datatableCompanies(data) {
  /*=========================================================================================
    File Name: data-list-view.js
    Description: List View
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
  ==========================================================================================*/

  $(document).ready(function() {
    "use strict"
    // init list view datatable
    var dataListView = $("#dtCompanies").DataTable({
      responsive: false,
      columnDefs,
      dom,
      oLanguage,
      aLengthMenu: [[4, 10, 15, 20], [4, 10, 15, 20]],
      select: {
        style: "multi"
      },
      order: [[1, "asc"]],
      bInfo: false,
      pageLength: 4,
      data,
      buttons: [
        {
          text: "<i class='feather icon-plus'></i> Agregar Nuevo",
          action: function() {
            $(this).removeClass("btn-secondary")
            $("#sn-add-company").addClass("show")
            $("#bg-add-company").addClass("show")
          },
          className: "btn-outline-primary"
        }
      ],
      initComplete: function(settings, json) {
        $(".dt-buttons .btn").removeClass("btn-secondary")
      }
    });

    dataListView.on('draw.dt', function(){
      setTimeout(function(){
        if (navigator.userAgent.indexOf("Mac OS X") != -1) {
          $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
        }
      }, 50);
    });

    // init thumb view datatable
    var dataThumbView = $(".data-thumb-view").DataTable({
      responsive: false,
      columnDefs: [
        {
          orderable: true,
          targets: 0,
          checkboxes: { selectRow: true }
        }
      ],
      dom:
        '<"top"<"actions action-btns"B><"action-filters"lf>><"clear">rt<"bottom"<"actions">p>',
      oLanguage: {
        sLengthMenu: "_MENU_",
        sSearch: ""
      },
      aLengthMenu: [[4, 10, 15, 20], [4, 10, 15, 20]],
      select: {
        style: "multi"
      },
      order: [[1, "asc"]],
      bInfo: false,
      pageLength: 4,
      buttons: [
        {
          text: "<i class='feather icon-plus'></i> Add New",
          action: function() {
            $(this).removeClass("btn-secondary")
            $(".add-new-data").addClass("show")
            $(".overlay-bg").addClass("show")
          },
          className: "btn-outline-primary"
        }
      ],
      initComplete: function(settings, json) {
        $(".dt-buttons .btn").removeClass("btn-secondary")
      }
    })

    dataThumbView.on('draw.dt', function(){
      setTimeout(function(){
        if (navigator.userAgent.indexOf("Mac OS X") != -1) {
          $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
        }
      }, 50);
    });

    // To append actions dropdown before add new button
    var actionDropdown = $(".actions-dropodown")
    actionDropdown.insertBefore($(".top .actions .dt-buttons"))


    // Scrollbar
    if ($(".data-items").length > 0) {
      new PerfectScrollbar(".data-items", { wheelPropagation: false })
    }

    // Close sidebar
    $(".hide-data-sidebar, .cancel-data-btn, .overlay-bg").on("click", function() {
      $(".add-new-data").removeClass("show")
      $(".overlay-bg").removeClass("show")
      $("#data-name, #data-price").val("")
      $("#data-category, #data-status").prop("selectedIndex", 0)
    })

    // On Edit
    $('.action-edit').on("click",function(e){
      axios.get('http://52.205.193.59/apibitel/index.php/api/companies/' + localStorage.getItem('companyId'))
      .then(function(response) {
        console.log('response', response.data)
        $('#name-edit').val(response.data.name);
        $("#ruc-edit").val(response.data.ruc)
        $("#trade_name-edit").val(response.data.trade_name)
        $("#address-edit").val(response.data.address)
      })
      e.stopPropagation();

      $("#bg-edit-company").addClass("show");
      $("#sn-edit-company").addClass("show");
    });

    // On Delete
    $('.action-delete').on("click", function(e){
      var fila = $(this);

      axios.delete("http://52.205.193.59/apibitel/index.php/api/companies/" + localStorage.getItem('companyId'))
      .then(function(response) {
        console.log('responsessss', response)
        Swal.fire({
          title: "Exito",
          text: "Compañía Eliminada",
          type: "success",
          confirmButtonClass: 'btn btn-primary',
          buttonsStyling: false,
        });
        e.stopPropagation();
        fila.closest('td').parent('tr').fadeOut();
        
      })
    });

 

    // mac chrome checkbox fix
    if (navigator.userAgent.indexOf("Mac OS X") != -1) {
      $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
    }
  })

}

export function addTableCompany(data) {
  var t = $('#dtCompanies').DataTable();

  t.row.add( [
    data.id,
    data.ruc,
    data.name,
    data.trade_name,
    data.address,
    `<span onclick="localStorage.setItem('companyId', ${data.id})" class="action-edit"><i class="feather icon-edit"></i></span>
        <span onclick="localStorage.setItem('companyId', ${data.id})" class="action-delete"><i class="feather icon-trash"></i></span>`
  ] ).draw( false );

  $(".add-new-data").removeClass("show")
  $(".overlay-bg").removeClass("show")
}

export function datatableEmployees(data) {
  /*=========================================================================================
    File Name: data-list-view.js
    Description: List View
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
  ==========================================================================================*/

  $(document).ready(function() {
    "use strict"
    // init list view datatable
    var dataListView = $("#dtEmployees").DataTable({
      responsive: false,
      columnDefs,
      dom,
      oLanguage,
      aLengthMenu: [[4, 10, 15, 20], [4, 10, 15, 20]],
      select: {
        style: "multi"
      },
      order: [[1, "asc"]],
      bInfo: false,
      pageLength: 4,
      data,
      buttons: [
        {
          text: "<i class='feather icon-plus'></i> Agregar Nuevo",
          action: function() {
            $(this).removeClass("btn-secondary")
            $(".add-new-data").addClass("show")
            $(".overlay-bg").addClass("show")
            $("#data-name, #data-price").val("")
            $("#data-category, #data-status").prop("selectedIndex", 0)
          },
          className: "btn-outline-primary"
        }
      ],
      initComplete: function(settings, json) {
        $(".dt-buttons .btn").removeClass("btn-secondary")
      }
    });

    dataListView.on('draw.dt', function(){
      setTimeout(function(){
        if (navigator.userAgent.indexOf("Mac OS X") != -1) {
          $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
        }
      }, 50);
    });

    // init thumb view datatable
    var dataThumbView = $(".data-thumb-view").DataTable({
      responsive: false,
      columnDefs: [
        {
          orderable: true,
          targets: 0,
          checkboxes: { selectRow: true }
        }
      ],
      dom:
        '<"top"<"actions action-btns"B><"action-filters"lf>><"clear">rt<"bottom"<"actions">p>',
      oLanguage: {
        sLengthMenu: "_MENU_",
        sSearch: ""
      },
      aLengthMenu: [[4, 10, 15, 20], [4, 10, 15, 20]],
      select: {
        style: "multi"
      },
      order: [[1, "asc"]],
      bInfo: false,
      pageLength: 4,
      buttons: [
        {
          text: "<i class='feather icon-plus'></i> Add New",
          action: function() {
            $(this).removeClass("btn-secondary")
            $(".add-new-data").addClass("show")
            $(".overlay-bg").addClass("show")
          },
          className: "btn-outline-primary"
        }
      ],
      initComplete: function(settings, json) {
        $(".dt-buttons .btn").removeClass("btn-secondary")
      }
    })

    dataThumbView.on('draw.dt', function(){
      setTimeout(function(){
        if (navigator.userAgent.indexOf("Mac OS X") != -1) {
          $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
        }
      }, 50);
    });

    // To append actions dropdown before add new button
    var actionDropdown = $(".actions-dropodown")
    actionDropdown.insertBefore($(".top .actions .dt-buttons"))


    // Scrollbar
    if ($(".data-items").length > 0) {
      new PerfectScrollbar(".data-items", { wheelPropagation: false })
    }

    // Close sidebar
    $(".hide-data-sidebar, .cancel-data-btn, .overlay-bg").on("click", function() {
      $(".add-new-data").removeClass("show")
      $(".overlay-bg").removeClass("show")
      $("#data-name, #data-price").val("")
      $("#data-category, #data-status").prop("selectedIndex", 0)
    })

    // On Edit
    $('.action-edit').on("click",function(e){
      e.stopPropagation();
      $('#data-name').val('Altec Lansing - Bluetooth Speaker');
      $('#data-price').val('$99');
      $(".add-new-data").addClass("show");
      $(".overlay-bg").addClass("show");
    });

    // On Delete
    $('.action-delete').on("click", function(e){
      e.stopPropagation();
      $(this).closest('td').parent('tr').fadeOut();
    });

    

    // mac chrome checkbox fix
    if (navigator.userAgent.indexOf("Mac OS X") != -1) {
      $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
    }
  })
}

export function datatableSeats(data) {

  /*=========================================================================================
    File Name: data-list-view.js
    Description: List View
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
  ==========================================================================================*/

  $(document).ready(function() {
    "use strict"
    // init list view datatable

    var dataListView = $("#dtSeats").DataTable({
      responsive: false,
      columnDefs,
      dom,
      oLanguage,
      aLengthMenu: [[4, 10, 15, 20], [4, 10, 15, 20]],
      select: {
        style: "multi"
      },
      order: [[1, "asc"]],
      bInfo: false,
      pageLength: 4,
      data,
      buttons: [
        {
          text: "<i class='feather icon-plus'></i> Agregar Nuevo",
          action: function() {
            console.log('agrares')
            $(this).removeClass("btn-secondary")
            $("#bg-sede").addClass("show")
            $("#sn-sede").addClass("show")
          },
          className: "btn-outline-primary"
        }
      ],
      initComplete: function(settings, json) {
        $(".dt-buttons .btn").removeClass("btn-secondary")
      }
    });
  
    dataListView.on('draw.dt', function(){
      setTimeout(function(){
        if (navigator.userAgent.indexOf("Mac OS X") != -1) {
          $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
        }
      }, 50);
    });

    // init thumb view datatable
    var dataThumbView = $(".data-thumb-view").DataTable({
      responsive: false,
      columnDefs: [
        {
          orderable: true,
          targets: 0,
          checkboxes: { selectRow: true }
        }
      ],
      dom:
        '<"top"<"actions action-btns"B><"action-filters"lf>><"clear">rt<"bottom"<"actions">p>',
      oLanguage: {
        sLengthMenu: "_MENU_",
        sSearch: ""
      },
      aLengthMenu: [[4, 10, 15, 20], [4, 10, 15, 20]],
      select: {
        style: "multi"
      },
      order: [[1, "asc"]],
      bInfo: false,
      pageLength: 4,
      buttons: [
        {
          text: "<i class='feather icon-plus'></i> Add New",
          action: function() {
            $(this).removeClass("btn-secondary")
            $(".add-new-data").addClass("show")
            $(".overlay-bg").addClass("show")
          },
          className: "btn-outline-primary"
        }
      ],
      initComplete: function(settings, json) {
        $(".dt-buttons .btn").removeClass("btn-secondary")
      }
    })

    dataThumbView.on('draw.dt', function(){
      setTimeout(function(){
        if (navigator.userAgent.indexOf("Mac OS X") != -1) {
          $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
        }
      }, 50);
    });

    // To append actions dropdown before add new button
    var actionDropdown = $(".actions-dropodown")
    actionDropdown.insertBefore($(".top .actions .dt-buttons"))


    // Scrollbar
    if ($(".data-items").length > 0) {
      new PerfectScrollbar(".data-items", { wheelPropagation: false })
    }

    // Close sidebar
    $(".hide-data-sidebar, .cancel-data-btn, .overlay-bg").on("click", function() {
      $(".add-new-data").removeClass("show")
      $(".overlay-bg").removeClass("show")
      $("#data-name, #data-price").val("")
      $("#data-category, #data-status").prop("selectedIndex", 0)
    })

    // On Edit
    $('.action-edit').on("click",function(e){
      axios.get('http://52.205.193.59/apibitel/index.php/api/sedes/' + localStorage.getItem('seatId'))
      .then(function(response) {
        console.log('response', response.data)
        $('#company_id_edit').val(response.data.company_id);
        $('#ubigeo_edit').val(response.data.ubigeo);
        $('#name_edit').val(response.data.name);
      })
      e.stopPropagation();
      $("#edit-seat").addClass("show");
      $("#bg-seat").addClass("show");
    });

    // On Delete
    $('.action-delete').on("click", function(e){
      var fila = $(this);
      console.log("http://52.205.193.59/apibitel/index.php/api/sedes/" + localStorage.getItem('seatId'))
      axios.delete("http://52.205.193.59/apibitel/index.php/api/sedes/" + localStorage.getItem('seatId'))
      .then(function(response) {
        console.log('responsessss', response)
        $("#company_edit").val(response.data.company_id)
        $("#ubigeo_edit").val(response.data.ubigeo)
        $("#name_edit").val(response.data.name)
        Swal.fire({
          title: "Exito",
          text: "Sede Eliminada",
          type: "success",
          confirmButtonClass: 'btn btn-primary',
          buttonsStyling: false,
        });
        e.stopPropagation();
        fila.closest('td').parent('tr').fadeOut();
        
      })
    });

    
    // mac chrome checkbox fix
    if (navigator.userAgent.indexOf("Mac OS X") != -1) {
      $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
    }
  })
}

export function addTableSeat(data) {
  var t = $('#dtSeats').DataTable();
  let active = "";
  if(data.active == 0) {
    active = `
    <div class="chip chip-warning">
      <div class="chip-body">
          <div class="chip-text">Inactivo</div>
      </div>
    </div>
    `;
  }else {
    active = `
    <div class="chip chip-success">
      <div class="chip-body">
          <div class="chip-text">Activo</div>
      </div>
    </div>
    `;
  }
  
  t.row.add( [
    data.id,
    data.company_id,
    data.ubigeo,
    data.name,
    active,
    `<span class="action-edit"><i class="feather icon-edit"></i></span>
        <span class="action-delete"><i class="feather icon-trash"></i></span>`
  ] ).draw( false );

  $(".add-new-data").removeClass("show")
  $(".overlay-bg").removeClass("show")
}

export function datatableSubsidiaries(data) {
  /*=========================================================================================
    File Name: data-list-view.js
    Description: List View
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
  ==========================================================================================*/

  $(document).ready(function() {
    "use strict"
    // init list view datatable
    var dataListView = $("#dtSubsidiaries").DataTable({
      responsive: false,
      columnDefs,
      dom,
      oLanguage,
      aLengthMenu: [[4, 10, 15, 20], [4, 10, 15, 20]],
      select: {
        style: "multi"
      },
      order: [[1, "asc"]],
      bInfo: false,
      pageLength: 4,
      data,
      buttons: [
        {
          text: "<i class='feather icon-plus'></i> Agregar Nuevo",
          action: function() {
            $(this).removeClass("btn-secondary")
            $("#bg-add-subsidiary").addClass("show")
            $("#sn-add-subsidiary").addClass("show")
          },
          className: "btn-outline-primary"
        }
      ],
      initComplete: function(settings, json) {
        $(".dt-buttons .btn").removeClass("btn-secondary")
      }
    });

    dataListView.on('draw.dt', function(){
      setTimeout(function(){
        if (navigator.userAgent.indexOf("Mac OS X") != -1) {
          $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
        }
      }, 50);
    });

    // init thumb view datatable
    var dataThumbView = $(".data-thumb-view").DataTable({
      responsive: false,
      columnDefs: [
        {
          orderable: true,
          targets: 0,
          checkboxes: { selectRow: true }
        }
      ],
      dom:
        '<"top"<"actions action-btns"B><"action-filters"lf>><"clear">rt<"bottom"<"actions">p>',
      oLanguage: {
        sLengthMenu: "_MENU_",
        sSearch: ""
      },
      aLengthMenu: [[4, 10, 15, 20], [4, 10, 15, 20]],
      select: {
        style: "multi"
      },
      order: [[1, "asc"]],
      bInfo: false,
      pageLength: 4,
      buttons: [
        {
          text: "<i class='feather icon-plus'></i> Add New",
          action: function() {
            $(this).removeClass("btn-secondary")
            $(".add-new-data").addClass("show")
            $(".overlay-bg").addClass("show")
          },
          className: "btn-outline-primary"
        }
      ],
      initComplete: function(settings, json) {
        $(".dt-buttons .btn").removeClass("btn-secondary")
      }
    })

    dataThumbView.on('draw.dt', function(){
      setTimeout(function(){
        if (navigator.userAgent.indexOf("Mac OS X") != -1) {
          $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
        }
      }, 50);
    });

    // To append actions dropdown before add new button
    var actionDropdown = $(".actions-dropodown")
    actionDropdown.insertBefore($(".top .actions .dt-buttons"))


    // Scrollbar
    if ($(".data-items").length > 0) {
      new PerfectScrollbar(".data-items", { wheelPropagation: false })
    }

    // Close sidebar
    $(".hide-data-sidebar, .cancel-data-btn, .overlay-bg").on("click", function() {
      $(".add-new-data").removeClass("show")
      $(".overlay-bg").removeClass("show")
      $("#data-name, #data-price").val("")
      $("#data-category, #data-status").prop("selectedIndex", 0)
    })

    // On Edit
    $('.action-edit').on("click",function(e){
      axios.get('http://52.205.193.59/apibitel/index.php/api/offices/' + localStorage.getItem('subsidiaryId'))
      .then(function(response) {
        console.log('response', response.data)
        $('#seat-edit').val(response.data.sede_id);
        $('#name-edit').val(response.data.name);
        $('#address-edit').val(response.data.address);
        $('#phone-edit').val(response.data.phone);
      })
      e.stopPropagation();
      $("#edit-subsidiary").addClass("show");
      $("#bg-subsidiary").addClass("show");
    });

    // On Delete
    $('.action-delete').on("click", function(e){
      var fila = $(this);

      axios.delete("http://52.205.193.59/apibitel/index.php/api/offices/" + localStorage.getItem('subsidiaryId'))
      .then(function(response) {
        console.log('responsessss', response)
        Swal.fire({
          title: "Exito",
          text: "Sucursal Eliminado",
          type: "success",
          confirmButtonClass: 'btn btn-primary',
          buttonsStyling: false,
        });
        e.stopPropagation();
        fila.closest('td').parent('tr').fadeOut();
        
      })
    });


    // mac chrome checkbox fix
    if (navigator.userAgent.indexOf("Mac OS X") != -1) {
      $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
    }
  })
}

export function addTableSubsidiary(data) {
  var t = $('#dtSubsidiaries').DataTable();

  t.row.add( [
    data.id,
    data.sede_id,
    data.name,
    data.address,
    data.phone,
    `<span onclick="localStorage.setItem('subsidiaryId', ${data.id})" class="action-edit"><i class="feather icon-edit"></i></span>
        <span onclick="localStorage.setItem('subsidiaryId', ${data.id})" class="action-delete"><i class="feather icon-trash"></i></span>`
  ] ).draw( false );

  $(".add-new-data").removeClass("show")
  $(".overlay-bg").removeClass("show")
}

export function datatableSuppliers(data) {
  /*=========================================================================================
    File Name: data-list-view.js
    Description: List View
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
  ==========================================================================================*/

  $(document).ready(function() {
    "use strict"
    // init list view datatable
    var dataListView = $("#dtSuppliers").DataTable({
      responsive: false,
      columnDefs,
      dom,
      oLanguage,
      aLengthMenu: [[4, 10, 15, 20], [4, 10, 15, 20]],
      select: {
        style: "multi"
      },
      order: [[1, "asc"]],
      bInfo: false,
      pageLength: 4,
      data,
      buttons: [
        {
          text: "<i class='feather icon-plus'></i> Agregar Nuevo",
          action: function() {
            $(this).removeClass("btn-secondary")
            $("#bg-add-supplier").addClass("show")
            $("#sn-add-supplier").addClass("show")
          },
          className: "btn-outline-primary"
        }
      ],
      initComplete: function(settings, json) {
        $(".dt-buttons .btn").removeClass("btn-secondary")
      }
    });

    // dataListView.on('draw.dt', function(){
    //   setTimeout(function(){
    //     if (navigator.userAgent.indexOf("Mac OS X") != -1) {
    //       $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
    //     }
    //   }, 50);
    // });

    // init thumb view datatable
    var dataThumbView = $(".data-thumb-view").DataTable({
      responsive: false,
      columnDefs: [
        {
          orderable: true,
          targets: 0,
          checkboxes: { selectRow: true }
        }
      ],
      dom:
        '<"top"<"actions action-btns"B><"action-filters"lf>><"clear">rt<"bottom"<"actions">p>',
      oLanguage: {
        sLengthMenu: "_MENU_",
        sSearch: ""
      },
      aLengthMenu: [[4, 10, 15, 20], [4, 10, 15, 20]],
      select: {
        style: "multi"
      },
      order: [[1, "asc"]],
      bInfo: false,
      pageLength: 4,
      buttons: [
        {
          text: "<i class='feather icon-plus'></i> Add New",
          action: function() {
            $(this).removeClass("btn-secondary")
            $(".add-new-data").addClass("show")
            $(".overlay-bg").addClass("show")
          },
          className: "btn-outline-primary"
        }
      ],
      initComplete: function(settings, json) {
        $(".dt-buttons .btn").removeClass("btn-secondary")
      }
    })

    // dataThumbView.on('draw.dt', function(){
    //   setTimeout(function(){
    //     if (navigator.userAgent.indexOf("Mac OS X") != -1) {
    //       $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
    //     }
    //   }, 50);
    // });

    // To append actions dropdown before add new button
    var actionDropdown = $(".actions-dropodown")
    actionDropdown.insertBefore($(".top .actions .dt-buttons"))


    // Scrollbar
    if ($(".data-items").length > 0) {
      new PerfectScrollbar(".data-items", { wheelPropagation: false })
    }

    // Close sidebar
    $(".hide-data-sidebar, .cancel-data-btn, .overlay-bg").on("click", function() {
      $(".add-new-data").removeClass("show")
      $(".overlay-bg").removeClass("show")
      $("#data-name, #data-price").val("")
      $("#data-category, #data-status").prop("selectedIndex", 0)
    })

    // On Edit
    $('.action-edit').on("click",function(e){
      axios.get('http://52.205.193.59/apibitel/index.php/api/suppliers/' + localStorage.getItem('supplierId'))
      .then(function(response) {
        console.log('response', response.data)
        $('#name-edit').val(response.data.name);
        $('#ruc-edit').val(response.data.ruc);
        $('#district-edit').val(response.data.district_id);
        $('#address-edit').val(response.data.address);
        $('#email-edit').val(response.data.email);
        $('#phone-edit').val(response.data.phone);
      })
      e.stopPropagation();
      
      
      $("#bg-edit-supplier").addClass("show");
      $("#sn-edit-supplier").addClass("show");
    });

    // On Delete
    $('.action-delete').on("click", function(e){
      var fila = $(this);

      axios.delete("http://52.205.193.59/apibitel/index.php/api/suppliers/" + localStorage.getItem('supplierId'))
      .then(function(response) {
        console.log('responsessss', response)
        Swal.fire({
          title: "Exito",
          text: "Proveedor Eliminado",
          type: "success",
          confirmButtonClass: 'btn btn-primary',
          buttonsStyling: false,
        });
        e.stopPropagation();
        fila.closest('td').parent('tr').fadeOut();
        
      })
    });

    
    // mac chrome checkbox fix
    if (navigator.userAgent.indexOf("Mac OS X") != -1) {
      $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
    }
  })
}

export function addTableSuppliers(data) {
  var t = $('#dtSuppliers').DataTable();

  t.row.add( [
    data.id,
    data.name,
    data.ruc,
    data.address,
    data.email,
    data.phone,
    `
      <span class="action-edit" onclick="localStorage.setItem('supplierId', ${data.id})"><i class="feather icon-edit"></i></span>
      <span class="action-delete" onclick="localStorage.setItem('supplierId', ${data.id})"><i class="feather icon-trash"></i></span>
    `
  ] ).draw( false );

  $("#bg-add-supplier").removeClass("show")
  $("#sn-add-supplier").removeClass("show")
}

export function datatableCategories(data) {
  /*=========================================================================================
    File Name: data-list-view.js
    Description: List View
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
  ==========================================================================================*/

  $(document).ready(function() {
    "use strict"
    // init list view datatable
    var dataListView = $("#dtCategories").DataTable({
      responsive: false,
      columnDefs,
      dom,
      oLanguage,
      aLengthMenu: [[4, 10, 15, 20], [4, 10, 15, 20]],
      select: {
        style: "multi"
      },
      order: [[1, "asc"]],
      bInfo: false,
      pageLength: 4,
      data,
      buttons: [
        {
          text: "<i class='feather icon-plus'></i> Agregar Nuevo",
          action: function() {
            $(this).removeClass("btn-secondary")
            $("#bg-add-category").addClass("show")
            $("#sn-add-category").addClass("show")
          },
          className: "btn-outline-primary"
        }
      ],
      initComplete: function(settings, json) {
        $(".dt-buttons .btn").removeClass("btn-secondary")
      }
    });

    dataListView.on('draw.dt', function(){
      setTimeout(function(){
        if (navigator.userAgent.indexOf("Mac OS X") != -1) {
          $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
        }
      }, 50);
    });

    // init thumb view datatable
    var dataThumbView = $(".data-thumb-view").DataTable({
      responsive: false,
      columnDefs: [
        {
          orderable: true,
          targets: 0,
          checkboxes: { selectRow: true }
        }
      ],
      dom:
        '<"top"<"actions action-btns"B><"action-filters"lf>><"clear">rt<"bottom"<"actions">p>',
      oLanguage: {
        sLengthMenu: "_MENU_",
        sSearch: ""
      },
      aLengthMenu: [[4, 10, 15, 20], [4, 10, 15, 20]],
      select: {
        style: "multi"
      },
      order: [[1, "asc"]],
      bInfo: false,
      pageLength: 4,
      buttons: [
        {
          text: "<i class='feather icon-plus'></i> Add New",
          action: function() {
            $(this).removeClass("btn-secondary")
            $(".add-new-data").addClass("show")
            $(".overlay-bg").addClass("show")
          },
          className: "btn-outline-primary"
        }
      ],
      initComplete: function(settings, json) {
        $(".dt-buttons .btn").removeClass("btn-secondary")
      }
    })

    dataThumbView.on('draw.dt', function(){
      setTimeout(function(){
        if (navigator.userAgent.indexOf("Mac OS X") != -1) {
          $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
        }
      }, 50);
    });

    // To append actions dropdown before add new button
    var actionDropdown = $(".actions-dropodown")
    actionDropdown.insertBefore($(".top .actions .dt-buttons"))


    // Scrollbar
    if ($(".data-items").length > 0) {
      new PerfectScrollbar(".data-items", { wheelPropagation: false })
    }

    // Close sidebar
    $(".hide-data-sidebar, .cancel-data-btn, .overlay-bg").on("click", function() {
      $(".add-new-data").removeClass("show")
      $(".overlay-bg").removeClass("show")
    })

    // On Edit
    $('.action-edit').on("click",function(e){
      axios.get('http://52.205.193.59/apibitel/index.php/api/categories/' + localStorage.getItem('categoryId'))
      .then(function(response) {
        console.log('response', response.data)
        $('#name-edit').val(response.data.name);
        $("#description-edit").val(response.data.description)
      })
      e.stopPropagation();

      $("#bg-edit-category").addClass("show");
      $("#sn-edit-category").addClass("show");
    });

    // On Delete
    $('.action-delete').on("click", function(e){
      var fila = $(this);

      axios.delete("http://52.205.193.59/apibitel/index.php/api/categories/" + localStorage.getItem('categoryId'))
      .then(function(response) {
        console.log('responsessss', response)
        Swal.fire({
          title: "Exito",
          text: "Categoría Eliminada",
          type: "success",
          confirmButtonClass: 'btn btn-primary',
          buttonsStyling: false,
        });
        e.stopPropagation();
        fila.closest('td').parent('tr').fadeOut();
        
      })
    });

   

    // mac chrome checkbox fix
    if (navigator.userAgent.indexOf("Mac OS X") != -1) {
      $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
    }
  })
}

export function addTableCategory(data) {
  var t = $('#dtCategories').DataTable();

  t.row.add( [
    data.id,
    data.name,
    data.description,
    `<span onclick="localStorage.setItem('categoryId', ${data.id})" class="action-edit"><i class="feather icon-edit"></i></span>
        <span onclick="localStorage.setItem('categoryId', ${data.id})" class="action-delete"><i class="feather icon-trash"></i></span>`
  ] ).draw( false );

  $(".add-new-data").removeClass("show")
  $(".overlay-bg").removeClass("show")
}

export function datatableDeliveryNote(data) {
  /*=========================================================================================
    File Name: data-list-view.js
    Description: List View
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
  ==========================================================================================*/

  $(document).ready(function() {
    "use strict"
    // init list view datatable
    var dataListView = $("#dtDeliveryNote").DataTable({
      responsive: false,
      columnDefs,
      dom,
      oLanguage,
      aLengthMenu: [[4, 10, 15, 20], [4, 10, 15, 20]],
      select: {
        style: "multi"
      },
      order: [[1, "asc"]],
      bInfo: false,
      pageLength: 4,
      data,
      buttons: [
        {
          text: "<i class='feather icon-plus'></i> Agregar Nuevo",
          action: function() {
            $(this).removeClass("btn-secondary")
            $("#bg-nota").addClass("show")
            $("#data-nota").addClass("show")
            $("#data-name, #data-price").val("")
            $("#data-category, #data-status").prop("selectedIndex", 0)
          },
          className: "btn-outline-primary"
        }
      ],
      initComplete: function(settings, json) {
        $(".dt-buttons .btn").removeClass("btn-secondary")
      }
    });

    dataListView.on('draw.dt', function(){
      setTimeout(function(){
        if (navigator.userAgent.indexOf("Mac OS X") != -1) {
          $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
        }
      }, 50);
    });

    // init thumb view datatable
    var dataThumbView = $(".data-thumb-view").DataTable({
      responsive: false,
      columnDefs: [
        {
          orderable: true,
          targets: 0,
          checkboxes: { selectRow: true }
        }
      ],
      dom:
        '<"top"<"actions action-btns"B><"action-filters"lf>><"clear">rt<"bottom"<"actions">p>',
      oLanguage: {
        sLengthMenu: "_MENU_",
        sSearch: ""
      },
      aLengthMenu: [[4, 10, 15, 20], [4, 10, 15, 20]],
      select: {
        style: "multi"
      },
      order: [[1, "asc"]],
      bInfo: false,
      pageLength: 4,
      buttons: [
        {
          text: "<i class='feather icon-plus'></i> Add New",
          action: function() {
            $(this).removeClass("btn-secondary")
            $(".add-new-data").addClass("show")
            $(".overlay-bg").addClass("show")
          },
          className: "btn-outline-primary"
        }
      ],
      initComplete: function(settings, json) {
        $(".dt-buttons .btn").removeClass("btn-secondary")
      }
    })

    dataThumbView.on('draw.dt', function(){
      setTimeout(function(){
        if (navigator.userAgent.indexOf("Mac OS X") != -1) {
          $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
        }
      }, 50);
    });

    // To append actions dropdown before add new button
    var actionDropdown = $(".actions-dropodown")
    actionDropdown.insertBefore($(".top .actions .dt-buttons"))


    // Scrollbar
    if ($(".data-items").length > 0) {
      new PerfectScrollbar(".data-items", { wheelPropagation: false })
    }

    // Close sidebar
    $(".hide-data-sidebar, .cancel-data-btn, .overlay-bg").on("click", function() {
      $(".add-new-data").removeClass("show")
      $(".overlay-bg").removeClass("show")
      $("#data-name, #data-price").val("")
      $("#data-category, #data-status").prop("selectedIndex", 0)
    })

    // On Edit
    $('.action-edit').on("click",function(e){
      e.stopPropagation();
      $('#data-name').val('Altec Lansing - Bluetooth Speaker');
      $('#data-price').val('$99');
      $(".add-new-data").addClass("show");
      $(".overlay-bg").addClass("show");
    });

    // On Delete
    $('.action-delete').on("click", function(e){
      e.stopPropagation();
      $(this).closest('td').parent('tr').fadeOut();
    });

    

    // mac chrome checkbox fix
    if (navigator.userAgent.indexOf("Mac OS X") != -1) {
      $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
    }
  })
  
}

export function addTableDeliveryNote(data) {
  var t = $('#dtDeliveryNote').DataTable();

  t.row.add( [
    '',
    data.brand +' '+ data.type,
    data.code,
    data.capacity,
    data.color,
    data.imei_from,
    data.imei_from,
    // data.imei_until,
    data.price,
    data.quantity,
    data.subtotal,
    `<span class="action-edit"><i class="feather icon-edit"></i></span>
        <span class="action-delete"><i class="feather icon-trash"></i></span>`
  ] ).draw( false );

  $("#bg-nota").removeClass("show")
  $("#data-nota").removeClass("show")
}

export function datatableGuiaRemision(data) {
  /*=========================================================================================
    File Name: data-list-view.js
    Description: List View
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
  ==========================================================================================*/

  $(document).ready(function() {
    "use strict"
    // init list view datatable
    var dataListView = $("#dtGuiaRemision").DataTable({
      responsive: false,
      columnDefs,
      dom,
      oLanguage,
      aLengthMenu: [[4, 10, 15, 20], [4, 10, 15, 20]],
      select: {
        style: "multi"
      },
      order: [[1, "asc"]],
      bInfo: false,
      pageLength: 4,
      data,
      buttons: [
        {
          text: "<i class='feather icon-plus'></i> Agregar Nuevo",
          action: function() {
            $(this).removeClass("btn-secondary")
            $("#sn-remision").addClass("show")
            $("#bg-remision").addClass("show")
            console.log('dfas')
          },
          className: "btn-outline-primary"
        }
      ],
      initComplete: function(settings, json) {
        $(".dt-buttons .btn").removeClass("btn-secondary")
      }
    });

    dataListView.on('draw.dt', function(){
      setTimeout(function(){
        if (navigator.userAgent.indexOf("Mac OS X") != -1) {
          $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
        }
      }, 50);
    });

    // init thumb view datatable
    var dataThumbView = $(".data-thumb-view").DataTable({
      responsive: false,
      columnDefs: [
        {
          orderable: true,
          targets: 0,
          checkboxes: { selectRow: true }
        }
      ],
      dom:
        '<"top"<"actions action-btns"B><"action-filters"lf>><"clear">rt<"bottom"<"actions">p>',
      oLanguage: {
        sLengthMenu: "_MENU_",
        sSearch: ""
      },
      aLengthMenu: [[4, 10, 15, 20], [4, 10, 15, 20]],
      select: {
        style: "multi"
      },
      order: [[1, "asc"]],
      bInfo: false,
      pageLength: 4,
      buttons: [
        {
          text: "<i class='feather icon-plus'></i> Add New",
          action: function() {
            $(this).removeClass("btn-secondary")
            $(".add-new-datas").addClass("show")
            $(".overlay-bg").addClass("show")
          },
          className: "btn-outline-primary"
        }
      ],
      initComplete: function(settings, json) {
        $(".dt-buttons .btn").removeClass("btn-secondary")
      }
    })

    dataThumbView.on('draw.dt', function(){
      setTimeout(function(){
        if (navigator.userAgent.indexOf("Mac OS X") != -1) {
          $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
        }
      }, 50);
    });

    // To append actions dropdown before add new button
    var actionDropdown = $(".actions-dropodown")
    actionDropdown.insertBefore($(".top .actions .dt-buttons"))


    // Scrollbar
    if ($(".data-items").length > 0) {
      new PerfectScrollbar(".data-items", { wheelPropagation: false })
    }

    // Close sidebar
    $(".hide-data-sidebar, .cancel-data-btn, .overlay-bg").on("click", function() {
      $(".add-new-datas").removeClass("show")
      $(".overlay-bg").removeClass("show")
      $("#data-name, #data-price").val("")
      $("#data-category, #data-status").prop("selectedIndex", 0)
    })

    // On Edit
    $('.action-edit').on("click",function(e){
      e.stopPropagation();
      $('#data-name').val('Altec Lansing - Bluetooth Speaker');
      $('#data-price').val('$99');
      $(".add-new-datas").addClass("show");
      $(".overlay-bg").addClass("show");
    });

    // On Delete
    $('.action-delete').on("click", function(e){
      e.stopPropagation();
      $(this).closest('td').parent('tr').fadeOut();
    });

    

    // mac chrome checkbox fix
    if (navigator.userAgent.indexOf("Mac OS X") != -1) {
      $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
    }
  })
  
}

export function addTableGuiaRemision(data) {
  var t = $('#dtGuiaRemision').DataTable();

  t.row.add( [
    '',
    data.code,
    data.measure_unit,
    data.quantity,
    data.description,
    `<span class="action-edit"><i class="feather icon-edit"></i></span>
        <span class="action-delete"><i class="feather icon-trash"></i></span>`
  ] ).draw( false );

  $("#bg-remision").removeClass("show")
  $("#sn-remision").removeClass("show")

}

export function datatableFactura(data) {
  /*=========================================================================================
    File Name: data-list-view.js
    Description: List View
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
  ==========================================================================================*/

  $(document).ready(function() {
    "use strict"
    // init list view datatable
    var dataListView = $("#dtFactura").DataTable({
      responsive: false,
      columnDefs,
      dom,
      oLanguage,
      aLengthMenu: [[4, 10, 15, 20], [4, 10, 15, 20]],
      select: {
        style: "multi"
      },
      order: [[1, "asc"]],
      bInfo: false,
      pageLength: 4,
      data,
      buttons: [
        {
          text: "<i class='feather icon-plus'></i> Agregar Nuevo",
          action: function() {
            $(this).removeClass("btn-secondary")
            $("#sn-factura").addClass("show")
            $("#bg-factura").addClass("show")
            console.log('dfas')
          },
          className: "btn-outline-primary"
        }
      ],
      initComplete: function(settings, json) {
        $(".dt-buttons .btn").removeClass("btn-secondary")
      }
    });

    dataListView.on('draw.dt', function(){
      setTimeout(function(){
        if (navigator.userAgent.indexOf("Mac OS X") != -1) {
          $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
        }
      }, 50);
    });

    // init thumb view datatable
    var dataThumbView = $(".data-thumb-view").DataTable({
      responsive: false,
      columnDefs: [
        {
          orderable: true,
          targets: 0,
          checkboxes: { selectRow: true }
        }
      ],
      dom:
        '<"top"<"actions action-btns"B><"action-filters"lf>><"clear">rt<"bottom"<"actions">p>',
      oLanguage: {
        sLengthMenu: "_MENU_",
        sSearch: ""
      },
      aLengthMenu: [[4, 10, 15, 20], [4, 10, 15, 20]],
      select: {
        style: "multi"
      },
      order: [[1, "asc"]],
      bInfo: false,
      pageLength: 4,
      buttons: [
        {
          text: "<i class='feather icon-plus'></i> Add New",
          action: function() {
            $(this).removeClass("btn-secondary")
            $(".add-new-datas").addClass("show")
            $(".overlay-bg").addClass("show")
          },
          className: "btn-outline-primary"
        }
      ],
      initComplete: function(settings, json) {
        $(".dt-buttons .btn").removeClass("btn-secondary")
      }
    })

    dataThumbView.on('draw.dt', function(){
      setTimeout(function(){
        if (navigator.userAgent.indexOf("Mac OS X") != -1) {
          $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
        }
      }, 50);
    });

    // To append actions dropdown before add new button
    var actionDropdown = $(".actions-dropodown")
    actionDropdown.insertBefore($(".top .actions .dt-buttons"))


    // Scrollbar
    if ($(".data-items").length > 0) {
      new PerfectScrollbar(".data-items", { wheelPropagation: false })
    }

    // Close sidebar
    $(".hide-data-sidebar, .cancel-data-btn, .overlay-bg").on("click", function() {
      $(".add-new-datas").removeClass("show")
      $(".overlay-bg").removeClass("show")
      $("#data-name, #data-price").val("")
      $("#data-category, #data-status").prop("selectedIndex", 0)
    })

    // On Edit
    $('.action-edit').on("click",function(e){
      e.stopPropagation();
      $('#data-name').val('Altec Lansing - Bluetooth Speaker');
      $('#data-price').val('$99');
      $(".add-new-datas").addClass("show");
      $(".overlay-bg").addClass("show");
    });

    // On Delete
    $('.action-delete').on("click", function(e){
      e.stopPropagation();
      $(this).closest('td').parent('tr').fadeOut();
    });


    // mac chrome checkbox fix
    if (navigator.userAgent.indexOf("Mac OS X") != -1) {
      $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
    }
  })
  
}

export function addTableFactura(data) {
  var t = $('#dtFactura').DataTable();

  t.row.add( [
    '',
    data.type,
    data.quantity,
    data.description,
    data.subtotal,
    `<span class="action-edit"><i class="feather icon-edit"></i></span>
        <span class="action-delete"><i class="feather icon-trash"></i></span>`
  ] ).draw( false );

  $("#bg-factura").removeClass("show")
  $("#sn-factura").removeClass("show")
}

export function datatableAlmacen(data) {
  /*=========================================================================================
    File Name: data-list-view.js
    Description: List View
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
  ==========================================================================================*/

  $(document).ready(function() {
    "use strict"
    // init list view datatable
    var dataListView = $("#dtAlmacen").DataTable({
      responsive: false,
      columnDefs,
      dom,
      oLanguage,
      aLengthMenu: [[4, 10, 15, 20], [4, 10, 15, 20]],
      select: {
        style: "multi"
      },
      order: [[1, "asc"]],
      bInfo: false,
      pageLength: 4,
      data,
      buttons: [
        // {
        //   text: "<i class='feather icon-plus'></i> Agregar Nuevo",
        //   action: function() {
        //     $(this).removeClass("btn-secondary")
        //     $(".add-new-data").addClass("show")
        //     $(".overlay-bg").addClass("show")
        //   },
        //   className: "btn-outline-primary"
        // }
      ],
      initComplete: function(settings, json) {
        $(".dt-buttons .btn").removeClass("btn-secondary")
      }
    });

    dataListView.on('draw.dt', function(){
      setTimeout(function(){
        if (navigator.userAgent.indexOf("Mac OS X") != -1) {
          $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
        }
      }, 50);
    });

    // init thumb view datatable
    var dataThumbView = $(".data-thumb-view").DataTable({
      responsive: false,
      columnDefs: [
        {
          orderable: true,
          targets: 0,
          checkboxes: { selectRow: true }
        }
      ],
      dom:
        '<"top"<"actions action-btns"B><"action-filters"lf>><"clear">rt<"bottom"<"actions">p>',
      oLanguage: {
        sLengthMenu: "_MENU_",
        sSearch: ""
      },
      aLengthMenu: [[4, 10, 15, 20], [4, 10, 15, 20]],
      select: {
        style: "multi"
      },
      order: [[1, "asc"]],
      bInfo: false,
      pageLength: 4,
      // buttons: [
      //   {
      //     text: "<i class='feather icon-plus'></i> Add New",
      //     action: function() {
      //       $(this).removeClass("btn-secondary")
      //       $(".add-new-data").addClass("show")
      //       $(".overlay-bg").addClass("show")
      //     },
      //     className: "btn-outline-primary"
      //   }
      // ],
      initComplete: function(settings, json) {
        $(".dt-buttons .btn").removeClass("btn-secondary")
      }
    })

    dataThumbView.on('draw.dt', function(){
      setTimeout(function(){
        if (navigator.userAgent.indexOf("Mac OS X") != -1) {
          $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
        }
      }, 50);
    });

    // To append actions dropdown before add new button
    var actionDropdown = $(".actions-dropodown")
    actionDropdown.insertBefore($(".top .actions .dt-buttons"))


    // Scrollbar
    if ($(".data-items").length > 0) {
      new PerfectScrollbar(".data-items", { wheelPropagation: false })
    }

    // Close sidebar
    $(".hide-data-sidebar, .cancel-data-btn, .overlay-bg").on("click", function() {
      $(".add-new-data").removeClass("show")
      $(".overlay-bg").removeClass("show")
      $("#data-name, #data-price").val("")
      $("#data-category, #data-status").prop("selectedIndex", 0)
    })

    // On Add
    $('.action-add').on("click",function(e){
      e.stopPropagation();
      $(".add-new-data").addClass("show");
      $(".overlay-bg").addClass("show");
    });

    // On Edit
    $('.action-edit').on("click",function(e){
      e.stopPropagation();
      $('#data-name').val('Altec Lansing - Bluetooth Speaker');
      $('#data-price').val('$99');
      $(".add-new-data").addClass("show");
      $(".overlay-bg").addClass("show");
    });

    // On Delete
    $('.action-delete').on("click", function(e){
      e.stopPropagation();
      $(this).closest('td').parent('tr').fadeOut();
    });

    $('.kardex').on("click", function(e){
      $("#tableKardex").html('');
      axios.get('http://52.205.193.59/apibitel/index.php/api/kardex?inventory_id=' + localStorage.getItem('inventoryId'))
      .then(function(response){
        console.log('listado kardex', response)
        response.data.forEach(element => {

          let cantEntry = "";

          if(element.type == "INGRESO") {

            cantEntry = `
              <div class="badge badge-success">
                ${element.quantity_entry}
              </div>
            `

          } else {

            cantEntry = `${element.quantity_entry}`

          }

          let cantOutput = "";

          if(element.type == "SALIDA") {

            cantOutput = `
              <div class="badge badge-danger">
                ${element.quantity_output}
              </div>
            `

          } else {

            cantOutput = `${element.quantity_output}`

          }
          $("#tableKardex").append(`
            <tr>
              <td>${element.operation_date}</td>
              <td>${element.type}</td>
              <td>${element.subtype}</td>
              <td>${element.type_document}</td>
              <td>${element.serie}</td>
              
              <td>${cantEntry}</td>
              <td>${element.cost_entry}</td>
              <td>${element.total_entry}</td>
              <td>${cantOutput}</td>
              <td>${element.cost_output}</td>
              <td>${element.total_output}</td>
            </tr>
          `)
        });
      })
      console.log('asfdfsdfsd')
    })

    $('.transfer').on("click", function(e) {

    })

    // mac chrome checkbox fix
    if (navigator.userAgent.indexOf("Mac OS X") != -1) {
      $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
    }
  })
}