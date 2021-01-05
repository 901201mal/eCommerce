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
            ConnecToDatebase('GetProducts', {});

    
           
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
        autoHeight: true,
        //theme: 'material',
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
          { text: 'Image URL', datafield: 'ImageURL', width: '30%' }//,
        //  { text: 'Score', datafield: 'Score', width: '5%' },
        // // {
        //      text: '', width: '3%', datafield: 'Edit', editable: false, cellsalign: 'center', columntype: 'button', cellsrenderer: function () {
        //    return " <img id='deleteimg' src='Resources/images/delete.png' />";
                               
        //}, buttonclick: function (row) {
        //    // open the popup window when the user clicks a button.
        //    editrow = row;
        //    $("#ProductsGrid").jqxGrid('deleterow', row);
                               
        //}
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
                    if (method == 'GetProducts')
                        GetProduct(response);
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
