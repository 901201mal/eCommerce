using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eCommerce
{
    public class OrderRow
    {

        public string OrderIdentity { get; set; }
        public string ProductIdentity { get; set; }
        
        public string Productname { get; set; }
        
        public string Price { get; set; }
        
        public string Discount { get; set; }

        public string Color { get; set; }

        
        public string Size { get; set; }

        public string ImageURL { get; set; }

        public string Gender { get; set; }

        public string CustomerIdentity { get; set; }

        public string StatusIdentity { get; set; }

        public string RowIdentity { get; set; }

        public string Quantity { get; set; }

        public string Score { get; set; }
        
        public OrderRow CreateShoe(string OrderIdentity, string ProductIdentity, string Productname, string Price, string Discount)//, string Color, string Size, string ImageURL, string Gender)
        {
            OrderRow row = new OrderRow();
            row.OrderIdentity = OrderIdentity;
            row.ProductIdentity = ProductIdentity;
            row.Productname = Productname;
            row.Price = Price;
            row.Discount = Discount;
            //shoe.Color = Color;
            //shoe.Size = Size;
            //shoe.ImageURL = ImageURL;
            //shoe.Gender = Gender;


            return row;
        }
    }


   
}