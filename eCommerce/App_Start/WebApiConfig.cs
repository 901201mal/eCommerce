using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace eCommerce
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                 name: "OneValueRoute",

                routeTemplate: "API/{controller}/{action}/{id}",

                defaults: new { id = RouteParameter.Optional }
                    );

            config.Routes.MapHttpRoute(
                name: "GetRoute",

               routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }

                   );


            config.Routes.MapHttpRoute(
                 name: "DefaultApi",
                routeTemplate: "API/{controller}/{action}",
                defaults: new { id = RouteParameter.Optional }
                    );


        }
    }
}
