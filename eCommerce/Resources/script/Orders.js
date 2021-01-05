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

function SetUser(UserData) {
    $('#Customername')[0].innerText = UserData.Customername;
    Customer.CustomerIdentity = UserData.CustomerIdentity;
    if (UserData.TypeIdentity == 1)
        $('.adminSites').show();

    ConnecToDatebase('GetCurrentOrders', { CustomerIdentity: Customer.CustomerIdentity });
}

function ShowOrders(ds) {
    var source =
        {
            localdata: ds,
            datafields: [
             
                { name: 'ParentOrderIdentity', type: 'number' },
                { name: 'OrderIdentity', type: 'number' },
                { name: 'RowIdentity', type: 'number' },
                { name: 'ProductIdentity', type: 'string'},
                { name: 'Productname', type: 'string' },
                { name: 'Description', type: 'string' },
                { name: 'StatusDescription', type: 'string' },
                { name: 'Price', type: 'string' },
                { name: 'Discount', type: 'string'},
                { name: 'Quantity', type: 'string'}, 
                { name: 'InsertDate', type: 'string'},              
            ],
            datatype: "array"
            ,
            hierarchy:
            {
                keyDataField: { name: 'RowIdentity' },
                parentDataField: { name: 'ParentOrderIdentity' }
            },
            id: 'RowIdentity'
};
var dataAdapter = new $.jqx.dataAdapter(source);
    // create Tree Grid 

$("#OrdersGrid").jqxTreeGrid(
    {
        width: '95%', 
        theme: 'material',
        source: dataAdapter, 
        editable: false,
        columns: [
           { text: 'OrderIdentity', dataField: 'OrderIdentity', width: '7%' },
      { text: 'Row', dataField: 'RowIdentity', width: '7%' },
      { text: 'Product ID', dataField: 'ProductIdentity', width: '7%' },
      { text: 'Product Name', dataField: 'Productname', width: '10%' },
      { text: 'Description', dataField: 'Description', width: '31%' },
      { text: 'Order Status', dataField: 'StatusDescription', cellsFormat: 'd', width: '7%' },
      { text: 'Price', dataField: 'Price', cellsFormat: 'd', width: '7%' },
      { text: 'Discount', dataField: 'Discount', cellsFormat: 'd', width: '7%' },
      { text: 'Quantity', dataField: 'Quantity', cellsFormat: 'd', width: '7%' },
      { text: 'Added', dataField: 'InsertDate', cellsFormat: 'd', width: '10%' }
         
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
                if (response[0].ErrorStatus == 0) {
                    if (method == 'GetCurrentOrders')
                        ShowOrders(response);
                    else if (method == 'GetLogin') {
                        SetUser(response[0]);
                        if (UserCookie == null) {
                            obj.TypeIdentity = response[0].TypeIdentity;
                            obj.CustomerIdentity = response[0].CustomerIdentity;
                            Cookies.set('User', JSON.stringify(obj));
                            UserData = obj;
                        }
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


   

 




