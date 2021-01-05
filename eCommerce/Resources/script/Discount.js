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
    //Load Products into the page
    ConnecToDatebase('GetDiscountedProducts', {});
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

function checkout() {
    if (Customer.CustomerIdentity == null)
        $("#LoginModal").modal("toggle");
    else
        ConnecToDatebase('ConfirmOrder', { OrderIdentity: OrderIdentity, CustomerIdentity: UserData.CustomerIdentity });
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
  
function GetProduct(ds) {

    ProductList = ds;

    //Initiate filter
    $('.ColorContainer .GenderContainer').empty();
    var List = [];
    var elements = '';
    for (var i = 0; i < ds.length; i++) {
        if (List.length == 0)
            List.push(ds[i].Gender);
        else
            if (List.indexOf(ds[i].Gender) == -1)
                List.push(ds[i].Gender);
    }
    for (var i = 0; i<List.length; i++) 
        elements += ' <button class="Filterbtn GenderBtn" id="'+List[i] +'"> ' + List[i] + '</button>';

    $('.GenderContainer').append(elements);


    var List = [];
    var elements = '<button class="Filterbtn" id="all"> All</button>';
    for (var i = 0; i < ds.length; i++) {
        if (List.length == 0)
            List.push(ds[i].Color);
        else
            if (List.indexOf(ds[i].Color) == -1)
                List.push(ds[i].Color);
    }
    for (var i = 0; i < List.length; i++)
        if (List[i] == 'White')
            elements += ' <button class="Filterbtn ColorBtn"  style="color: transparent;" id="' + List[i] + '">NULL</button>';
        else
            elements += ' <button class="Filterbtn ColorBtn"  style="color: transparent;background-color:' + List[i] + ' !important;" id="' + List[i] + '">NULL</button>';
        
            
    $('.ColorContainer').append(elements);

    
    //End Filter

    //Begin populating products

    for (var i = 0; i < ds.length; i++) {
        $('#parent').empty();
        elements = '';
        for (var i = 0; i < ds.length; i++) {
            elements += '<div class="box col-md-3 featured-responsive ' + ds[i].Color + ' ' + ds[i].Gender + '" style="padding-bottom: 50px;">';
            elements += '<div class="featured-place-wrap ">';
            elements += '<img src="' + ds[i].ImageURL + ds[i].Gender + '/' + ds[i].Productname + '.jpg"class="img-fluid" alt="#">';
            if (ds[i].Discount > 0)
                elements += '<span class="featured-rating-red">' + ds[i].Discount + '%</span>';
            else
                elements += '<span class="featured-rating-white" >NULL</span>';
            elements += '<div class="featured-title-box">';
            elements += '<h6>' + ds[i].Productname + '</h6>';
            elements += '<div class="row ProductInfo">';

            elements += '<div class="col-lg-3 AttributeHeader">Description</div>';
            elements += '<div class="col-lg-9">' + ds[i].Description + '</div>';
            elements += '<div class="col-lg-2 AttributeHeader" ><b>Color</b></div>';
            elements += '<div class="col-lg-5 ">' + ds[i].Color + '</div>';
            elements += '<div class="col-lg-2 AttributeHeader">Size</div>';
            elements += '<div class="col-lg-3 ">' + ds[i].Size + '</div>';
            elements += '<div class="col-lg-2 AttributeHeader">Price</div>';
            elements += '<div class="col-lg-5 ">';
            if (ds[i].Discount > 0)
                elements += '<i id="ordPrice"> Ord.' + ds[i].Price + '   </i>Disc.' + (ds[i].Price * (1 - (ds[i].Discount / 100))).toFixed(2);
            else
                elements += ds[i].Price;
            elements += '</div>';
            elements += '<div class="col-lg-3 AttributeHeader">Comments</div>';
            elements += '<div class="col-lg-2 "><img  onClick="GetComments(this)" style="width: 15px;height: 15px;" src="Resources/images/Comment.png" id="Comment-' + ds[i].ProductIdentity + '"/></div>';
            elements += '<div class="col-lg-2 AttributeHeader">Rating</div>';
            elements += '<div class="col-lg-4 Rating" id="' + ds[i].ProductIdentity + '-Rating" ></div>';
            elements += '<button class="RateBtn" type="button" id="Button-' + ds[i].ProductIdentity + '"onClick="SetVote(this)" > </button>';
            //<div onClick="SetVote(this)" class="' + ds[i].ProductIdentity + '-Rating"></div>
            elements += '</div>';
            elements += '<button type="button" id="' + ds[i].ProductIdentity + '"  onClick="Order(this)" class="btn btn-primary"> Order</button>';
            elements += '</div> ';
            elements += '</div>';
            elements += '</div>';

        }
        $('#parent').append(elements);

        var $btns = $('.Filterbtn').click(function () {
            if (this.id == 'all') {
                $('#parent > div').fadeIn(450);
            } else {
                var $el = $('.' + this.id).fadeIn(450);
                $('#parent > div').not($el).hide();
            }
            $btns.removeClass('active');
            $(this).addClass('active');
        });
    }
    $(".Rating").jqxRating({ width: 150, height: 35, value :0});
      
    for (var i = 0; i < ds.length; i++)
        $('#' + ds[i].ProductIdentity + '-Rating').jqxRating('setValue', ds[i].Score);
       
     
   
}

function GetComments(object) {

    var Identity = object.id.substr(object.id.indexOf('-') + 1, object.id.length);
    for (var i = 0; i < ProductList.length; i++)
        if (ProductList[i].ProductIdentity == Identity)
            $('#ProductName').text(ProductList[i].Productname);

    ConnecToDatebase('GetComments', { ProductIdentity: Identity });
    //   alert('comments for ' + object.id.substr(object.id.indexOf('-') + 1, object.id.length));
}

function ShowComments(ds) {
    if (ds[0].NoData == 0)
        alert('There are no comments to show!')
    else {
        $("#CommentsModal").modal("toggle");

        $("#CommentsGrid").jqxGrid(
       {
           width: '100%',
           height: 400,
           theme: 'light',

           scrollbarsize: 10,
           filterable: true,
           editable: false,
           columns: [
             { text: 'Name', datafield: 'Customername', width: '20%' },
             { text: 'Score', datafield: 'Score', width: '10%' },
             { text: 'Date', datafield: 'InsertDate', width: '10%' },
             { text: 'Comment', datafield: 'Comments', width: '55%' }
           ]
       });

        $('#CommentsGrid').jqxGrid('clear');
        var source =
           {
               localdata: ds,
               datafields: [
                   { name: 'Customername', type: 'string' },
                   { name: 'Score', type: 'string' },
                   { name: 'InsertDate', type: 'string' },
                   { name: 'Comments', type: 'string' }
               ],
               datatype: "array"
           };

        var dataAdapter = new $.jqx.dataAdapter(source);

        $("#CommentsGrid").jqxGrid({
            source: dataAdapter
        });
    }
}

function SetVote(object) {
    $("#CommentsInputModal").modal("toggle");
    $('#jqxTextArea').jqxTextArea({ placeHolder: 'Please give us your opinion!', height: 200, width: '100%', minLength: 1 });

}

function CompleteVote(object) {
    if (Customer.CustomerIdentity != null) {
        var value = $('#' + object.id.substr(object.id.indexOf('-') + 1, object.id.length) + '-Rating').jqxRating('getValue');
        if (value == null)
            value = 0;

        ConnecToDatebase('SetRating',
            {
                CustomerIdentity: Customer.CustomerIdentity,
                ProductIdentity: object.id.substr(object.id.indexOf('-') + 1, object.id.length),
                Score: value,
                Comments: $('#InputComments').jqxTextArea('val')
            });
    }
    else
        alert('Only logged in customers may vote on our products');
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
                if (response[0].ErrorStatus == 0) {
                    if (method == 'GetDiscountedProducts')
                        GetProduct(response);
                    else if ((method == 'GetOrders' && response[0].NoData == 1) || method == 'SetOrder') {
                        OrderIdentity = response[0].OrderIdentity;
                        PopulateOrders(response);
                    }
                    else if (method == 'GetComments') {
                        ShowComments(response);
                    }
                    else if (method == 'UpdateOrder') {
                        //DoSomething// var s = '';
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
                        UserData = response[0];
                        // Set a cookie
                        Cookies.set('User', JSON.stringify(response[0]));
                    }
                    else if (method == 'ConfirmOrder') {
                        alert('Order Confirmed!');
                        location.reload();
                        //   ConnecToDatebase('GetOrders', { CustomerIdentity: obj.CustomerIdentity });
                        // Set a cookie

                    }
                    else if (method == 'SetRating') {
                        alert('Rate registered!');

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

function PopulateOrders(OrderList)
{
    orderrows =  [];
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
            for (var i = 0; i < ProductList.length; i++) {
                if (orderrows[k].ProductIdentity == ProductList[i].ProductIdentity)
                    if (orderrows[k].Quantity < ProductList[i].Stock) {
                        orderrows[k].Quantity = orderrows[k].Quantity + 1;
                        orderrows[k].OrderIdentity = OrderIdentity;

                    }
                    else if (orderrows[k].Quantity == ProductList[i].Stock)
                        alert('Out of stock!')
                FlagExisting = 1;
            }
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
                    Price: ProductList[i].Price  ,
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
 
   

 




