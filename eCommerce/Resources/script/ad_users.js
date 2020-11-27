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

    //            //Load Users into the page
    //
            ConnecToDatebase('GetUsers', {});

    
           
});

function SetUser(UserData) {
    $('#Customername')[0].innerText = UserData.Customername;
    Customer.CustomerIdentity = UserData.CustomerIdentity;

}

function GetUser(ds) {
    var source =
        {
            localdata: ds,
            datafields: [
                { name: 'UserIdentity', type: 'string' },
                { name: 'Username', type: 'string'},
                { name: 'Password', type: 'string'},
                { name: 'Customername', type: 'string' },
                { name: 'Epost', type: 'string' },
                { name: 'SSN', type: 'string'},
                { name: 'Deliveryaddress', type: 'string'},
                { name: 'Billingaddress', type: 'string'}
            ],
            datatype: "array", 
            addrow: function (rowid, rowdata, position, commit) {
                // synchronize with the server - send insert command
                // call commit with parameter true if the synchronization with the server was successful. 
                // and with parameter false if the synchronization has failed.
                // you can pass additional argument to the commit callback which represents the new ID if it is generated from a Database. Example: commit(true, idInDB) where "idInDB" is the row's ID in the Database.
                if (rowdata.UserName.length > 0) {

                    ConnecToDatebase('AddUser', rowdata);
                    commit(true);
                                 
                }
                else
                    return false;
            },
            updaterow: function (rowid, rowdata, commit) {
                // synchronize with the server - send update command
                // call commit with parameter true if the synchronization with the server was successful 
                // and with parameter false if the synchronization has failed.
                          
                if (rowdata.UserIdentity.length > 0) { 
                    ConnecToDatebase('UpdateUser', rowdata);
                    commit(true); 
                }
                else
                    return false;
            },
            deleterow: function (rowid, rowdata, commit) {
                // synchronize with the server - send delete command
                // call commit with parameter true if the synchronization with the server was successful 
                // and with parameter false if the synchronization has failed.
                        
                if (rowdata.UserIdentity.length > 0) {
                    ConnecToDatebase('DeleteUser', rowdata);
                    commit(true);
                }
                else
                    return false;
            }
        };

    var dataAdapter = new $.jqx.dataAdapter(source);

    $("#UsersGrid").jqxGrid(
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
          { text: 'ID', datafield: 'UserIdentity', width: '5%' },
          { text: 'Username', datafield: 'Username', width: '7%' },
          { text: 'Password', datafield: 'Password', width: '7%' },
          { text: 'Customername', datafield: 'Customername', width: '10%' },
          { text: 'SSN', datafield: 'SSN', width: '10%' },
          { text: 'Epost', datafield: 'Epost', width: '18%' },
          { text: 'Deliveryaddress', datafield: 'Deliveryaddress', width: '20%' },
          { text: 'Billingaddress', datafield: 'Billingaddress', width: '20%' },
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
                if (method == 'GetUsers')
                    GetUser(response);
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


   

 



