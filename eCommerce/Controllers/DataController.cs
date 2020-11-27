using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Xml;
using System.Data;
using System.IO;
using System.Reflection;
using System.Web;
using System.Web.Script.Serialization;
using System.ServiceModel;
using System.Runtime.Serialization;
using System.Data.SqlClient;


namespace eCommerce
{
    public class DataController : ApiController
    {
        SqlConnection nwindConn = new SqlConnection("Server=.;Database=eCommerce;Trusted_Connection=True;");

        [AcceptVerbs("GET", "POST")]
        [HttpPost]
        public IHttpActionResult GetLogin(User obj)
        {
            try
            {
                DataTable dt = new DataTable();
                nwindConn.Open();
                SqlDataAdapter Adapter = new SqlDataAdapter("EXECUTE Store.[sp_GetLogin] @Username, @Password", nwindConn);
                Adapter.SelectCommand.Parameters.AddWithValue("@Username", obj.Username);
                Adapter.SelectCommand.Parameters.AddWithValue("@Password", obj.Password);
                Adapter.SelectCommand.CommandTimeout = 30;
                Adapter.Fill(dt);
                nwindConn.Close();

                if (dt == null)
                {
                    return NotFound();
                }
                return Ok(dt);
                // return dt;

            }
            catch (Exception ex)
            {
                return NotFound(); ;
            }

        }

        [AcceptVerbs("GET", "POST")]
        [HttpPost]
        public IHttpActionResult SetLogin(User obj)
        {
            try
            {
                DataTable dt = new DataTable();
                nwindConn.Open();
                SqlDataAdapter Adapter = new SqlDataAdapter("EXECUTE Store.[sp_SetLogin] @Customername, @SSN,@DeliverAddress, @BillingAddress,@Epost ,@Username, @Password", nwindConn);
                Adapter.SelectCommand.Parameters.AddWithValue("@Customername", obj.Customername);
                Adapter.SelectCommand.Parameters.AddWithValue("@SSN", obj.SSN);
                Adapter.SelectCommand.Parameters.AddWithValue("@DeliverAddress", obj.DeliveryAddress);
                Adapter.SelectCommand.Parameters.AddWithValue("@BillingAddress", obj.BillingAddress);
                Adapter.SelectCommand.Parameters.AddWithValue("@Epost", obj.Epost);
                Adapter.SelectCommand.Parameters.AddWithValue("@Username", obj.Username);
                Adapter.SelectCommand.Parameters.AddWithValue("@Password", obj.Password);
                Adapter.SelectCommand.CommandTimeout = 30;
                Adapter.Fill(dt);
                nwindConn.Close();

                if (dt == null)
                {
                    return NotFound();
                }
                return Ok(dt);
                // return dt;

            }
            catch (Exception ex)
            {
                return NotFound(); ;
            }

        }

        [AcceptVerbs("GET", "POST")]
        [HttpPost]
        public IHttpActionResult GetUsers(User obj)
        {
            try
            {
                DataTable dt = new DataTable();
                nwindConn.Open();
                SqlDataAdapter Adapter = new SqlDataAdapter("EXECUTE Store.[sp_GetUsers]", nwindConn);
                Adapter.SelectCommand.CommandTimeout = 30;
                Adapter.Fill(dt);
                nwindConn.Close();

                if (dt == null)
                {
                    return NotFound();
                }
                return Ok(dt);
                // return dt;

            }
            catch (Exception ex)
            {
                return NotFound(); ;
            }

        }

        [AcceptVerbs("GET", "POST")]
        [HttpPost]
        public IHttpActionResult UpdateUser(User obj)
        {
            try
            {
                DataTable dt = new DataTable();
                nwindConn.Open();
                SqlDataAdapter Adapter = new SqlDataAdapter("EXECUTE Store.[sp_UpdateUser] @UserIdentity, @Customername, @SSN,@DeliverAddress, @BillingAddress,@Epost ,@Username, @Password", nwindConn);

                Adapter.SelectCommand.Parameters.AddWithValue("@UserIdentity", obj.UserIdentity);
                Adapter.SelectCommand.Parameters.AddWithValue("@Customername", obj.Customername);
                Adapter.SelectCommand.Parameters.AddWithValue("@SSN", obj.SSN);
                Adapter.SelectCommand.Parameters.AddWithValue("@DeliverAddress", obj.DeliveryAddress);
                Adapter.SelectCommand.Parameters.AddWithValue("@BillingAddress", obj.BillingAddress);
                Adapter.SelectCommand.Parameters.AddWithValue("@Epost", obj.Epost);
                Adapter.SelectCommand.Parameters.AddWithValue("@Username", obj.Username);
                Adapter.SelectCommand.Parameters.AddWithValue("@Password", obj.Password);
 
                Adapter.SelectCommand.CommandTimeout = 30;
                Adapter.Fill(dt);
                nwindConn.Close();

                if (dt == null)
                {
                    return NotFound();
                }
                return Ok(dt);
                // return dt;

            }
            catch (Exception ex)
            {
                return NotFound(); ;
            }

        }

        [AcceptVerbs("GET", "POST")]
        [HttpPost]
        public IHttpActionResult DeleteUser(User obj)
        {
            try
            {
                DataTable dt = new DataTable();
                nwindConn.Open();
                SqlDataAdapter Adapter = new SqlDataAdapter("EXECUTE Store.[sp_DeleteUser] @UserIdentity", nwindConn);
                Adapter.SelectCommand.Parameters.AddWithValue("@UserIdentity", obj.UserIdentity);

                Adapter.SelectCommand.CommandTimeout = 30;
                Adapter.Fill(dt);
                nwindConn.Close();

                if (dt == null)
                {
                    return NotFound();
                }
                return Ok(dt);
                // return dt;

            }
            catch (Exception ex)
            {
                return NotFound(); ;
            }

        }

        [AcceptVerbs("GET", "POST")]
        [HttpPost]
        public IHttpActionResult GetProducts(Empty obj)
        {
            try
            {
                DataTable dt = new DataTable();
                nwindConn.Open();
                SqlDataAdapter Adapter = new SqlDataAdapter("EXECUTE Store.[sp_getProducts]", nwindConn);
                Adapter.SelectCommand.CommandTimeout = 30;
                Adapter.Fill(dt);
                nwindConn.Close();
               
                if (dt == null)
                {
                    return NotFound();
                }
                return Ok(dt);
                // return dt;

            }
            catch (Exception ex)
            {
                return NotFound(); ;
            }

        }

        [AcceptVerbs("GET", "POST")]
        [HttpPost]
        public IHttpActionResult DeleteProduct(Product obj)
        {
            try
            {
                DataTable dt = new DataTable();
                nwindConn.Open();
                SqlDataAdapter Adapter = new SqlDataAdapter("EXECUTE Store.[sp_DeleteProduct] @ProductIdentity", nwindConn);
                Adapter.SelectCommand.Parameters.AddWithValue("@ProductIdentity", obj.ProductIdentity);
                Adapter.SelectCommand.CommandTimeout = 30;
                Adapter.Fill(dt);
                nwindConn.Close();

                if (dt == null)
                {
                    return NotFound();
                }
                return Ok(dt);
                // return dt;

            }
            catch (Exception ex)
            {
                return NotFound(); ;
            }

        }


        [AcceptVerbs("GET", "POST")]
        [HttpPost]
        public IHttpActionResult UpdateProduct(Product obj)
        {
            try
            {
                DataTable dt = new DataTable();
                nwindConn.Open();
                SqlDataAdapter Adapter = new SqlDataAdapter("EXECUTE Store.[sp_UpdateProduct] @ProductIdentity, @Productname,@Description, @Gender,@Color ,@Size, @Price,@Discount, @ImageURL", nwindConn);
                Adapter.SelectCommand.Parameters.AddWithValue("@ProductIdentity", obj.ProductIdentity);
                Adapter.SelectCommand.Parameters.AddWithValue("@Productname", obj.Productname);
                Adapter.SelectCommand.Parameters.AddWithValue("@Description", obj.Description);
                Adapter.SelectCommand.Parameters.AddWithValue("@Gender", obj.Gender);
                Adapter.SelectCommand.Parameters.AddWithValue("@Color", obj.Color);
                Adapter.SelectCommand.Parameters.AddWithValue("@Size", obj.Size);
                Adapter.SelectCommand.Parameters.AddWithValue("@Price", obj.Price);
                Adapter.SelectCommand.Parameters.AddWithValue("@Discount", obj.Discount);
                Adapter.SelectCommand.Parameters.AddWithValue("@ImageURL", obj.ImageURL); 
     

                Adapter.SelectCommand.CommandTimeout = 30;
                Adapter.Fill(dt);
                nwindConn.Close();

                if (dt == null)
                {
                    return NotFound();
                }
                return Ok(dt);
                // return dt;

            }
            catch (Exception ex)
            {
                return NotFound(); ;
            }

        }


        [AcceptVerbs("GET", "POST")]
        [HttpPost]
        public IHttpActionResult GetDiscountedProducts(Empty obj)
        {
            try
            {
                DataTable dt = new DataTable();
                nwindConn.Open();
                SqlDataAdapter Adapter = new SqlDataAdapter("EXECUTE Store.[sp_GetDiscountedProducts]", nwindConn);
                Adapter.SelectCommand.CommandTimeout = 30;
                Adapter.Fill(dt);
                nwindConn.Close();

                if (dt == null)
                {
                    return NotFound();
                }
                return Ok(dt);
                // return dt;

            }
            catch (Exception ex)
            {
                return NotFound(); ;
            }

        }
        
        [AcceptVerbs("GET", "POST")]
        [HttpPost]
        public IHttpActionResult CreateOrder(OrderRow obj)
        {
            try
            {
                DataTable dt = new DataTable();
                nwindConn.Open();
                SqlDataAdapter Adapter = new SqlDataAdapter("EXECUTE Store.[sp_CreateOrder] @CustomerIdentity,@ProductIdentity,@StatusIdentity,@Price,@Discount,@Quantity ", nwindConn);
                //   Adapter.SelectCommand.Parameters.AddWithValue("@ResturantId", obj.ResturantId); 
                Adapter.SelectCommand.Parameters.AddWithValue("@CustomerIdentity", obj.CustomerIdentity);
                Adapter.SelectCommand.Parameters.AddWithValue("@ProductIdentity", obj.ProductIdentity);
                Adapter.SelectCommand.Parameters.AddWithValue("@StatusIdentity", obj.StatusIdentity);
                Adapter.SelectCommand.Parameters.AddWithValue("@Price", obj.Price);
                Adapter.SelectCommand.Parameters.AddWithValue("@Discount", obj.Discount);
                Adapter.SelectCommand.Parameters.AddWithValue("@Quantity", obj.Quantity);
                //Adapter.SelectCommand.Parameters.AddWithValue("@RowIdentity", obj.RowIdentity);
                // Adapter.SelectCommand.Parameters.AddWithValue("@Quantity", obj.ResturantId);

                Adapter.SelectCommand.CommandTimeout = 30;
                Adapter.Fill(dt);
                nwindConn.Close();
          
                if (dt == null)   
                {
                    return NotFound();  
                }
                return Ok(dt);
                // return dt;

            }
            catch (Exception ex)
            {
                return NotFound(); ;
            }

        }

        [AcceptVerbs("GET", "POST")]
        [HttpPost]
        public IHttpActionResult UpdateOrder(OrderRow[] List)
        {
            try
            {
                nwindConn.Open();
                foreach (OrderRow obj in List)
                {
                    SqlCommand cmd = new SqlCommand("EXECUTE Store.[sp_UpdateOrder] @OrderIdentity,@ProductIdentity,@StatusIdentity,@Price,@Discount, @Quantity ", nwindConn);
                    //   Adapter.SelectCommand.Parameters.AddWithValue("@ResturantId", obj.ResturantId); 
                    cmd.Parameters.AddWithValue("@OrderIdentity", obj.OrderIdentity);
                    cmd.Parameters.AddWithValue("@ProductIdentity", obj.ProductIdentity);
                    cmd.Parameters.AddWithValue("@StatusIdentity", obj.StatusIdentity);
                    cmd.Parameters.AddWithValue("@Price", obj.Price);
                    cmd.Parameters.AddWithValue("@Discount", obj.Discount);
                    cmd.Parameters.AddWithValue("@Quantity", obj.Quantity);
                    cmd.ExecuteNonQuery();
                    //Adapter.SelectCommand.Parameters.AddWithValue("@RowIdentity", obj.RowIdentity);
                    // Adapter.SelectCommand.Parameters.AddWithValue("@Quantity", obj.ResturantId);

                    cmd.CommandTimeout = 30;
                }
                nwindConn.Close();

                return Ok(new DataTable());
            }
            catch (Exception ex)
            {
                return NotFound(); ;
            }

        }

        [AcceptVerbs("GET", "POST")]
        [HttpPost]
        public IHttpActionResult GetOrders(OrderRow obj)
        {
            try
            {
                DataTable dt = new DataTable();
                nwindConn.Open();
                SqlDataAdapter Adapter = new SqlDataAdapter("EXECUTE Store.[sp_GetOrders] @CustomerIdentity", nwindConn);
                Adapter.SelectCommand.Parameters.AddWithValue("@CustomerIdentity", obj.CustomerIdentity); 
                Adapter.SelectCommand.CommandTimeout = 30;
                Adapter.Fill(dt);
                nwindConn.Close();

                if (dt == null)
                {
                    return NotFound();
                }
                return Ok(dt);
                // return dt;

            }
            catch (Exception ex)
            {
                return NotFound(); ;
            }

        }


        [AcceptVerbs("GET", "POST")]
        [HttpPost]
        public IHttpActionResult SetRating(OrderRow obj)
        {
            try
            {
                DataTable dt = new DataTable();
                nwindConn.Open();
                SqlDataAdapter Adapter = new SqlDataAdapter("EXECUTE Store.[sp_SetRate] @CustomerIdentity,@ProductIdentity,@Score", nwindConn);
                Adapter.SelectCommand.Parameters.AddWithValue("@CustomerIdentity", obj.CustomerIdentity);
                Adapter.SelectCommand.Parameters.AddWithValue("@ProductIdentity", obj.ProductIdentity);
                Adapter.SelectCommand.Parameters.AddWithValue("@Score", obj.Score);
                Adapter.SelectCommand.CommandTimeout = 30;
                Adapter.Fill(dt);
                nwindConn.Close();

                if (dt == null)
                {
                    return NotFound();
                }
                return Ok(dt);
                // return dt;

            }
            catch (Exception ex)
            {
                return NotFound(); ;
            }

        }




    }
}
