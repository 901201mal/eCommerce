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
    ConnecToDatebase('GetOrderRows', {});

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
}

function GetOrders(ds) {
    var source =
        {
            localdata: ds,
            datafields: [
                { name: 'OrderIdentity', type: 'string' },
                { name: 'StatusIdentity', type: 'string' },
                { name: 'StatusDescription', type: 'string' },
                { name: 'RowIdentity', type: 'string'},
                { name: 'ProductIdentity', type: 'string'},
                { name: 'Productname', type: 'string' },
                { name: 'Price', type: 'string' },
                { name: 'Discount', type: 'string'},
                { name: 'Quantity', type: 'string'}  
            ],
            datatype: "array", 
            //addrow: function (rowid, rowdata, position, commit) {
            //   if (rowdata.UserName.length > 0) {
            //        ConnecToDatebase('AddUser', rowdata);
            //        commit(true);            
            //    }
            //    else
            //        return false;
            //},
            updaterow: function (rowid, rowdata, commit) {
                if (rowdata.RowIdentity.length > 0) {
                    ConnecToDatebase('UpdateOrderRow', rowdata);
                    commit(true); 
                }
                else
                    return false;
            },
            deleterow: function (rowid, rowdata, commit) {
                if (rowdata.RowIdentity.length > 0) {
                    ConnecToDatebase('DeleteOrderRow', rowdata);
                    commit(true);
                }
                else
                    return false;
            }
        };

    var dataAdapter = new $.jqx.dataAdapter(source);

    $("#OrdersGrid").jqxGrid(
    {
        width: '100%',
        autoHeight: true,
       // theme: 'material',
        source: dataAdapter,
        filterable: true, 
        showeverpresentrow: true,
        everpresentrowposition: "top",
        everpresentrowactions: "update remove reset",
        editable: false,
        columns: [
          { text: 'Order', datafield: 'OrderIdentity', width: '10%' },
          { text: 'Row', datafield: 'RowIdentity', width: '10%' },
          { text: 'Status', datafield: 'StatusIdentity', width: '10%' },
          { text: 'Description', datafield: 'StatusDescription', width: '10%' },
          { text: 'ProductNr', datafield: 'ProductIdentity', width: '10%' },
          { text: 'Product', datafield: 'Productname', width: '20%' },
          { text: 'Price', datafield: 'Price', width: '10%' },
          { text: 'Discount', datafield: 'Discount', width: '10%' },
          { text: 'Quantity', datafield: 'Quantity', width: '10%' }//,
          //{ text: '', width: '3%', datafield: 'Edit', editable: false, cellsalign: 'center', columntype: 'button', cellsrenderer: 
          //    function ()
          //    {
          //        return " <img id='deleteimg' src='Resources/images/delete.png' />";
          //    }, buttonclick: function (row)
          //    {
          //  // open the popup window when the user clicks a button.
          //  editrow = row;
          //  $("#OrdersGrid").jqxGrid('deleterow', row);
          //  }
          //}
       
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
                    if (method == 'GetOrderRows')
                        GetOrders(response);
                    else if (method == 'GetLogin') {
                        SetUser(response[0]);
                        if (UserCookie == null)
                            Cookies.set('User', JSON.stringify(obj));
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


   

 




