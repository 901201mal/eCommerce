//All script regarding index page.
//<script type="text/javascript">
var obj = null;
var uri = 'api/data/';
var ProductList= [];
var orderrows = [];
var OrderIdentity ;
var Customer = { CustomerIdentity: null };

var UserCookie = null;
var UserData = null;
$(document).ready(function () {
    $('.adminSites').hide();
    //Create Shopping cart modal
    $("#MyOrders").click(function () {
        $("#OrderModal").modal("toggle");
    });

    // Read the cookie
    UserCookie = Cookies.get('User');
            if (UserCookie != null) {
                UserData = JSON.parse(UserCookie);
                ConnecToDatebase('GetLogin', UserData);
            }


            $("#myLogin").click(function () {
                if (UserData == null)
                    $("#LoginModal").modal("toggle");
                else
                    $("#LogoutModal").modal("toggle");
            });
           
});
function Logout() {
    Cookies.remove('User');
    document.location.href = "Index.html";
}


function ExistingUser()
{
        $("#ExistingUserModal").modal("toggle");
}
function NewUser()
{
        $("#NewUserModal").modal("toggle");
}


function RegisterUser() {

    var UserObject =
        {
        Customername: $('#InputName').val(),
        SSN: $('#InputSSN').val(),
        DeliveryAddress: $('#InputDeliveryAddress').val(),
        BillingAddress: $('#InputBillingAddress').val(),
        Epost: $('#InputEpost').val(),
        Username: $('#InpUsername').val(),
        Password: $('#InpPassword').val()  
    };

    ConnecToDatebase('SetLogin', UserObject)

}

function Login() {
    var User = {
        Username: $('#InputUsername').val(),
        Password: $('#InputPassword').val()
    }
    ConnecToDatebase('GetLogin', User)
}
function checkout() {
    if (Customer.CustomerIdentity == null)
        $("#LoginModal").modal("toggle");
    else
        ConnecToDatebase('ConfirmOrder', { OrderIdentity: OrderIdentity, CustomerIdentity: UserData.CustomerIdentity });
}

function SetUser(UserData) {
    $('#Customername')[0].innerText = UserData.Customername;
    Customer.CustomerIdentity = UserData.CustomerIdentity;
    //    //ConnecToDatebase('GetOrders', { CustomerIdentity: Customer.CustomerIdentity });
    if (UserData.TypeIdentity == 1)
        $('.adminSites').show();

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
                if (response[0].ErrorStatus == 0 ) {
                    if (method == 'GetDiscountedProducts')
                        GetProduct(response);
                    else if ((method == 'GetOrders' && response[0].NoData == 1) || method == 'SetOrder') {
                        OrderIdentity = response[0].OrderIdentity;
                        PopulateOrders(response);
                    }
               
                 
                    else if (method == 'GetLogin') {
                        SetUser(response[0]);    
                        if (UserCookie == null) {
                            obj.TypeIdentity = response[0].TypeIdentity;
                            Cookies.set('User', JSON.stringify(obj));
                            UserData = obj;
                        }
                        if (response[0].TypeIdentity != 1)
                            ConnecToDatebase('GetOrders', { CustomerIdentity: response[0].CustomerIdentity });
                
                    }
                    else if (method == 'SetLogin') {
                        SetUser(response[0]);
                        // Set a cookie
                        Cookies.set('User', JSON.stringify(response[0]));
                    }
                    else if (method == 'ConfirmOrder') {
                        alert('Order Confirmed!');
                        location.reload();
                        //   ConnecToDatebase('GetOrders', { CustomerIdentity: obj.CustomerIdentity });
                        // Set a cookie

                    }
                }
                else {
                    alert('Error occured \n ErrorCode: ' + response[0].ErrorCode + ' \n Description: ' + response[0].Message);
                }
            }
        },
        error: function (xhr, error) {
            var s = "";
        },
    });

}


function PopulateOrders(OrderList) {
    orderrows = [];
    for (var i = 0; i < OrderList.length; i++) {
        var Orderrow = {};
        Orderrow = {
            OrderIdentity: OrderList[i].OrderIdentity,
            ProductIdentity: OrderList[i].ProductIdentity,
            Quantity: OrderList[i].Quantity,
            Productname: OrderList[i].Productname,
            Price: OrderList[i].Price,
            Discount: OrderList[i].Discount,
            CustomerIdentity: OrderList[i].CustomerIdentity,
            StatusIdentity: OrderList[i].StatusIdentity

        };
        orderrows.push(Orderrow);
    }
    sumOrders();
}


function Order(t) {
    var FlagExisting = 0;
    //If existing row, increase quantity.
    for (var k = 0; k < orderrows.length; k++) {
        if (orderrows[k].ProductIdentity == t.id) {
            orderrows[k].Quantity = orderrows[k].Quantity + 1;
            orderrows[k].OrderIdentity = OrderIdentity;
            FlagExisting = 1;
        }
    }

    //if new row add to list.
    if (FlagExisting == 0)
        for (var i = 0; i < ProductList.length; i++)
            if (ProductList[i].ProductIdentity == t.id) {// alert(menu[i].Price + ' Meal name: ' + menu[i].Name);
                var Orderrow = {};
                Orderrow = {
                    OrderIdentity: OrderIdentity,
                    ProductIdentity: t.id,
                    Quantity: 1,
                    Productname: ProductList[i].Productname,
                    Price: ProductList[i].Price,
                    Discount: ProductList[i].Discount,
                    CustomerIdentity: Customer.CustomerIdentity,
                    StatusIdentity: 1,
                    RowIdentity: (i + 1)
                };
                orderrows.push(Orderrow);
            }
    sumOrders();
}



function DeleteLine(t) {
    for (var k = 0; k < orderrows.length; k++)
        if (orderrows[k].ProductIdentity == t.id) {

            if (orderrows[k].Quantity > 1)
                orderrows[k].Quantity = orderrows[k].Quantity - 1;
            else if (orderrows[k].Quantity == 1)
                orderrows[k].StatusIdentity = 3;
        }

    sumOrders();

}


function sumOrders() {
    var sumQuantity = 0;
    var sumPrice = 0;
    $('#OrderContainer, #TotalPrice').empty();
    for (var i = 0; i < orderrows.length; i++) {
        if (orderrows[i].StatusIdentity == 1) {
            var element = '';
            sumQuantity = sumQuantity + Number(orderrows[i].Quantity);
            sumPrice = Number(Number(sumPrice) + Number(orderrows[i].Price * (1 - (orderrows[i].Discount / 100))) * Number(orderrows[i].Quantity)).toFixed(2);
            element += '<div class"orderrow" style=" height: 30px !important;"> <div class="col-lg-7" >' + orderrows[i].Productname + '</div>';
            element += '<div class="col-lg-2">' + Number(orderrows[i].Price * (1 - (orderrows[i].Discount / 100))).toFixed(2) + ' SEK </div>';
            element += '<div class="col-lg-2">' + orderrows[i].Quantity + ' Units </div>';
            element += '<div class="col-xs-1 closeContainer"><a onClick="DeleteLine(this)" id="' + orderrows[i].ProductIdentity + '"   class="close">&times;</a></div></div>';
            $('#OrderContainer').append(element);
        }
    }

    $('#TotalPrice')[0].innerText = 'Totalt: ' + sumPrice + ':-';
    $('#Quantity')[0].innerText = sumQuantity;

    if (OrderIdentity == null)
        ConnecToDatebase('SetOrder', orderrows[0]);
    else
        ConnecToDatebase('UpdateOrder', orderrows);

}


   

 




