﻿//All script regarding index page.
//<script type="text/javascript">
var obj = null;
var uri = 'api/data/';
var ProductList= [];
var orderrows = [];
var OrderIdentity ;
var Customer = { CustomerIdentity: null };

$(document).ready(function () {
    ////Create Shopping cart modal
    //        $("#MyOrders").click(function () {
    //            $("#OrderModal").modal("toggle");
    //        });

    // Read the cookie
            var UserCookie = Cookies.get('Customer');
            if (UserCookie != null) {
               var  UserData = JSON.parse(UserCookie);
                SetUser(UserData);
            }

    //        $("#myLogin").click(function () {
    //            if (Customer.CustomerIdentity == null)
    //                $("#LoginModal").modal("toggle");
    //        });

    //            //Load Products into the page
    //
            ConnecToDatebase('GetProducts', {});

    
           
});

function SetUser(UserData) {
    $('#Customername')[0].innerText = UserData.Customername;
    Customer.CustomerIdentity = UserData.CustomerIdentity;

}

function GetProduct(ds) {
    var source =
        {
            localdata: ds,
            datafields: [
                { name: 'ProductIdentity', type: 'string' },
                { name: 'Productname', type: 'string'},
                { name: 'Description', type: 'string'},
                { name: 'Gender', type: 'string'},
                { name: 'Color', type: 'string'},
                { name: 'Size', type: 'string'},
                { name: 'Price', type: 'string'},
                { name: 'Discount', type: 'string'},
                { name: 'ImageURL', type: 'string'},
                { name: 'Score', type: 'string'}
            ],
            datatype: "array", 
            addrow: function (rowid, rowdata, position, commit) {
                // synchronize with the server - send insert command
                // call commit with parameter true if the synchronization with the server was successful. 
                // and with parameter false if the synchronization has failed.
                // you can pass additional argument to the commit callback which represents the new ID if it is generated from a Database. Example: commit(true, idInDB) where "idInDB" is the row's ID in the Database.
                if (rowdata.ProductName.length > 0) {

                    ConnecToDatebase('AddProduct', rowdata);
                    commit(true);
                                 
                }
                else
                    return false;
            },
            updaterow: function (rowid, rowdata, commit) {
                // synchronize with the server - send update command
                // call commit with parameter true if the synchronization with the server was successful 
                // and with parameter false if the synchronization has failed.
                          
                if (rowdata.ProductIdentity.length > 0) { 
                    ConnecToDatebase('UpdateProduct', rowdata);
                    commit(true); 
                }
                else
                    return false;
            },
            deleterow: function (rowid, rowdata, commit) {
                // synchronize with the server - send delete command
                // call commit with parameter true if the synchronization with the server was successful 
                // and with parameter false if the synchronization has failed.
                        
                if (rowdata.ProductIdentity.length > 0) {
                    ConnecToDatebase('DeleteProduct', rowdata);
                    commit(true);
                }
                else
                    return false;
            }
        };

    var dataAdapter = new $.jqx.dataAdapter(source);

    $("#ProductsGrid").jqxGrid(
    {
        width: '100%',
        autoHeight:true,
        source: dataAdapter,
        filterable: true, 
        showeverpresentrow: true,
        everpresentrowposition: "top",
        everpresentrowactions: "add update remove reset",
        editable: false,
        columns: [
          { text: 'ID', datafield: 'ProductIdentity', width: '5%' },
          { text: 'Name', datafield: 'Productname', width: '10%' },
          { text: 'Description', datafield: 'Description', width: '21%' },
          { text: 'Gender', datafield: 'Gender', width: '7%' },
          { text: 'Color', datafield: 'Color', width: '7%' },
          { text: 'Size', datafield: 'Size', width: '5%' },
          { text: 'Price', datafield: 'Price', width: '5%' },
          { text: 'Discount', datafield: 'Discount', width: '7%' },
          { text: 'Image URL', datafield: 'ImageURL', width: '25%' },
          { text: 'Score', datafield: 'Score', width: '5%' },
          {
              text: '', width: '3%', datafield: 'Edit', editable: false, cellsalign: 'center', columntype: 'button', cellsrenderer: function () {
            return " <img id='deleteimg' src='Resources/images/delete.png' />";
                               
        }, buttonclick: function (row) {
            // open the popup window when the user clicks a button.
            editrow = row;
            $("#dataTable").jqxGrid('deleterow', row);
                               
        }
  }
        ]
    });
}



function ConnecToDatebase(method, obj) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: uri + method,
        dataType: "json",
        data: JSON.stringify(obj),
        success: function (response) {
            if (response != undefined) {
                if (method == 'GetProducts')
                    GetProduct(response);
                else if (method == 'GetLogin') {
                    SetUser(response[0]);
                    // Set a cookie
                    Cookies.set('Customer', JSON.stringify(response[0]));
                }

            }
        },
        error: function (xhr, error) {
            var s = "";
        },
    });

}


//function ExistingUser()
//{
//        $("#ExistingUserModal").modal("toggle");
//}
//function NewUser()
//{
//        $("#NewUserModal").modal("toggle");
//}

//function RegisterUser() {

//    var UserObject =
//        {
//        Customername: $('#InputName').val(),
//        SSN: $('#InputSSN').val(),
//        DeliveryAddress: $('#InputDeliveryAddress').val(),
//        BillingAddress: $('#InputBillingAddress').val(),
//        Epost: $('#InputEpost').val(),
//        Username: $('#InpUsername').val(),
//        Password: $('#InpPassword').val()  
//    };

//    ConnecToDatebase('SetLogin', UserObject)

//}

//function Login() {
//    var User = {
//        Username: $('#InputUsername').val(),
//        Password: $('#InputPassword').val()
//    }
//    ConnecToDatebase('GetLogin', User)
//}

//    //Initiate filter
//    $('.ColorContainer .GenderContainer').empty();
//    var List = [];
//    var elements = '';
//    for (var i = 0; i < ds.length; i++) {
//        if (List.length == 0)
//            List.push(ds[i].Gender);
//        else
//            if (List.indexOf(ds[i].Gender) == -1)
//                List.push(ds[i].Gender);
//    }
//    for (var i = 0; i<List.length; i++) 
//        elements += ' <button class="Filterbtn GenderBtn" id="'+List[i] +'"> ' + List[i] + '</button>';

//    $('.GenderContainer').append(elements);


//    var List = [];
//    var elements = '<button class="Filterbtn" id="all"> All</button>';
//    for (var i = 0; i < ds.length; i++) {
//        if (List.length == 0)
//            List.push(ds[i].Color);
//        else
//            if (List.indexOf(ds[i].Color) == -1)
//                List.push(ds[i].Color);
//    }
//    for (var i = 0; i < List.length; i++)
//        if (List[i] == 'White')
//            elements += ' <button class="Filterbtn ColorBtn"  style="color: transparent;" id="' + List[i] + '">NULL</button>';
//        else
//            elements += ' <button class="Filterbtn ColorBtn"  style="color: transparent;background-color:' + List[i] + ' !important;" id="' + List[i] + '">NULL</button>';
        
            
//    $('.ColorContainer').append(elements);

    
//    //End Filter

//    //Begin populating products

//    for (var i = 0; i < ds.length; i++) {
//        $('#parent').empty();
//        elements = '';
//        for (var i = 0; i < ds.length; i++) {
//            elements += '<div class="box col-md-3 featured-responsive ' + ds[i].Color + ' ' + ds[i].Gender + '" style="padding-bottom: 50px;">';
//            elements += '<div class="featured-place-wrap ">';
//            elements += '<img src="' + ds[i].ImageURL + ds[i].Gender + '/' + ds[i].Productname + '.jpg"class="img-fluid" alt="#">';
//            if (ds[i].Discount > 0)
//                elements += '<span class="featured-rating-red">' + ds[i].Discount + '%</span>';
//            else
//                elements += '<span class="featured-rating-white" >NULL</span>';
//            elements += '<div class="featured-title-box">';
//            elements += '<h6>' + ds[i].Productname + '</h6>';
//            elements += '<div class="row ProductInfo">';

//            elements += '<div class="col-lg-3 AttributeHeader">Description</div>';
//            elements += '<div class="col-lg-9">' + ds[i].Description + '</div>';
//            elements += '<div class="col-lg-3 AttributeHeader">Color</div>';
//            elements += '<div class="col-lg-9 ">' + ds[i].Color + '</div>';
//            elements += '<div class="col-lg-3 AttributeHeader">Size</div>';
//            elements += '<div class="col-lg-9 ">' + ds[i].Size + '</div>';
//            elements += '<div class="col-lg-3 AttributeHeader">Price</div>';
//            elements += '<div class="col-lg-9 ">';
//            if (ds[i].Discount > 0)
//                elements += '<i id="ordPrice"> Ord.' + ds[i].Price + '   </i>Disc.' + (ds[i].Price * (1 - (ds[i].Discount / 100))).toFixed(2);
//            else
//                elements += ds[i].Price;
//            elements += '</div>';

//            elements += '<div class="col-lg-3 AttributeHeader">Rating</div>';
//            elements += '<div class="col-lg-9 Rating" id="' + ds[i].ProductIdentity + '-Rating" ></div>';
//            elements += '<button class="RateBtn" type="button" id="Button-' + ds[i].ProductIdentity + '"onClick="SetVote(this)" > </button>';
//            //<div onClick="SetVote(this)" class="' + ds[i].ProductIdentity + '-Rating"></div>
//            elements += '</div>';
//            elements += '<button type="button" id="' + ds[i].ProductIdentity + '"  onClick="Order(this)" class="btn btn-primary"> Order</button>';
//            elements += '</div> ';
//            elements += '</div>';
//            elements += '</div>';

//        }
//        $('#parent').append(elements);

//        var $btns = $('.Filterbtn').click(function () {
//            if (this.id == 'all') {
//                $('#parent > div').fadeIn(450);
//            } else {
//                var $el = $('.' + this.id).fadeIn(450);
//                $('#parent > div').not($el).hide();
//            }
//            $btns.removeClass('active');
//            $(this).addClass('active');
//        });
//    }
//    $(".Rating").jqxRating({ width: 150, height: 35, value :0});
      
//        for (var i =0;i<ds.length;i++)
//            $('#' + ds[i].ProductIdentity + '-Rating').jqxRating('setValue', ds[i].Score);      
       
     
   
//}


//function SetVote(object) {
//    if (Customer.CustomerIdentity != null) {
//        var value = $('#' + object.id.substr(object.id.indexOf('-')+1,object.id.length)+'-Rating').jqxRating('getValue');
//        if (value == null)
//            value = 0;
//        alert("The value is " + value);
//        ConnecToDatebase('SetRating',
//            {
//                CustomerIdentity: Customer.CustomerIdentity,
//                ProductIdentity: object.id.substr(object.id.indexOf('-') + 1, object.id.length),
//                Score: value
//            });
//    }
//    else
//        alert('Only logged in customers may vote on our products');
//}



//function PopulateOrders(OrderList)
//{
//    orderrows =  [];
//    for (var i = 0; i < OrderList.length; i++) {
//        var Orderrow = {};
//        Orderrow = {
//            OrderIdentity: OrderList[i].OrderIdentity,
//            ProductIdentity: OrderList[i].ProductIdentity,
//            Quantity: OrderList[i].Quantity,
//            Productname: OrderList[i].Productname,
//            Price: OrderList[i].Price,
//            Discount: OrderList[i].Discount,
//            CustomerIdentity: OrderList[i].CustomerIdentity,
//            StatusIdentity: OrderList[i].StatusIdentity

//        };
//        orderrows.push(Orderrow);
//    }
//    sumOrders();
//}


//function Order(t) {
//    var FlagExisting = 0;
//    //If existing row, increase quantity.
//    for (var k = 0; k < orderrows.length; k++)
//    {
//        if (orderrows[k].ProductIdentity == t.id) {
//            orderrows[k].Quantity = orderrows[k].Quantity + 1;
//            orderrows[k].OrderIdentity = OrderIdentity;
//            FlagExisting = 1;
//        }
//    }

//    //if new row add to list.
//    if (FlagExisting == 0)
//        for (var i = 0; i < ProductList.length; i++)
//            if (ProductList[i].ProductIdentity == t.id) {// alert(menu[i].Price + ' Meal name: ' + menu[i].Name);
//                var Orderrow = {};
//                Orderrow = {
//                    OrderIdentity: OrderIdentity,
//                    ProductIdentity: t.id,
//                    Quantity: 1,
//                    Productname: ProductList[i].Productname,
//                    Price: ProductList[i].Price  ,
//                    Discount: ProductList[i].Discount,
//                    CustomerIdentity: Customer.CustomerIdentity,
//                    StatusIdentity: 1,
//                    RowIdentity: (i + 1)
//                };
//                orderrows.push(Orderrow);
//            }
//    sumOrders();
//}



//function DeleteLine(t) {
//    for (var k = 0; k < orderrows.length; k++)
//        if (orderrows[k].ProductIdentity  == t.id) {
//            if (orderrows[k].Quantity > 1)
//                orderrows[k].Quantity = orderrows[k].Quantity - 1;
//            else
//                orderrows.splice(k, 1);
//        }

//    sumOrders();

//}


//function sumOrders() {
//    var sumQuantity = 0;
//    var sumPrice = 0;
//    $('#OrderContainer, #TotalPrice').empty();
//    for (var i = 0; i < orderrows.length; i++)
//    {
//        var element = '';
//        sumQuantity = sumQuantity + Number(orderrows[i].Quantity);
//        sumPrice = sumPrice + (Number(orderrows[i].Price * (1 - (orderrows[i].Discount / 100))) * Number(orderrows[i].Quantity));
//        element += '<div class"orderrow" style=" height: 30px !important;"> <div class="col-lg-7" >' + orderrows[i].Productname + '</div>';
//        element += '<div class="col-lg-2">' + Number(orderrows[i].Price * (1 - (orderrows[i].Discount / 100))) + ' SEK </div>';
//        element += '<div class="col-lg-2">' + orderrows[i].Quantity + ' Units </div>';
//        element += '<div class="col-xs-1 closeContainer"><a onClick="DeleteLine(this)" id="' + orderrows[i].ProductIdentity  + '"   class="close">&times;</a></div></div>';
//        $('#OrderContainer').append(element);
//    }

//    $('#TotalPrice')[0].innerText = 'Totalt: ' + sumPrice + ':-';
//    $('#Quantity')[0].innerText = sumQuantity;

//    if (OrderIdentity == null)
//        ConnecToDatebase('CreateOrder', orderrows[0]);
//    else 
//        ConnecToDatebase('UpdateOrder', orderrows);

//} 
 
   

 




