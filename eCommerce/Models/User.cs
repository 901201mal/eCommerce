using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eCommerce
{
    public class User
    {
        public string Customername { get; set; }

        public string SSN { get; set; }

        public string DeliveryAddress { get; set; }

        public string BillingAddress { get; set; }

        public string Epost { get; set; }

        public string Username { get; set; }
         
        public string Password { get; set; }

        public string UserIdentity { get; set; }


        public User CreateUser(string Username, string Password)
        {
            User user = new User();
            user.Username = Username;
            user.Password = Password;
   
            return user;
        }
    }


   
}