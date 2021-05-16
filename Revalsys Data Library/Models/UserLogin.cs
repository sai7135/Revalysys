using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Revalsys_Data_Library.Models
{
    public class UserLogin
    {
        [Key]
        public string UserName { get; set; }
        public string Hash { get; set; }
        public string Salt { get; set; }
        public string Role { get; set; }
        
    }
}
