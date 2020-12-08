//All script regarding index page.
//<script type="text/javascript">
var obj = null;
var uri = 'api/data/';
var ProductList= [];
var orderrows = [];
var OrderIdentity ;
var Customer = { CustomerIdentity: null };

$(document).ready(function () {
            $('.adminSites').hide();
    //Create Shopping cart modal
            $("#MyOrders").click(function () {
                $("#OrderModal").modal("toggle");
            });

    // Read the cookie
            var UserCookie = Cookies.get('Customer');
            if (UserCookie != null) {
               var  UserData = JSON.parse(UserCookie);
                SetUser(UserData);
            }


            $("#myLogin").click(function () {
                if (Customer.CustomerIdentity == null)
                    $("#LoginModal").modal("toggle");
                else
                    $("#LogoutModal").modal("toggle");
            });
           
});
function Logout() {
    Cookies.remove('Customer');
    location.reload();
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
  
function SetUser(UserData) {
    $('#Customername')[0].innerText = UserData.Customername;
    Customer.CustomerIdentity = UserData.CustomerIdentity;
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
                    if (method == 'GetLogin') {
                        SetUser(response[0]);
                        // Set a cookie
                        Cookies.set('Customer', JSON.stringify(response[0]));
                    }
                    else if (method == 'SetLogin') {
                        SetUser(response[0]);

                        // Set a cookie
                        Cookies.set('Customer', JSON.stringify(response[0]));
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


   

 




