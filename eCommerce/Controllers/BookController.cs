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
namespace eCommerce
{
  

    [DataContract]
    class BlogSite
    {
        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public string Description { get; set; }
    }
}
