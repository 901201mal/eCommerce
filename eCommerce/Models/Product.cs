using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eCommerce
{
    public class Product
    {
         
        public string ProductIdentity { get; set; }
        
        public string Productname { get; set; }
        
        public string Price { get; set; }
        
        public string Discount { get; set; }

        public string Color { get; set; }
        
        public string Size { get; set; }

        public string ImageURL { get; set; }

        public string Gender { get; set; }
         
        public string Description { get; set; }

   
        
        public Product product(string ProductIdentity, string Productname, string Price, string Discount, string Color, string Size, string ImageURL, string Gender, string Description)
        {
            Product product = new Product(); 
            product.ProductIdentity = ProductIdentity;
            product.Productname = Productname;
            product.Price = Price;
            product.Discount = Discount;
            product.Color = Color;
            product.Size = Size;
            product.ImageURL = ImageURL;
            product.Gender = Gender;
            product.Description = Description;

            return product;
        }
    }


   
}