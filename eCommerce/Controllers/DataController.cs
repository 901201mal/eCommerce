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
    
        DataTable ErrorData = new DataTable();

        public DataTable ConstructError(string ErrorCode, Exception e)
        {
            DataTable ErrorData = new DataTable();
            ErrorData.Columns.Add("ErrorStatus");
            ErrorData.Columns.Add("ErrorCode");
            ErrorData.Columns.Add("Message");
            ErrorData.Rows.Add("-1", ErrorCode, e.Message);
            return ErrorData;

        }
        public DataTable ConstructFeedBack(string ErrorCode)
        {
            DataTable ErrorData = new DataTable();
            ErrorData.Columns.Add("ErrorStatus");
            ErrorData.Columns.Add("ErrorCode");
            ErrorData.Rows.Add("0", ErrorCode);
            return ErrorData;
        }



        [AcceptVerbs("GET", "POST")]
        [HttpPost]
        public IHttpActionResult GetLogin(User obj)
        {
            DataTable dt = new DataTable();
            try
            {
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
                dt = ConstructError("C#-01", ex);
                return Ok(dt);
            }

        }

        [AcceptVerbs("GET", "POST")]
        [HttpPost]
        public IHttpActionResult SetLogin(User obj)
        {
            DataTable dt = new DataTable();
            try
            {
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
                dt = ConstructError("C#-02", ex);
                return Ok(dt);
            }

        }

        [AcceptVerbs("GET", "POST")]
        [HttpPost]
        public IHttpActionResult GetUsers(User obj)
        {
            DataTable dt = new DataTable();
            try
            {
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
                dt = ConstructError("C#-03", ex);
                return Ok(dt);
            }

        }

        [AcceptVerbs("GET", "POST")]
        [HttpPost]
        public IHttpActionResult UpdateUser(User obj)
        {
            DataTable dt = new DataTable();
            try
            {
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
                dt = ConstructError("C#-04", ex);
                return Ok(dt);
            }

        }

        [AcceptVerbs("GET", "POST")]
        [HttpPost]
        public IHttpActionResult DeleteUser(User obj)
        {
            DataTable dt = new DataTable();
            try
            {
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
                dt = ConstructError("C#-05", ex);
                return Ok(dt);
            }

        }

        [AcceptVerbs("GET", "POST")]
        [HttpPost]
        public IHttpActionResult GetProducts(Empty obj)
        {
            DataTable dt = new DataTable();
            try
            {
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
                dt = ConstructError("C#-06", ex);
                return Ok(dt);
            }

        }

        [AcceptVerbs("GET", "POST")]
        [HttpPost]
        public IHttpActionResult UpdateProduct(Product obj)
        {
            DataTable dt = new DataTable();
            try
            {
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
                dt = ConstructError("C#-07", ex);
                return Ok(dt);
            }

        }

        [AcceptVerbs("GET", "POST")]
        [HttpPost]
        public IHttpActionResult DeleteProduct(Product obj)
        {
            DataTable dt = new DataTable();
            try
            {
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
                dt = ConstructError("C#-08", ex);
                return Ok(dt);
            }

        }

        
        [AcceptVerbs("GET", "POST")]
        [HttpPost]
        public IHttpActionResult GetDiscountedProducts(Empty obj)
        {
            DataTable dt = new DataTable();
            try
            {
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
                dt = ConstructError("C#-09", ex);
                return Ok(dt);
            }

        }

        [AcceptVerbs("GET", "POST")]
        [HttpPost]
        public IHttpActionResult GetOrders(OrderRow obj)
        {
            DataTable dt = new DataTable();
            try
            {
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
                dt = ConstructError("C#-10", ex);
                return Ok(dt);
            }

        }

        [AcceptVerbs("GET", "POST")]
        [HttpPost]
        public IHttpActionResult SetOrder(OrderRow obj)
        {
            DataTable dt = new DataTable();
            try
            {
                nwindConn.Open();
                SqlDataAdapter Adapter = new SqlDataAdapter("EXECUTE Store.[sp_SetOrder] @CustomerIdentity,@ProductIdentity,@StatusIdentity,@Price,@Discount,@Quantity ", nwindConn);
                //   Adapter.SelectCommand.Parameters.AddWithValue("@ResturantId", obj.ResturantId); 
                Adapter.SelectCommand.Parameters.AddWithValue("@CustomerIdentity", obj.CustomerIdentity);
                Adapter.SelectCommand.Parameters.AddWithValue("@ProductIdentity", obj.ProductIdentity);
                Adapter.SelectCommand.Parameters.AddWithValue("@StatusIdentity", obj.StatusIdentity);
                Adapter.SelectCommand.Parameters.AddWithValue("@Price", obj.Price);
                if (obj.Discount == null)
                    obj.Discount = "0";
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
                dt = ConstructError("C#-11", ex);
                return Ok(dt);
            }

        }

        [AcceptVerbs("GET", "POST")]
        [HttpPost]
        public IHttpActionResult UpdateOrder(OrderRow[] List)
        {
            DataTable dt = new DataTable();

            try
            {
                nwindConn.Open();
                foreach (OrderRow obj in List)
                {
                    if (obj.ProductIdentity != null)
                    {
                        SqlCommand cmd = new SqlCommand("EXECUTE Store.[sp_UpdateOrder] @OrderIdentity,@ProductIdentity,@StatusIdentity,@Price,@Discount, @Quantity ", nwindConn);
                        //   Adapter.SelectCommand.Parameters.AddWithValue("@ResturantId", obj.ResturantId); 
                        cmd.Parameters.AddWithValue("@OrderIdentity", obj.OrderIdentity);
                        cmd.Parameters.AddWithValue("@ProductIdentity", obj.ProductIdentity);
                        cmd.Parameters.AddWithValue("@StatusIdentity", obj.StatusIdentity);
                        cmd.Parameters.AddWithValue("@Price", obj.Price);
                        if (obj.Discount == null)
                            obj.Discount = "0";
                        cmd.Parameters.AddWithValue("@Discount", obj.Discount);
                        cmd.Parameters.AddWithValue("@Quantity", obj.Quantity);
                        cmd.ExecuteNonQuery();
                        //Adapter.SelectCommand.Parameters.AddWithValue("@RowIdentity", obj.RowIdentity);
                        // Adapter.SelectCommand.Parameters.AddWithValue("@Quantity", obj.ResturantId);

                        cmd.CommandTimeout = 30;
                    }
                }
                nwindConn.Close();
                dt = ConstructFeedBack("C#-12");
                return Ok(dt);
            }
            catch (Exception ex)
            {
                dt = ConstructError("C#-12", ex);
                return Ok(dt);
            }
        }

        [AcceptVerbs("GET", "POST")]
        [HttpPost]
        public IHttpActionResult SetRating(OrderRow obj)
        {
            DataTable dt = new DataTable();
            try
            {
                nwindConn.Open();
                SqlDataAdapter Adapter = new SqlDataAdapter("EXECUTE Store.[sp_SetRating] @CustomerIdentity,@ProductIdentity,@Score,@Comments", nwindConn);
                Adapter.SelectCommand.Parameters.AddWithValue("@CustomerIdentity", obj.CustomerIdentity);
                Adapter.SelectCommand.Parameters.AddWithValue("@ProductIdentity", obj.ProductIdentity);
                Adapter.SelectCommand.Parameters.AddWithValue("@Score", obj.Score);
                if (obj.Comments == null)
                    obj.Comments = "";
                Adapter.SelectCommand.Parameters.AddWithValue("@Comments", obj.Comments); 
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
                dt = ConstructError("C#-13", ex);
                return Ok(dt); 
            }

        }


        [AcceptVerbs("GET", "POST")]
        [HttpPost]
        public IHttpActionResult ConfirmOrder(OrderRow obj)
        {
            DataTable dt = new DataTable();
            try
            {
                nwindConn.Open();
                SqlDataAdapter Adapter = new SqlDataAdapter("EXECUTE Store.[sp_ConfirmOrder] @CustomerIdentity, @OrderIdentity", nwindConn);
                Adapter.SelectCommand.Parameters.AddWithValue("@CustomerIdentity", obj.CustomerIdentity);
                Adapter.SelectCommand.Parameters.AddWithValue("@OrderIdentity", obj.OrderIdentity);
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
                dt = ConstructError("C#-14", ex);
                return Ok(dt);
            }

        }

        [AcceptVerbs("GET", "POST")]
        [HttpPost]
        public IHttpActionResult GetComments(Product obj)
        {
            DataTable dt = new DataTable();
            try
            {
                nwindConn.Open();
                SqlDataAdapter Adapter = new SqlDataAdapter("EXECUTE Store.[sp_GetComments] @ProductIdentity", nwindConn);
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
                dt = ConstructError("C#-15", ex);
                return Ok(dt);
            }
        }


        [AcceptVerbs("GET", "POST")]
        [HttpPost]
        public IHttpActionResult GetCurrentOrders(OrderRow obj)
        {
            DataTable dt = new DataTable();
            try
            {
                nwindConn.Open();
                SqlDataAdapter Adapter = new SqlDataAdapter("EXECUTE Store.[sp_GetCurrentOrders] @CustomerIdentity ", nwindConn);
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
                dt = ConstructError("C#-16", ex);
                return Ok(dt);
            }

        }


        [AcceptVerbs("GET", "POST")]
        [HttpPost]
        public IHttpActionResult GetOrderRows(OrderRow obj)
        {
            DataTable dt = new DataTable();
            try
            {
                nwindConn.Open();
                SqlDataAdapter Adapter = new SqlDataAdapter("EXECUTE Store.[sp_GetOrderRows]", nwindConn);
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
                dt = ConstructError("C#-17", ex);
                return Ok(dt);
            }

        }

        [AcceptVerbs("GET", "POST")]
        [HttpPost]
        public IHttpActionResult UpdateOrderRow(OrderRow obj)
        {
            DataTable dt = new DataTable();
            try
            {
                nwindConn.Open();
                SqlDataAdapter Adapter = new SqlDataAdapter("EXECUTE Store.[sp_UpdateOrderRow] @OrderIdentity,@RowIdentity,@StatusIdentity,@Price,@Discount,@Quantity ", nwindConn);
                //   Adapter.SelectCommand.Parameters.AddWithValue("@ResturantId", obj.ResturantId); 
                Adapter.SelectCommand.Parameters.AddWithValue("@OrderIdentity", obj.OrderIdentity);
                Adapter.SelectCommand.Parameters.AddWithValue("@RowIdentity", obj.RowIdentity);
                Adapter.SelectCommand.Parameters.AddWithValue("@StatusIdentity", obj.StatusIdentity);
                Adapter.SelectCommand.Parameters.AddWithValue("@Price", obj.Price);
                if (obj.Discount == null)
                    obj.Discount = "0";
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
                dt = ConstructError("C#-18", ex);
                return Ok(dt);
            }

        }

        [AcceptVerbs("GET", "POST")]
        [HttpPost]
        public IHttpActionResult DeleteOrderRow(OrderRow obj)
        {
            DataTable dt = new DataTable();
            try
            {
                nwindConn.Open();
                SqlDataAdapter Adapter = new SqlDataAdapter("EXECUTE Store.[sp_DeleteOrderRow] @RowIdentity", nwindConn);
                Adapter.SelectCommand.Parameters.AddWithValue("@RowIdentity", obj.RowIdentity);
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
                dt = ConstructError("C#-19", ex);
                return Ok(dt);
            }

        }

    }
}
