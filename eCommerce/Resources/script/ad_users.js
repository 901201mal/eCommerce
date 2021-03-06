﻿//All script regarding index page.
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
    ConnecToDatebase('GetUsers', {});

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
            //addrow: function (rowid, rowdata, position, commit) {
            //   if (rowdata.UserName.length > 0) {
            //        ConnecToDatebase('AddUser', rowdata);
            //        commit(true);            
            //    }
            //    else
            //        return false;
            //},
            updaterow: function (rowid, rowdata, commit) {
                if (rowdata.UserIdentity.length > 0) { 
                    ConnecToDatebase('UpdateUser', rowdata);
                    commit(true); 
                }
                else
                    return false;
            },
            deleterow: function (rowid, rowdata, commit) {
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
        autoHeight: true,
        //theme: 'material',
        source: dataAdapter,
        filterable: true, 
        showeverpresentrow: true,
        everpresentrowposition: "top",
        everpresentrowactions: "update remove reset",
        editable: false,
        columns: [
          { text: 'ID', datafield: 'UserIdentity', width: '5%' },
          { text: 'Username', datafield: 'Username', width: '7%' },
          { text: 'Password', datafield: 'Password', width: '7%' },
          { text: 'Customername', datafield: 'Customername', width: '10%' },
          { text: 'SSN', datafield: 'SSN', width: '10%' },
          { text: 'Epost', datafield: 'Epost', width: '18%' },
          { text: 'Deliveryaddress', datafield: 'Deliveryaddress', width: '20%' },
          { text: 'Billingaddress', datafield: 'Billingaddress', width: '20%' }//,
      //        {  
      //            text: '', width: '3%', datafield: 'Edit', editable: false, cellsalign: 'center', columntype: 'button', cellsrenderer: function () {
      //          return " <img id='deleteimg' src='Resources/images/delete.png' />";
                               
      //      }, buttonclick: function (row) {
      //          // open the popup window when the user clicks a button.
      //          editrow = row;
      //          $("#UsersGrid").jqxGrid('deleterow', row);
                               
      //      }
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
                    if (method == 'GetUsers')
                        GetUser(response);
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


   

 




