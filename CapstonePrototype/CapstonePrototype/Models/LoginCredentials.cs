using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CapstonePrototype.Models {
    public class LoginCredentials {
        [Required(ErrorMessage = "Email cannot be empty")]
        [RegularExpression("^\\S+@\\S+\\.\\S{2,}$", ErrorMessage = "Not a valid email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password cannot be empty")]
        public string Password { get; set; }
    }
}
